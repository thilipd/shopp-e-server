const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        text: true
    },
    slug: {
        type: String,
        index: true,
        lowercase: 32,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        text: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32
    },
    catagory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catagories"
    },
    sub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sub-catagories"
    },
    quantity: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    shipping: {
        type: String,
        enum: ['yes', 'no']
    },
    colors: {
        type: String,
        enum: ['black', 'silver', 'blue', 'white', 'red']
    },
    brands: {
        type: String,
        enum: ['Apple', 'Dell', 'Lenova', 'Asus', 'Samsung']
    },
    // ratings: [{
    //     star: Number,
    //     postedBy: {
    //         type: ObjectId,
    //         ref: 'users'
    //     }
    // }]

}, {
    timestamps: true
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;