const express = require('express');
const productControl = require('../controllers/productControl');
const productRouter = express.Router();

const auth = require('../middelware/auth');
const adminAuth = require('../middelware/adminAuth');

productRouter.post('/create', auth, productControl.create);
productRouter.get('/list/:count', productControl.list);
productRouter.delete('/product/:slug', productControl.delete);
productRouter.get('/product/:slug', productControl.read);
productRouter.put('/product/:slug', productControl.update);

productRouter.post('/sortProduct', productControl.sortList);
productRouter.get('/count', productControl.count);


module.exports = productRouter;