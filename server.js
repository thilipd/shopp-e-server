
// importing modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');


const dotenv = require('dotenv');



//app
const app = express();

dotenv.config();

//database configuration
const dbConfiguration = require('./shared/connect');

// middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(cors({
    credentials: true,
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));

app.use(fileUpload({
    useTempFiles: true,
    limit: '50mb'
}));


//routes
const authRouter = require('./routes/auth');
const uploadRouter = require('./routes/upload');
const catagoryRouter = require('./routes/catagory');
const subRouter = require('./routes/sub');
const productRouter = require('./routes/product');



app.use('/user', authRouter);
app.use('/api', uploadRouter);
app.use('/catagories', catagoryRouter);
app.use('/sub_catagoies', subRouter);
app.use('/products', productRouter);


//listening
const port = process.env.PORT || 8000;


app.listen(port, () => console.log(`Listening on port ${port} `));
