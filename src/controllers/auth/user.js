const {userModel }= require('../../models')
const bcrypt = require('bcrypt')
const session = require('express-session')
var owasp = require('owasp-password-strength-test');
const { check, validationResult ,body } = require('express-validator/check');
const  { salt } = require('../../../configs/config')
const makeid = () =>{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }


module.exports = {
    showLogin : (req,res) => {
        res.render('auth/login');
    },
    oauthCallback : (req,res) => {

        backURL=req.header('Referer') || '/';
        res.redirect(backURL);
    },
    logout : (req,res) => {
        req.logout();


        res.redirect('/');
    },
    OauthCreateUser : (profile,done) => {
        userModel.findOne({_oauthid : profile.id},(err,user) => {
            if(err) done(null,false)
            if(user){

                 done(null,user);
            }else{
                const newUser =  new userModel({
                        name : profile.displayName,
                        _oauthid : profile.id
                    }).save();
                 done(null,newUser);

            }
        })
    },
    createUser : userData =>{

        return new Promise((resolve,reject) => {
            new userModel({
                name : userData.displayName,
                _oauthid : userData.id
            }).save().then(newUser => {
                resolve(newUser);
            });
        })
    },
    showRegistration : (req,res) => {
        res.render('auth/register');
    },
    PasswordVerification :  (passwordToVerify , hashedPassword) => {

        return new Promise((resolve,reject) => {
          bcrypt.compare(passwordToVerify , hashedPassword , (err,result) => {
            if(err){
              return reject(err);
            }
            return resolve(result);//true
        })
        })

    },
    register : async (req,res) => {
        req.checkBody('email').trim();
        req.checkBody('password').escape();
        req.checkBody('mobile').trim();
        req.checkBody('mobile').escape();
        req.checkBody('password_confirmation').trim();
        req.checkBody('password_confirmation').escape();
        req.checkBody('name').trim();
        req.checkBody('name').escape();

        req.sanitizeBody('email');
        req.sanitizeBody('password');
        req.sanitizeBody('password_confirmation');
        req.sanitizeBody('name');
        req.sanitizeBody('mobile');

        req.checkBody('mobile','enter the mobile correctly').notEmpty();
        req.checkBody('email','enter the email correctly').isEmail();
        req.checkBody('password_confirmation',"enter the password correctly").notEmpty();
        req.checkBody('name',"please enter correct name").isString().notEmpty();
        req.checkBody('password','enter the password correctly').notEmpty();
        if(req.body.password != req.body.password_confirmation){
           var PasswordMatchederrors ="Password not matched";
            res.render('auth/register',{
                PasswordMatchederrors
            })
        }else{
            const passwordResult = owasp.test(req.body.password);

            if(!passwordResult.strong){
                res.render('auth/register',{
                    errors : passwordResult.errors,
                    requiredTestErrors  : passwordResult.requiredTestErrors,
                    optionalTestErrors   : passwordResult.optionalTestErrors
                })
            }else{
                var errors = req.validationErrors();

                if(errors){

                    res.render('auth/register',{
                        errors
                    })
                }else{
                    const mobile = req.body.mobile;
                    const name = req.body.name;
                    const email = req.body.email;
                    const password = await bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
                    return  new userModel({
                        mobile,
                        email,
                        name,
                        password,
                        _oauthid :await makeid()
                    }).save((errors,newuser) => {
                        if(errors){
                            res.render('auth/register',{
                                errors
                            });
                        }else{
                            res.render('auth/register',{
                                successMessage : "registration complete.Please login now"
                            });
                        }
                    })
                }
            }

        }


    },
    localLogin : async (email,password,done) => {

        await userModel.findOne({ email },async (err,verifiedEmailUser) => {
            if(err) {

                done(null,false,{message : err});
            }else{
                if(!verifiedEmailUser) {

                    done(null,false,{message:"no user found with this email"});
                }else{

                    var UserPassword = verifiedEmailUser.password;
                    await bcrypt.compare(password,UserPassword,(err,result) => {
                        if(err) {

                            done(null,false,{message:err})
                        }else{
                            if(!result) {

                                done(null,false,{message:"Password invalid"})
                            }else{

                                done(null,verifiedEmailUser);
                            }

                        }

                    })
                }
            }

        })
    }

}