const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: ObjectId,
            ref: 'products'
        }
    }]
})