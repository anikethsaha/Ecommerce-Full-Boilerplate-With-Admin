const {
    showReviewPage,
    showAddressPage,
    showRecieptPage
} = require('./display')
const {updateOne,cancelOrdering} = require('./dataBaseOp')

module.exports = {
    showReviewPage,
    showAddressPage,
    updateOne,
    showRecieptPage,
    cancelOrdering
}