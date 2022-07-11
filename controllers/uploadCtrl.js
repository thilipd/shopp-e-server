const fs = require('fs');
const cloudinary = require('cloudinary');
const User = require('../models/userModel');
const Product = require('../models/product');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


const uploadCtrl = {
    uploadAvatar: async (req, res) => {
        try {
            const file = req.files.file;

            console.log(file.tempFilePath);

            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'shoppe avatar', width: 150, height: 150, crop: 'fill'
            }, (err, data) => {
                if (err) throw err

                removeTemp(file.tempFilePath);

                console.log({ data })

                res.status(200).json({ msg: 'File successfully uploaded', imgDetails: { ...data } })

            })

        } catch (error) {

            return res.status(500).json({ msg: error.message });
        }
    },
    uploadProduct: async (req, res) => {

        const file = req.files.images

        console.log(file.tempFilePath)

        try {

            await cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'shoppe_products',
                width: 750,
                height: 750,
                crop: 'fill'
            }, (err, data) => {
                if (err) throw err
                removeTemp(file.tempFilePath);

                res.status(200).json({ msg: 'File successfully uploaded', imgDetails: { ...data } })
            });



        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: error.message });
        }
    },
    removeProduct: async (req, res) => {

        console.log('hi')
        try {


            let id = req.body.public_id;

            cloudinary.v2.uploader.destroy(id, (err, data) => {
                if (err) throw err

                res.send(data)
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: error.message });
        }
    },

}

const removeTemp = (path) => {

    fs.unlink(path, (err) => {
        if (err) throw err
    })
}


module.exports = uploadCtrl;