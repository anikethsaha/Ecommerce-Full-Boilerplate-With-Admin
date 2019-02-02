const userModel = require('./userModel')
const productModel = require('./product')
const orderModel = require('./order')
const sellerModel = require('./sellerModel')
const transactionModel = require('./Stripe_payment_transaction')
const deliveryModel = require('./delivery')
const CartModel = require('./cart')
const CompletedCartModel = require('./completedCart')
const newsLetterModel = require('./newsLetter')
module.exports = {
    userModel,
    productModel,
    orderModel,
    sellerModel,
    transactionModel,
    deliveryModel,
    CartModel,
    CompletedCartModel,
    newsLetterModel

}