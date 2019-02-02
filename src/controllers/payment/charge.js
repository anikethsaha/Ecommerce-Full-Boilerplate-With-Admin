const {stripeSecretKey,razorpay_key_id,razorpay_key_secret}= require('../../../configs/config')
const {orderModel,transactionModel,deliveryModel,userModel,CartModel,CompletedCartModel} = require('../../models')
var stripe = require("stripe")(stripeSecretKey);


const Razorpay = require('razorpay')

module.exports = {
    stripeCharge : async (req,res) => {
        const orderDetails = await orderModel.findById(req.body.metadata._orderID).exec();

        stripe.charges.create({
            amount: orderDetails.cost * 100,  // any amount * 100
            currency: "inr",
            source: "tok_mastercard",   //   req.body._stripToken, // obtained with Stripe.js
            description: "Charge for just like that"
          }, async function(err, charge) {
            // asynchronously called
            var output = {};
            if(err){

                output = {
                    type : "ERROR",
                    status : "FAILED",
                    err
                }
            }else{
                // update the status in orderCOllection
                await orderModel.findById(orderDetails._id,(err,order) => {
                    order.status = "PAID";
                    order.save();
                })

                // create a record in transaction
                await new transactionModel({
                    _customerID : req.user._id,
                    _stripeTransactionID : charge.id,
                    amount:charge.amount,
                    currency :charge.currency,
                    transactionCreatedAt:charge.created,
                    description :charge.description,
                    _balance_transactionID:charge.balance_transaction,
                    object : charge.object,
                    status : charge.status,
                    _sourcesCardID:charge.source.id,
                    paid : charge.paid,
                    refundURL :charge.refunds.url,
                    risk_level : charge.outcome.risk_level,
                    seller_message :charge.outcome.seller_message
                }).save();

                output = {
                    type : "NON_ERROR",
                    status : "SUCCESS",
                    charge
                }
            }
            res.json(output)
          });
    },
    razorpayResponseCallback : async (req,res) => {
        var output = {};

        console.log('req.body from razorpayResponseCallback:', req.body);
        const paymentId = req.body.response.razorpay_payment_id;
        const orderDetails = req.body.orderDetails;
        var instance = new Razorpay({
            key_id: razorpay_key_id,
            key_secret: razorpay_key_secret
        })

        const transactionDetails = await instance.payments.fetch(paymentId);

        var coinToBeAdded = (req.body.orderDetails.cost * 1)/100;
        await userModel.findById(req.user._id,(err,user) => {
            user.coins = coinToBeAdded;
            user.save();
        })

        console.log('transactionDetails  from razorpayResponseCallback:', transactionDetails);
        await orderModel.findById(orderDetails._id,async (err,order) => {
            if(err){

                output = {
                    type : "ERROR",
                    status : "FAILED",
                    err
                }

                res.json(output)
            }else{
                    var shippingCharges = 50;
                    if(order.cost > 999){
                        shippingCharges = 0
                    }
                    order.cost = parseInt(order.cost) + parseInt(shippingCharges);
                    order.status = "PAID";
                    order._transactionID =  transactionDetails.id;

                    order.save();

                    if((order._cartID !== null || order._cartID !== undefined) && order._productID === undefined){

                        CartModel.findById(order._cartID,(err,cart) => {
                            // move to completedcart db and then delete this record
                            new CompletedCartModel({
                                _id : cart._id,
                                _userID: req.user._id ,
                                  _productIDArray : cart._productIDArray ,
                                  quantityArray : cart.quantityArray,
                                  cost : cart.cost,
                                  numberOfItem : cart.numberOfItem
                            }).save(async (err,newcc) => {
                                if(err){
                                    output = {
                                        type : "ERROR",
                                        status : "FAILED",
                                        err
                                    }
                                }else{

                                    await CartModel.findByIdAndRemove(order._cartID).exec();
                                    await orderModel.findByIdAndUpdate(order._id,{
                                        $set:{
                                            _cartID : null,
                                            _completedCartID : newcc._id
                                        }
                                    }).exec();
                                }
                            });
                        })

                    }
                    await new deliveryModel({
                        _vendorID : order._vendorID || order._vendorIDArray,
                        _userID: req.user._id,
                        _productID:order._productID || null ,
                        _cartID : order._completedCartID || null,
                        delivery_status : "ORDERED_PLACE",
                        _orderID : order._id,
                        delivery_location : order.delivery_location,
                        delivery_contact_details : order.mobileNo,
                    }).save()
                    output = {
                        type : "NON_ERROR",
                        status : "SUCCESS",
                        paymentId
                    }

                    res.json(output)
                }

                // res.json(output)
            })

    }














}