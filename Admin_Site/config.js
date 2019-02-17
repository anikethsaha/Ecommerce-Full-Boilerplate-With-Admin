const bcrypt = require('bcrypt');
module.exports = {
    port : 4000,
    sessionSecretKey : bcrypt.hashSync("SECRET_KEY", 2),
    dbname : 'dbname',
    sessionKeys : ['key1','key2'],
    MONGODB_URL  : '', //mongodb://localhost/${dbname}
    productImageSavingLocation : '../public/images/product-img/',
    websiteImageSavingLocation : '../public/images/website-img/'
}