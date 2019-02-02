const { showCartPage , showAddressPage ,showRecieptPageCart} = require('./display')
const {
    checkIsCartEmpty,
    addProductToCart,
    updateCart,
    updateOrderForCart
} = require('./bag')
module.exports = {
    updateCart,
    checkIsCartEmpty,
    addProductToCart,
    showCartPage,
    showAddressPage,
    updateOrderForCart,
    showRecieptPageCart
    
}