const express = require('express');
const subControl = require('../controllers/subControl');
const subRouter = express.Router();

const auth = require('../middelware/auth');
const adminAuth = require('../middelware/adminAuth');

subRouter.post('/create', auth, subControl.create);
subRouter.get('/list', auth, subControl.list);
subRouter.get('/sub/:slug', subControl.read)
subRouter.put('/sub/:slug', auth, subControl.update)
subRouter.delete('/sub/:slug', auth, subControl.delete)


module.exports = subRouter;