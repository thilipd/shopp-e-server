const express = require('express');
const catagoryControl = require('../controllers/catagoryControl');
const catagoryRouter = express.Router();

const auth = require('../middelware/auth');
const adminAuth = require('../middelware/adminAuth');

catagoryRouter.post('/create', auth, catagoryControl.create);
catagoryRouter.get('/list', catagoryControl.list);
catagoryRouter.get('/catagory/:slug', catagoryControl.read)
catagoryRouter.put('/catagory/:slug', auth, catagoryControl.update)
catagoryRouter.delete('/catagory/:slug', auth, catagoryControl.delete);
catagoryRouter.get('/catagory/subs/:id', catagoryControl.getSubs)


module.exports = catagoryRouter;