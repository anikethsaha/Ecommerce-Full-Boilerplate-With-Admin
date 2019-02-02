const {
    userModel,
    productModel,
    sellerModel
} = require('../../models')
var owasp = require('owasp-password-strength-test');
const {
    encrypt,
    decrypt
} = require('../utilities/encryption')
const hat = require('hat');
const bcrypt = require('bcrypt')
const {
    hostName,
    companyName,
    teamEmailAddress,
    smtpPassword,
    smptUserName,
    smtpService
} = require('../../../configs/config')
const nodemailer = require('nodemailer');
const isMailSent = async (email, mailOptions) => {
    let smtpTransport = nodemailer.createTransport({
        service: smtpService,
        auth: {
            user: smptUserName,
            pass: smtpPassword
        }
    });
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return false;
        }
        return true;
    });
}
module.exports = {
    addToFav: async (req, res) => {
        const {
            _pID,
            _vendorID
        } = req.params;
        const {
            _id
        } = req.user;
        const userDetail = await userModel.findById(_id).exec();
        var favProArray = userDetail.favList;
        var output = '';
        userDetail.favList.map((productid, i) => {
            if (productid == _pID) {
                res.redirect('/profile/#pFav')
            }
        })
        favProArray.push(_pID);

        userModel.findByIdAndUpdate(_id, {
            favList: favProArray
        }, async (err, user) => {
            if (err) {

                res.redirect('/profile/#pFav')
            } else {

                await productModel.findById(_pID, (err, product) => {

                    product.favCount = product.favCount + 1;
                    product.save((err, newProduct) => {
                        if (err) {
                            res.render('error', {
                                message: " Please try again",
                                err
                            })
                        } else {
                            res.redirect('/profile/#pFav')
                        }
                    });
                })

            }
        })
    },
    resetPassword: async (req, res) => {
        const {
            email
        } = req.body;
        const temp_id = await hat();
        const temp_verification_code = await encrypt(temp_id);

        const hashedEmail = await encrypt(email);
        const link = `${hostName}/verify/reset_password/${temp_verification_code}/${hashedEmail}`;
        const isEmailExist = await userModel.count({
            email
        }).exec();
        if (isEmailExist > 0) {

            userModel.update({
                email
            }, {
                $set: {
                    temp_verification_code,
                    temp_verification_code_expiry: Date.now() + 3600000
                }
            }, (err, user) => {
                if (err) {

                    res.render('error', {
                        message: "Invalid Email Address Please try again",
                        err: "<a href='/auth/reset_password'>Click Here To Go back</a>"
                    })
                } else {

                    let mailOptions = {
                        from: '"FROM ' + companyName + ' 👻" <' + teamEmailAddress + '>',
                        to: email, // list of receivers
                        subject: 'Please Verify Your Email Address ✔',
                        html: `
                                Hi,
                                Thank you for choosing for ${companyName}' .
                                <br/>
                                To complete the change/add password process, please click  <a href="${link}">Verify</a> link and verify through the pasword change process.
                                - from ${companyName}  team.`,
                    };

                    if (isMailSent(email, mailOptions)) {
                        res.render('success', {
                            message: "Successfully Sent Mail....Please Check Your Mail",

                        })

                    } else {
                        res.render('error', {
                            message: "Failed To Send Mail ...Please Try Again",
                            err: "<a href='/auth/reset_password'>Click Here To Go back</a>"
                        })
                    }
                }
            })

        } else {
            res.render('error', {
                message: "Invalid Email Address Please try again",
                err: "<a href='/auth/reset_password'>Click Here To Go back</a>"
            })

        }




    },
    passwordEmailVerification: async (req, res) => {
        if ((req.protocol + "://" + req.get('host')) == hostName) {
            var email = await decrypt(req.params.hashedEmail)

            var isEmailRequested = await userModel.count({
                email,
                temp_verification_code_expiry: {
                    $gt: Date.now()
                }
            }).exec();
            if (isEmailRequested > 0) {
                var RequestedUser = await userModel.find({
                    email
                }).exec();

                if (req.params.temp_verification_code == RequestedUser[0].temp_verification_code) {


                    // now change the users password
                    res.render('auth/set_new_password', {
                        RequestedUser: RequestedUser[0]
                    })




                } else {
                    res.send("Invalid  Verification Code Please try again  <a href='/auth/reset_password'>Click Here To Go back</a>")
                }
            } else {
                res.send("Invalid Email Address Or Expired Token Please try again  <a href='/auth/reset_password'>Click Here To Go back</a>")
            }

        }
    },
    changePassword: async (req, res) => {
        req.checkBody('c_password').trim();
        req.checkBody('c_password').escape();
        req.checkBody('password').trim();
        req.checkBody('password').escape();
        req.sanitizeBody('password');
        req.sanitizeBody('c_password');
        const {
            temp_verification_code,
            _UID
        } = req.params;
        userModel.findById(_UID, (err, user) => {
            if (err) {
                res.render('error', {
                    message: "INVALID USER DETAILS .....TRY AGAIN ",
                    err
                })

            } else {
                if (req.body.password != req.body.c_password) {
                    res.render('error', {
                        message: "Confirmation Password Does'nt Matched... ",
                        err: "Password doesnt match"
                    })
                } else {
                    const passwordResult = owasp.test(req.body.password);
                    if (!passwordResult.strong) {
                        res.render('error', {
                            message: "PASSWORD NOT SO STRONG",
                            err: passwordResult.errors,
                            requiredTestErrors: passwordResult.requiredTestErrors,
                            optionalTestErrors: passwordResult.optionalTestErrors
                        })
                    } else {
                        var errors = req.validationErrors();
                        if (errors) {
                            res.render('error', {
                                message: "INPUT VALIDATION ERRORS",
                                err: errors
                            })
                        } else {
                            if (user.temp_verification_code == temp_verification_code) {
                                user.temp_verification_code = null;
                                user.temp_verification_code_expiry = null;
                                user.save((newerr, newUser) => {
                                    if (newerr) {
                                        res.render('error', {
                                            message: "INVALID USER DETAILS .....TRY AGAIN ",
                                            err: newerr
                                        })
                                    }
                                    res.render('success', {
                                        message: "Successfull...Please Login",
                                    })
                                })
                            } else {
                                res.render('error', {
                                    message: "INVALID TOKEN .....TRY AGAIN ",
                                    err
                                })
                            }
                        }
                    }
                }
            }




        })
    }

}