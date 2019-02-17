const express = require('express')
const bodyParser = require('body-parser')
const winston = require('winston')
var expressControllers = require('express-controller');
var session = require('express-session')
const cors = require('cors')
const helmet = require('helmet')
var expressValidator = require('express-validator');
const sanitizeBody = require('express-validator/filter');
const passport = require('passport')
var flash = require('connect-flash');

const {
  port,
  sessionSecretKey,
  productImageSavingLocation,
  websiteImageSavingLocation
} = require('./config')
const path = require('path')
var csrf = require('csurf');
const mongoose = require('mongoose')
var multer = require('multer')
var cookieParser = require('cookie-parser')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "pro_images") {
      console.log("working somehting");
      cb(null, productImageSavingLocation)
    } else {
      cb(null, websiteImageSavingLocation)
    }

  }
})



var upload = multer({
  storage
})
// M
// Middlewares
const app = express();
//validator
app.use(expressValidator());

const {
  dbname,
  MONGODB_URL,
  sessionKeys
} = require('./config.js')
//database connection
mongoose.connect(MONGODB_URL,{
  useMongoClient:true,
  useNewUrlParser: true
});

app.use(cookieParser());

// session Middleware
const {store} = require('./utils/sessionStorage/firebaseSessionStorage')
/*
OR IF YOU WANT TO USE OTHER SESSION STORAGE
const { store} = require('./utils/sessionStorage/memorySessionStorage')
*/



// session Middleware
app.use(session({
  store,
  secret: sessionSecretKey,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV == "production" ? true : false ,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))
app.use(flash());

app.set('port', (process.env.PORT || port));






app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}))
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(cors());

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

// V
// static files and views
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.engine('html', require('ejs').renderFile);
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {

  res.locals.user = req.user || null;
  next();
})

// C
//controller settings
//setting up the controller
expressControllers.setDirectory(path.join(__dirname, 'src/controller')).bind(app);

const {
  isAuth,
  hideLoginPage
} = require('./src/middleware/auth')
const {
  isCcare,
  isSuperAdmin
} = require('./src/middleware/role')

/*

R e n d e r i n g    V i e w s

*/
app.get('/', isAuth, (req, res) => {
  res.redirect('/home')
})

app.get('/home', isAuth, (req, res) => {
  res.render('dashboard')
})
app.get('/product', isAuth, (req, res) => {

  res.render('product')
})

app.get('/show/product', [isAuth], (req, res) => {

  res.render('showProduct')
})

app.get('/show/customer', isAuth, (req, res) => {

  res.render('userdetails')
})
app.get('/show/banner', [isAuth, isSuperAdmin], (req, res) => {

  res.render('banner')
})

app.get('/show/page', [isAuth, isSuperAdmin], (req, res) => {

  res.render('website-page')
})
app.get('/show/contactBuy', [isAuth, isSuperAdmin], (req, res) => {

  res.render('contactBuy')
})
app.get('/show/delivery', isAuth, (req, res) => {

  res.render('delivery')
})

app.get('/show/order', isAuth, (req, res) => {

  res.render('order')
})

app.get('/login', hideLoginPage, (req, res) => {
  res.render('login')
})
app.get('/show/community',[isAuth],(req,res) => {
  res.render('community')
})
app.get('/show/header_footer',[isAuth,isSuperAdmin],(req,res) => {
  res.render('header_footer')
})





/*

C o n t r o l l e r      h e r e

*/

const {
  getAllProducts,
  addProduct,
  showEditProduct,
  editProduct
} = require('./src/controller/product')
const {
  getAllUsers
} = require('./src/controller/user')
const {
  addBanner
} = require('./src/controller/banner')
const {
  addPage
} = require('./src/controller/page')
const {
  addContact,
  addAddr,
  addFeature,
  addPaymentGuide
} = require('./src/controller/contact')
const {
  getDelivery,
  showEditDelivery,
  editDeliveryStatus
} = require('./src/controller/delivery')
const {
  getStats
} = require('./src/controller/stats')
const {
  getAllOrders,
  showEditOrder,
  editOrderStatus
} = require('./src/controller/order')

const {
  addCommunity,
  addDonate
} = require('./src/controller/community')
const {
  register
} = require('./src/controller/auth/methods')

const {
  addLogo,
  addLogo2,
  addSocialMediaLink
} = require('./src/controller/header_footer')

app.get('/change/delivery/:_deliveryID', isAuth, showEditDelivery)
app.get('/change/product/:_productID', isAuth, showEditProduct)
app.get('/change/order/:_orderID', isAuth, showEditOrder)






app.post('/edit/delivery/:_deliveryID', isAuth, editDeliveryStatus)
app.post('/edit/order/:_orderID', isAuth, editOrderStatus)
app.post('/edit/product/:_productID', [isAuth, upload.array('pro_images', 6)], editProduct)




app.get('/get/products', isAuth, getAllProducts)
app.get('/get/users', isAuth, getAllUsers)
app.get('/get/delivery', isAuth, getDelivery)
app.get('/get/stats', isAuth, getStats)
app.get('/get/orders', isAuth, getAllOrders)






app.post('/add/product', [isAuth, isSuperAdmin, upload.array('pro_images', 6)], addProduct)
app.post('/add/banner', [isAuth, isSuperAdmin, upload.any()], addBanner)
app.post('/add/page', isAuth, isSuperAdmin, addPage)
app.post('/add/contact', isAuth, isSuperAdmin, addContact)
app.post('/add/addr', [isAuth, isSuperAdmin, upload.any()], addAddr)
app.post('/add/paymentGuide', [isAuth, isSuperAdmin], addPaymentGuide)
app.post('/add/feature', [isAuth, isSuperAdmin, upload.any()], addFeature)
app.post('/add/community',isAuth,addCommunity)
app.post('/add/donate',isAuth,addDonate)
app.post('/add/logo',[isAuth,isSuperAdmin,upload.any()],addLogo)
app.post('/add/logo2',[isAuth,isSuperAdmin,upload.any()],addLogo2)

app.post('/add/socialLink/:website',[isAuth,isSuperAdmin],addSocialMediaLink)








// auth
app.get('/register', [isAuth,isSuperAdmin], (req, res) => {
  res.render('register', {
    isAdmin: true
  })
})

// app.get('/register/:adminKey', [isAuth,isSuperAdmin], (req, res) => {
//   const {
//     adminKey
//   } = req.params;
//   if (adminKey == 998877) {
//     res.render('register', {
//       isAdmin: true
//     })
//   } else {
//     res.redirect('/register')
//   }

// })

app.post('/register', register)
const Lpassport = require('./src/controller/auth/passport.config')



app.post('/login', Lpassport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {

  res.redirect('/');
});
app.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('connect.sid');
  req.session.destroy()
  // console.log("HITTING LOGOUT", req.headers,req.header('Referer'));
  res.redirect('/');
})









app.listen(app.get('port'), () => {
  logger.info('> Server is running on PORT ', app.get('port'));
})