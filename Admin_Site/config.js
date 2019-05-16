const bcrypt = require('bcrypt');
module.exports = {
    port : 4000,
    sessionSecretKey : bcrypt.hashSync("SECRET_KEY", 2),
    dbname : '_DBname_',
    sessionKeys : ['key1','key2'],
    MONGODB_URL  :`mongodb://localhost/_DBname_`, // Your mongodb url or mongoATLAS url will go here
    productImageSavingLocation : '../public/images/product-img/',
    websiteImageSavingLocation : '../public/images/website-img/'
}