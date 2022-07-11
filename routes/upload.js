const express = require('express');
const uploadCtrl = require('../controllers/uploadCtrl');
const uploadRouter = express.Router();

const uploadImg = require('../middelware/uploadImg');

uploadRouter.post('/uploadImage', uploadImg.user, uploadCtrl.uploadAvatar);
uploadRouter.post('/product/uploadImage', uploadCtrl.uploadProduct);
uploadRouter.post('/product/removeImage', uploadCtrl.removeProduct);


module.exports = uploadRouter;

