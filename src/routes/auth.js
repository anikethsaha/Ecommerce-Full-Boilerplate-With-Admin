const router = require('express').Router();
const passport = require('passport');
const { userMethods ,resetPassword,changePassword} = require('../controllers/auth')
const session = require('express-session')
const { check, validationResult,body  } = require('express-validator/check');
const {hideLoginPage} =  require('../middlewares')
// get login page
router.get('/login',hideLoginPage,userMethods.showLogin);
router.post('/login',passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true }),(req,res)=>{
        res.redirect('/');
    });
router.get('/logout',userMethods.logout);

// google
router.get('/google', passport.authenticate('google', {scope: ['profile','email']}));
router.get('/google/callback',passport.authenticate('google'),userMethods.oauthCallback);



// facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),userMethods.oauthCallback);



router.get('/reset_password',(req,res) => {
    res.render('auth/reset_password');
})
router.post('/reset_password',resetPassword);
router.post('/change_password/:temp_verification_code/:_UID',changePassword)
// local Strategy








// Register
router.get('/register',hideLoginPage,userMethods.showRegistration);
router.post('/register',userMethods.register);



module.exports = router;


 //     // dont forget to encrypt the cookie
    //     // req.session.user = req.session.passport.user;
    //     req.session.username = req.user.name
    //     console.log('frmo passport req.user :',req.session.username,req.user.name );
    // //    res.cookie('id',req.session.passport.user);