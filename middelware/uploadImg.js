
const fs = require('fs');

const uploads = {

    user: async (req, res, next) => {

        if (!req.files)
            return res.status(400).json({ msg: "No files were uploaded" });

        const file = req.files.file;

        if (file.size > 1024 * 1024) {
            removeTemp(file.tempFilePath);
            return res.status(400).json({ msg: "File size is greater then 1mb" });
        }
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png')
            return res.status(400).json({ msg: "File type is incorrect" });

        next();
    },



}

const removeTemp = (path) => {

    fs.unlink(path, (err) => {
        if (err) throw err
    })
}

module.exports = uploads
