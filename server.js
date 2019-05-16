/* eslint-disable no-unused-vars */
const express = require('express')
const bodyParser = require('body-parser')
const winston = require('winston')
var expressControllers = require('express-controller');
const session = require('express-session')
const cors = require('cors')
const helmet = require('helmet')
const {
  port,
  sessionSecretKey
} = require('./configs/config')
const path = require('path')
var csrf = require('csurf');
var RateLimit = require('express-rate-limit')
const passport = require('passport');
const mongoose = require('mongoose');
var expressValidator = require('express-validator');
const sanitizeBody = require('express-validator/filter');
var cookieParser = require('cookie-parser')
var flash = require('connect-flash');



const {
  authRoutes,
  productRoutes,
  showRoutes,
  brandRoutes,
  buyRoutes,
  paymentRoutes,
  searchRoutes,
  orderRoutes,
  cartRoutes,
  profileRoutes,
  verfiyRoutes,
  newletterRoutes
} = require('./src/routes')

// M
// Middlewares
const {
  store
} = require('./configs/sessionStorage/firebaseSessionStorage')
/*
OR IF YOU WANT TO USE OTHER SESSION STORAGE
const { store} = require('./configs/sessionStorage/memorySessionStorage')
*/
const {
  dbname,
  MONGODB_URL,
  sessionKeys
} = require('./configs/config.js')
//database connection
mongoose.connect(MONGODB_URL, {
  // useMongoClient:true,
  useNewUrlParser: true
});

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
  store,
  secret: sessionSecretKey,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV == "production" ? true : false,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));


app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// app.use(csrf());





app.set('port', (process.env.PORT || port));

app.use(cors());
// use this middleware in authentications routes or post method routes
var authAPILimiter = new RateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1000,
  delayMs: 0 // disabled
});
// loggin middleware
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: './logs/debug.log',
      level: 'debug'
    }),
    new winston.transports.File({
      filename: './logs/crit.log',
      level: 'crit'
    }),
    new winston.transports.File({
      filename: './logs/warn.log',
      level: 'warn'
    }),
    new winston.transports.File({
      filename: './logs/combined.log'
    })
  ]
});
//validator
app.use(expressValidator());

// V
// static files and views
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'src/views'),
  path.join(__dirname, 'src/views/layouts/')
]);
app.engine('html', require('ejs').renderFile);

// custom middlewares
// add isAuth middleware to protect any routes
const {
  isAuth,
  notFound404
} = require('./src/middlewares')


// C
//controller settings
//setting up the controller
expressControllers.setDirectory(path.join(__dirname, 'src/controller')).bind(app);


app.use(function (req, res, next) {

  res.locals.user = req.user || null;

  next();
})


const {
  productModel
} = require('./src/models')



app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/show', showRoutes);
app.use('/brand', brandRoutes);
app.use('/buy', buyRoutes);
app.use('/search', searchRoutes);
app.use('/payment', paymentRoutes);
app.use('/order', orderRoutes)
app.use('/cart', cartRoutes)
app.use('/profile', profileRoutes)
app.use('/verify', verfiyRoutes)
app.use('/newsletter', newletterRoutes)
app.get('/show/banners/:type', async (req, res) => {

  await mongoose.connection.db.collection('banners', async (err, collection) => {
    await collection.find({
      banner_name: {
        $regex: req.params.type,
        $options: 'i'
      }
    }).toArray(async (err, banner) => {
      if (req.params.type == 'pop_product' || req.params.type == "recommended_product") {
        for (let i = 0; i < banner.length; i++) {
          const element = banner[i];
          var productDetails = await productModel.findById(element.banner_name_link).exec();
          banner[i]["name"] = productDetails.name;
          banner[i]["subCategory"] = productDetails.subCategory;
          banner[i]["price"] = productDetails.price;
        }
        res.json(banner);
      } else {
        res.json(banner);
      }

    });

  })
})



app.get('/', (req, res) => {

  res.render('index');
})
app.get('/page', (req, res) => {
  res.render('website-helper-links')
})

app.get('/seller', (req, res) => {
  res.render('auth/seller');
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















app.use((req, res, next) => {
  return res.status(404).render('404');
})









app.listen(app.get('port'), () => {
  logger.info('> Server is running on PORT ', app.get('port'));
})