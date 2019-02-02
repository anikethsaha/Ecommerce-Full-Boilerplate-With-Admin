const router = require('express').Router();

const {
    showProductPage
} = require('../controllers/product')



router.get('/product/:pid',showProductPage);











module.exports = router;