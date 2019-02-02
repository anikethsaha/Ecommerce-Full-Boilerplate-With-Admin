const {
    productModel,
    orderModel,
    userModel
} = require('../../models')



module.exports = {
    showPaymentPage: async (req, res) => {
        const orderId = req.params.orderId;

        const orderDetails = await orderModel
            .findById(orderId)
            .populate('_vendorID')
            .populate('_productID')
            .populate('_userID')
            .exec();

        res.render('payment/payment-option', {
            orderDetails
        })
    },
    showCartPaymentPage: async (req, res) => {
        const _orderID = req.params._orderID
        orderModel
            .findById(_orderID)
            .populate('_cartID')
            .populate('_productID')
            .populate('_userID')
            .exec((err, orderDetails) => {

                if (err) {

                } else {
                    res.render('payment/payment-option-cart', {
                        orderDetails
                    })
                }

            })
    },
    useCoinUpdateOrderShowPaymentPage: async (req, res) => {
        const orderId = req.params.orderId;

        const userDetails = await userModel.findById(req.user._id).exec();
        var newCost = null;
        var newCoins = null;

        // updating the cost in the order collections
        orderModel.findById(orderId, async (err, neworder) => {
            if (err) {
                res.write("SOME ERROR OCCURED PLASE GO BACK AND TRY AGAIN")
            }



            if (userDetails.coins >= neworder.cost) { // if user has more coins then the product cost
                newCost = 0;
                newCoins = userDetails.coins - neworder.cost;
            } else {
                newCost = neworder.cost - userDetails.coins;
                newCoins = 0;
            }
            neworder.cost = newCost;

            const updatedUserCoins = await userModel.updateOne({
                _id: req.user._id
            }, {
                $set: {
                    coins: newCoins
                }
            })

            return neworder.save(async (err, order) => {
                if (err) {
                    res.write("SOME ERROR OCCURED PLASE GO BACK AND TRY AGAIN")
                }

                switch (req.params.type) {
                    case "b":
                        const orderDetails = await orderModel
                            .findById(orderId)
                            .populate('_vendorID')
                            .populate('_productID')
                            .populate('_userID')
                            .exec();

                        res.render('payment/payment-option', {
                            orderDetails
                        })

                        break;
                    case "c":
                        orderModel
                            .findById(orderId)
                            .populate('_cartID')
                            .populate('_productID')
                            .populate('_userID')
                            .exec((err, orderDetails) => {

                                if (err) {
                                    res.render('error', {
                                        message: " Please try again",
                                        err
                                    })
                                } else {
                                    res.render('payment/payment-option-cart', {
                                        orderDetails
                                    })
                                }

                            })
                        break;
                    default:
                        break;
                }

            })

        })


    },

}