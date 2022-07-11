
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');



const {
    ACTIVATION_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    CLIENT_URL
} = process.env


const userControl = {
    register: async (req, res) => {
        try {

            const { name, email, password } = req.body;

            if (!name || !email || !password) {

                return res.status(400).json({ msg: "Please fill all the feilds" });

            }

            if (!validateEmail(email)) {
                return res.status(400).json({ msg: "Invalid email!!!" })
            }

            const user = await Users.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: "User Already exist" });
            }

            if (password.length < 6) {
                return res.status(400).json({ msg: "Password must have atleast 6 charcters" });
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = {
                name, email, password: passwordHash
            }

            const activationToken = createActivationToken(newUser);

            const url = `${CLIENT_URL}/user/activation/${activationToken}`;


            sendMail(email, url, 'Click me for confirmation');
            return res.status(200).json({ msg: "Please check your email" });



        } catch (error) {
            return res.status(500).send(error.message);
        }
    },

    activation: async (req, res) => {
        const { activation_token } = req.body;

        try {

            const user = jwt.verify(activation_token, ACTIVATION_TOKEN_SECRET);

            const { name, email, password } = user;

            const check = await Users.findOne({ email })

            if (check) return res.status(400).json({ msg: "This email is already exists,  Please login to continue" })


            const newUser = new Users({
                name, email, password
            })

            await newUser.save()

            return res.status(200).json({ msg: "Account has been activated, Please login to continue." })

        } catch (error) {

            return res.status(500).json({ msg: error.message });
        }
    },

    login: async (req, res) => {

        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email })
            if (!user)
                return res.status(400).json({ msg: "This user is not registered" })

            const match = await bcrypt.compare(password, user.password)


            if (!match) return res.status(400).json({ msg: "Please enter the right password" })



            const refresh_token = createRefreshToken({ id: user._id });


            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: 'user/login',
                resave: true,
                maxAge: 24 * 60 * 60 * 1000,
                SameSite: 'None',
                secure: true
            })

            // const rf_token = req.cookies.refreshtoken;

            // if (rf_token) {

            //     jwt.verify(rf_token, REFRESH_TOKEN_SECRET, (err, user) => {


            //         if (err) throw err;

            //         const access_token = createAccessToken({ id: user.id });

            //         return res.status(200).json({ msg: "Login Success!!!", userDetail: { ...user }, access_token });

            //     })
            // }
            const access_token = createAccessToken({ id: user.id })
            return res.status(200).json({ msg: "Login Success!!!", userDetail: { ...user }, access_token });

        } catch (error) {
            console.log(error.response)
            return res.status(500).json({ msg: error.message });
        }
    },



    forgetPassword: async (req, res) => {
        try {

            const { email } = req.body;

            const user = await Users.findOne({ email });

            if (!user) return res.status(400).json({ msg: 'Not a registered user, Please register' });

            const access_token = createAccessToken({ id: user._id });

            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(user.email, url, 'Reset Password');

            return res.status(200).json({ msg: "Please check your email" });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    resetPassword: async (req, res) => {
        try {

            const { password } = req.body;
            const passwordHash = await bcrypt.hash(password, 12);

            await Users.findByIdAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            });

            return res.json({ msg: "Password successfully updated, Please login" });


        } catch (error) {
            return res.status(500).json({ msg: error });
        }
    },

    getUserInfo: async (req, res) => {
        try {

            const user = await Users.findById(req.user.id).select('-password');

            return res.json(user)

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    getAllUserInfo: async (req, res) => {
        try {

            const users = await Users.find().select('-password');

            return res.json(users)

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    logout: (req, res) => {


        try {
            res.clearCookie("refreshtoken")

            return res.json({ msg: "Logged out" })
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },

    updateUser: async (req, res) => {
        try {

            const { name, avatar } = req.body

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                name, avatar
            })

            return res.json({ msg: "Update success" })


        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    updateUserRole: async (req, res) => {
        try {

            const { role, id } = req.body

            console.log(req.user);
            await Users.findOneAndUpdate({ _id: req.params.id }, {
                role
            })

            return res.json({ msg: "Role updated successfully" })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: error.message });
        }
    },

    deleteUser: async (req, res) => {


        await Users.findByIdAndDelete(req.params.id)

        return res.json({ msg: "User Deleted successfully" })

    }


}


const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const createActivationToken = (payload) => {
    return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' });
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '40m' })
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}



module.exports = userControl;