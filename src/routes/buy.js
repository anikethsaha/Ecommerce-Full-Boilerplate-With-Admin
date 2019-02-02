const router = require('express').Router();
const {
    showAddressPage,
    showReviewPage,
    showRecieptPage
} = require('../controllers/buy')

const { isAuth} = require('../middlewares')



router.post('/product/:productID',isAuth,showAddressPage); //isAuth
router.get('/review/:orderID',isAuth,showReviewPage);//isAuth
router.get('/done/:transactionID',isAuth,showRecieptPage)

module.exports = router;