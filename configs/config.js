const bcrypt = require('bcrypt');
const oauth = {
    GOOGLE_CLIENT_KEY: "",
    GOOGLE_CLIENT_ID: "",
    GOOGLE_CLIENT_SECRET: "",
    GOOGLE_CLIENT_CALLBACK: "/auth/google/callback",

    FACEBOOK_APP_ID: "",
    FACEBOOK_APP_SECRET: "",
    FACEBOOK_APP_CALLBACK: "/auth/facebook/callback"
}
module.exports = {
    port: 8000,
    sessionSecretKey: bcrypt.hashSync("_SECRET_KEY_HERE_", 2),
    oauth,
    salt: "__salt__",
    dbname: '_DBname_' ,
    stripeSecretKey: "",
    razorpay_key_id: "",
    razorpay_key_secret: "",
    hostName: '',// use this link for development in this project 'http://localhost:8000',
    // Mail Contents
    companyName: '',
    teamEmailAddress: "",
    smptUserName: "",
    smtpPassword: "",
    smtpService: "",
    // Encryption Constants
    algorithm:'', //'aes-256-ctr',
    password: '',//'d6F3Efeq'
    sessionKeys : ['key1','key2'],
    MONGODB_URL  : `mongodb://localhost/_DBname_` // Your mongodb url or mongoATLAS url will go here


}