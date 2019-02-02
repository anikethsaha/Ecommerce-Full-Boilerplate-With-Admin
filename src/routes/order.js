const router = require('express').Router();
const {
    updateOne,
    cancelOrdering
} = require('../controllers/buy')
const {
    updateOrderForCart
} = require('../controllers/cart')
const { isAuth} = require('../middlewares')


router.post('/buy/updateOne',isAuth,updateOne); //isAuth
router.post('/cart/updateOne',isAuth,updateOrderForCart); //isAuth
router.get('/cancel/:_OID/:_UID',isAuth,cancelOrdering)
module.exports = router;