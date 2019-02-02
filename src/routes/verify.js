const router = require('express').Router();

const {
emailVerifyCallback
} = require('../controllers/profile')

const {
    passwordEmailVerification
} = require('../controllers/auth/utility')
const { isAuth} = require('../middlewares')

router.get('/email/:verification_ID',isAuth,emailVerifyCallback)
router.get('/reset_password/:temp_verification_code/:hashedEmail',passwordEmailVerification)
module.exports = router;