const mongoose = require('mongoose');



const catagorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: [2, 'too short'],
        maxlength: [32, 'too long']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    }
}, {
    timestamps: true
});


const catagoryModel = mongoose.model('catagories', catagorySchema);

module.exports = catagoryModel;


