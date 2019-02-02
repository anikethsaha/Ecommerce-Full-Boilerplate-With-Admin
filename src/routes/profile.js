const router = require('express').Router();
const {
   showProfile,
   getAllOrders,
   getAllFavs ,
   addEmail,
   addAddr
} = require('../controllers/profile')
const { isAuth} = require('../middlewares')


router.get('/',isAuth,showProfile) // add isAuth
router.get('/orders/fetch',isAuth,getAllOrders)
router.get('/fav/fetch',isAuth,getAllFavs)
router.post('/add/email',isAuth,addEmail)
router.post('/add/addr',isAuth,addAddr)
module.exports = router;