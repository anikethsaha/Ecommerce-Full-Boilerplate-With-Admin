const {newsLetterModel} = require('../models')

const { check, validationResult ,body } = require('express-validator/check');
module.exports = {
    addNewsLetter : async (req,res) => {
        req.checkBody('email').trim();
        req.sanitizeBody('email');
        req.checkBody('email','enter the email correctly').isEmail()

        var errors = req.validationErrors();
                if(errors){

                    res.json({
                        status : "FAILED",
                        err : errors
                    })
                }else{
                    new newsLetterModel({
                        email : req.body.email
                    }).save((err,result) => {
                        if(err){
                            res.json({
                            status : "FAILED",
                            err
                            })
                        }else{
                            res.json({
                                status : "SUCCESS",
                                msg : "Thanks For Subscribing "
                                })
                        }
                    })
                }
     }
}