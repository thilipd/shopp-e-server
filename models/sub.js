const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema({
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
    },
    parent: {
        type: ObjectId,
        ref: 'catagory',
        required: true
    }
}, {
    timestamps: true
});


const subModel = mongoose.model('sub-catagories', subSchema);

module.exports = subModel;
