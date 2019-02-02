const router = require('express').Router();
const {
    showIndex,
    fetch,
    showAll,
  
   
} = require('../controllers/product')
const {addToFav} = require('../controllers/auth')
const { isAuth} = require('../middlewares')
const {
    showCart
} = require('../controllers/cart')
const {
    isLocation
} = require('../middlewares')

// router.get('/:city/:state',show);
// router.get('/:limit/get/:city/:state',isLocation,fetch);
// router.get('/checkout/:productID/:subscriptionID',isAuth,showTiffinCart);

router.get('/:category',showAll)
router.post('/:category/:limit/get',fetch);
router.get('/:category/:subCategory', showAll);
router.post('/:category/:subCategory/:limit/get',fetch);
router.get('/:category/:subCategory/:QualityType', showAll);
router.post('/:category/:subCategory/:QualityType/:limit/get',fetch);
router.get('/add/fav/:_pID/:_vendorID',isAuth,addToFav)


module.exports = router;