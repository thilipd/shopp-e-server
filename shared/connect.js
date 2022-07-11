const mongoose = require('mongoose');


const url = 'mongodb+srv://admin:CWwuX26dW*Bu2c2@cluster0.jchjh.mongodb.net/ecom?retryWrites=true&w=majority';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dbConfig = mongoose.connection;

dbConfig.on('error', () => console.log('Mongo not connected'));

dbConfig.on('connected', () => console.log('Mongo connected'));


module.exports = mongoose;