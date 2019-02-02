const router = require('express').Router();
const {
    checkIsCartEmpty,
    addProductToCart,
    showCartPage,
    updateCart,
    showAddressPage,
    showRecieptPageCart
} = require('../controllers/cart')
const {showCartPaymentPage} = require('../controllers/payment')
const { isAuth,isEmptyCart} = require('../middlewares')



router.get('/check',isAuth,checkIsCartEmpty);
router.post('/add/:pid',isAuth,addProductToCart);
router.post('/update/:action',isAuth,updateCart);
router.get('/',isAuth,isEmptyCart,showCartPage)
router.post('/address',isAuth,showAddressPage)
router.get('/payment/:_orderID',isAuth,showCartPaymentPage)
router.get('/done/:transactionID',isAuth,showRecieptPageCart)

module.exports = router;