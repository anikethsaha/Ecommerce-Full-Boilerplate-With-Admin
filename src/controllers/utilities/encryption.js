var crypto = require('crypto')
var hashSha2 = crypto.createHash('sha256');
var hashMD5 = crypto.createHash('md5')
var hashSha1 = crypto.createHash('sha1')
const {
    algorithm,
    password
} = require('../../../configs/config')
module.exports = {
    generateSha2: async (string) => {
        return await hashSha2.update(string, 'utf8').digest('hex');
    },

    generateSha1: async (string) => {
        return await hashSha1.update(string, 'utf8').digest('hex');
    },

    generateMD5: async (string) => {
        return await hashMD5.update(string, 'utf8').digest('hex');
    },
    encrypt: async (text) => {
        var cipher = crypto.createCipher(algorithm, password)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt: async (text) => {
        var decipher = crypto.createDecipher(algorithm, password)
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }

}