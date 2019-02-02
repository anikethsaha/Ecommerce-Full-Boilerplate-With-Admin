const bcrypt = require('bcrypt');
module.exports = {
    port : 4000,
    sessionSecretKey : bcrypt.hashSync("SECRET_KEY", 2),
    dbname : '_DBname_'
}