const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0 // 0-user, 1-admin
    },
    avatar: {
        type: String,
        default: ''
    },
    cart: {
        type: Array,
        default: []
    },
    address: {
        type: String
    },
    //    { whislist: [{ type: ObjectId, ref: 'Product' }]}

}, {
    timestamps: true
})


const userModel = mongoose.model('users', userSchema);

module.exports = userModel;