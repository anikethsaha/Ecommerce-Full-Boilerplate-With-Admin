/* eslint-disable no-unused-vars */
const express = require('express')
const bodyParser = require('body-parser')
var expressControllers = require('express-controller');
const session = require('express-session')
const cors = require('cors')
const helmet = require('helmet')
const { sessionSecretKey } = require('../configs/config')
const path = require('path')
var expressValidator = require('express-validator');
var flash = require('connect-flash');
const cookieParser = require('cookie-parser');




// M

const app = express();
app.use(helmet());

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))
app.use(bodyParser.json({
    limit: '50mb'
}))

app.use(cookieParser());
app.use(session({
    secret: sessionSecretKey,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV == "production" ? true : false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));


app.use(flash());
app.use(cors());
//validator
app.use(expressValidator());

// V
// static files and views
app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, '../src/views'),
    path.join(__dirname, '../src/views/layouts/')
]);
app.engine('html', require('ejs').renderFile);



// TESTS will be on

// 1.MONGODB connection


// 2. Product API -  Add,get,delete(*I guess its not there XD)


/*
3. view rendering i.e status code 200

 - Views present here only like the /page etc


*/


app.get('/', (req, res) => {
    res.render('index');
})
app.get('/page', (req, res) => {
    res.render('website-helper-links')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/community', (req, res) => {
    res.render('community')
})


app.get('/donate', (req, res) => {
    res.render('donate')
})




module.exports = app