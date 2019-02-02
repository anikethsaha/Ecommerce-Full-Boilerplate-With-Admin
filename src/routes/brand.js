const router = require('express').Router();
const {
    showBrand,
    fetchBrand
} = require('../controllers/brand')
const { isAuth} = require('../middlewares')
const {
    showCart
} = require('../controllers/cart')
const {
    isLocation
} = require('../middlewares')


router.get('/:brand/:category', showBrand);
router.post('/:brand/:limit/:category/get',fetchBrand);

module.exports = router;