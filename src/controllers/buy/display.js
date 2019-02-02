const {userModel,productModel,orderModel} = require('../../models')
const {razorpay_key_id,razorpay_key_secret}= require('../../../configs/config')
const Razorpay = require('razorpay')

module.exports = {
    showReviewPage : async (req,res) => {
        const orderID = req.params.orderID;
        const orderDetails = await orderModel
        .findById(orderID)
        .populate('_vendorID')
        .populate('_productID')
        .populate('_userID')
        .exec();

        res.render('cart/buynow-2',{
            orderDetails
        });
    },

    showAddressPage : async (req,res) =>{

        // 5bb1d86fcf97d62440ecc912  use this for temp until isAuth middleware is removed
        // const loggedInUser = await userModel.findById('5bb1d86fcf97d62440ecc912').exec();
       const loggedInUser = await userModel.findById(req.user._id).exec();
        const {  _pro_i_d,size,color,quantity } = req.body;
        const _proID = _pro_i_d;

        res.render('cart/buynow',{
            loggedInUser,
            itemDetails :{
                _proID,
                size,
                color,
                quantity
            }
        });
    },
    showRecieptPage : async (req,res) => {
        const paymentId = req.params.transactionID
        var instance = new Razorpay({
            key_id: razorpay_key_id,
            key_secret: razorpay_key_secret
        })
        const transactionDetails = await instance.payments.fetch(paymentId);
        const orderDetails  = await orderModel.find({
            _transactionID : paymentId
        })
        .populate('_vendorID')
        .populate('_productID')
        .populate('_completedCartID')
        .exec();

        res.render('payment/payment-reciept',{
            orderDetails,
            transactionDetails
        })

    }
}