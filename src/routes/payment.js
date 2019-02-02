const router = require('express').Router();
const {
    showPaymentPage,
    useCoinUpdateOrderShowPaymentPage,
    stripeCharge,
    showRecieptPage,
    razorpayResponseCallback
} = require('../controllers/payment')

const { isAuth} = require('../middlewares')



router.get('/show/:orderId',isAuth,showPaymentPage); //isAuth
router.get('/u_c/show/:orderId/:type',isAuth,useCoinUpdateOrderShowPaymentPage)
//router.post('/charge',isAuth,stripeCharge); //isAuth // for stripe payment
router.post('/response',isAuth,razorpayResponseCallback)

module.exports = router;