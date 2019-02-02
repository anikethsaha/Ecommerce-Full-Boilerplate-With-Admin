const {CartModel,productModel, orderModel,userModel} = require('../../models')
const {razorpay_key_id,razorpay_key_secret}= require('../../../configs/config')
const Razorpay = require('razorpay')
module.exports = {

    showCartPage : async  (req,res) => {
        const cartDetails = await CartModel.find({
            _userID : req.user._id,
            status : "YET_TO_CHECKOUT"
        })
        .populate('_productIDArray')
        .exec();
        if(cartDetails === null || cartDetails[0] === undefined || cartDetails === []){

            res.render('cart/empty')
        }else{

            res.render('cart/cart',{
                cartDetails :cartDetails[0]
            })
        }

    },
    showAddressPage : async (req,res) => {
        // add this cart to order collection
        const {_c_i_d} = req.body;
        const loggedInUser = await userModel.findById(req.user._id).exec();
        const cartDetails  = await CartModel
        .findById(_c_i_d)
        .populate('_productIDArray')
        .exec()
        var vendorIDArray = [];
        cartDetails._productIDArray.forEach((product,i)=>{
            vendorIDArray.push(product._vendorID);
        })
        new orderModel({
            _userID : req.user._id,
            _cartID : _c_i_d,
            cost : cartDetails.cost,
            status : "PAYMENT_PENDING",
            mobileNo : loggedInUser.mobile || null,
            _vendorIDArray : vendorIDArray
        }).save((err,newOrder) => {
            if(err){
                res.render('error', {
                    message: "Invalid Details",
                    err
                })
         }else{
                res.render('cart/cart2',{
                    loggedInUser,
                    orderDetails : newOrder
                })
            }
        })
        // show the cart2.ejs page
    },
    showRecieptPageCart : async (req,res) => {


        // update the cart to complete_cart model and remove this data
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