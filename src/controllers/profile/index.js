const { showProfile} = require('./display')
const { getAllOrders,getAllFavs} = require('./dataFetches')
const {addEmail,addAddr,emailVerifyCallback } = require('./setting')
module.exports = {
    showProfile,
    getAllOrders,
    getAllFavs,
    addEmail,
    addAddr,
    emailVerifyCallback
}