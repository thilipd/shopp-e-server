const express = require('express');
const userControl = require('../controllers/userControl');
const authRouter = express.Router();

const auth = require('../middelware/auth');
const adminAuth = require('../middelware/adminAuth');



authRouter.post('/register', userControl.register);
authRouter.post('/activation', userControl.activation);
authRouter.post('/login', userControl.login);
authRouter.post('/forget', userControl.forgetPassword);
authRouter.post('/reset', auth, userControl.resetPassword);
authRouter.get('/info', auth, userControl.getUserInfo);
authRouter.get('/allinfo', auth, adminAuth, userControl.getAllUserInfo);
authRouter.get('/logout', userControl.logout);
authRouter.patch('/update', auth, userControl.updateUser);
authRouter.patch('/updateRole/:id', auth, adminAuth, userControl.updateUserRole);
authRouter.delete('/delete/:id', auth, adminAuth, userControl.deleteUser);


module.exports = authRouter;