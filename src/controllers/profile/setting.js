const {
    userModel
} = require('../../models')
const nodemailer = require('nodemailer');
const hat = require('hat')
const {
    hostName,
    companyName,
    teamEmailAddress,
    smtpPassword,
    smptUserName,
    smtpService
} = require('../../../configs/config')
var verification_ID, emailToVerify;
const randomNumberGenerator = () => {
    return Math.floor((Math.random() * 10000) + 54);
}
verification_ID = hat();
module.exports = {
    addEmail: async (req, res) => {
        const {
            email
        } = req.body;
        emailToVerify = email;
        let smtpTransport = nodemailer.createTransport({
            service: smtpService,
            auth: {
                user: smptUserName,
                pass: smtpPassword
            }
        });

        let mailOptions = {
            from: '"FROM ' + companyName + ' 👻" <' + teamEmailAddress + '>',
            to: email, // list of receivers
            subject: 'Please Verify Your Email Address ✔',
            html: `
                Hi,
                Thank you for choosing for ${companyName}' .
                To complete the change/add email process, please click  <a href="${hostName}/verify/email/${verification_ID}">verify</a> link and verify through the email change process.
                - from ${companyName}  team.`,
        };

        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send(`<h1>Please Try Again....<a href='${hostName}/profile/#pSettings'>Click Here</a>  <h1>`)
            }
            res.send("<h1>Please Check your mail account to verify your email address <a href='${hostName}/profile/#pSettings'>Click Here To Go Back</a>  </h1>")
        });

    },
    emailVerifyCallback: async (req, res) => {
        if ((req.protocol + "://" + req.get('host')) == hostName) {
            if (req.params.verification_ID == verification_ID) {
                userModel.findById(req.user._id, (err, user) => {
                    user.email = emailToVerify;
                    user.save((error, newUser) => {
                        if (error) {

                            res.render('error', {
                                message: "Please try again",
                                err: `<a href='${hostName}/profile/#pSettings'>Click Here</a> </h1>`
                            })

                        } else {
                            res.redirect(`${hostName}/profile/#pSettings`)
                        }
                    })
                })
            }
        }

    },
    addAddr: async (req, res) => {
        const {
            addr1,
            addr2,
            city,
            state,
            pin
        } = req.body;
        var addressArray = [addr1, addr2, city, state, pin];
        userModel.findById(req.user._id, (err, user) => {
            user.address = addressArray;
            user.save((err, newUser) => {
                if (err) {
                    res.render('error', {
                        message: "Please try again",
                        err: `<a href='${hostName}/profile/#pSettings'>Click Here</a> </h1>`
                    })
                } else {
                    res.redirect(`${hostName}/profile/#pSettings`)
                }
            })
        })

    }
}