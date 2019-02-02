const router = require('express').Router();
const {
    addNewsLetter
} = require('../controllers/newsletter')
const { isAuth} = require('../middlewares')


router.post('/add',addNewsLetter);

module.exports = router;
