const  {
    showPaymentPage,
    useCoinUpdateOrderShowPaymentPage,
    showCartPaymentPage,
} = require('./display')
const {
    stripeCharge,
    razorpayResponseCallback
} = require('./charge')
module.exports = {
    showPaymentPage,
    stripeCharge,
    useCoinUpdateOrderShowPaymentPage,
    razorpayResponseCallback,
    showCartPaymentPage
    
}