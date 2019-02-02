const { CartModel,productModel ,orderModel} = require('../../models')
const mongoose = require('mongoose')
module.exports = {
    checkIsCartEmpty : async (req, res)=>{
        if (!req.user){

            return;
        }else{
            const cartDetails = await CartModel.find({
                _userID : req.user._id,
                status : 'YET_TO_CHECKOUT'
            }).exec()

            res.json(cartDetails);
        }

    },
    addProductToCart : async (req,res) =>{
        const {quantity} = req.body;
        var _productID = req.params.pid;

        _productID = mongoose.Types.ObjectId(_productID);


        const ifCartExist  = await CartModel.find({
            _userID : req.user._id,
        }).exec();
        var output = {};

        if(ifCartExist == null || ifCartExist.length == 0 || ifCartExist == '[]' )
        {
            //
            // create here

            // calculate the cart cost
            const productDetails = await productModel.findById(_productID).exec();
            const cost = productDetails.price * quantity;

            // product and quantity array
            var productArray = [];
            var quantityArray = [];
            productArray.push(_productID);
            quantityArray.push(quantity);
            // add to db

            return new CartModel({
                _userID : req.user._id,
                _productIDArray : productArray,
                quantityArray,
                cost,
                status : "YET_TO_CHECKOUT" ,
                numberOfItem : productArray.length

            }).save((err,newCartDetails) => {

                if(err){
                    output = {
                        type:"NEW_CART_ERROR",
                        status : "FAILED",
                        err
                    }

                    res.json(output)
                }else{
                    output = {
                        type:"NEW_CART_CREATED",
                        status : "SUCCESS",
                        cartDetails : newCartDetails
                    }

                    res.json(output)
                }
            })



        }else{

            // update here

            // get the existing cart details
           return CartModel.find({
                _userID : req.user._id,
                status : 'YET_TO_CHECKOUT'
            },async (err,userFromCart)=>{
                var countForIfProductAlreadyExist = 0

                userFromCart[0]._productIDArray.forEach(pid => {

                    if(`${pid}`==`${_productID}`){
                        countForIfProductAlreadyExist ++;
                    }

                });
                if(countForIfProductAlreadyExist > 0){

                    output = {
                        type:"PRODUCT_ALREADY_EXIST",
                        status : "FAILED",
                    }
                    res.json(output)
                }else{

                    var productArray = userFromCart[0]._productIDArray;
                    var quantityArray = userFromCart[0].quantityArray;

                    // updating the product and quantity array ....length or both should be equal
                    productArray.push(_productID);
                    quantityArray.push(quantity);

                    // get the new cost
                    const productDetails = await productModel.findById(_productID).exec();
                    const newCost = productDetails.price * quantity;



                    // updating the existing cart data for this user
                    userFromCart[0]._productIDArray = productArray;
                    userFromCart[0].quantityArray = quantityArray;
                    userFromCart[0].numberOfItem = userFromCart[0].numberOfItem + 1;
                    userFromCart[0].cost = userFromCart[0].cost + newCost;
                    userFromCart[0].save((err,updatedUserFromCart)=>{
                        if(err){
                            output = {
                                type:"CART_UPDATED_ERROR",
                                status : "FAILED",
                                err
                            }

                            res.json(output)

                        }else{

                            output = {
                                type:"CART_UPDATED",
                                status : "SUCCESS",
                                cartDetails : userFromCart
                            }
                            res.json(output)
                        }
                    })
                }

            })



            // calculate the cost
            // update the db

        }

    },
    updateCart : async (req,res) => {
        const {pid,_cartID,price} = req.body


        switch (req.params.action) {
            case "remove":

                    await CartModel.find({
                        _userID : req.user._id,
                        status : 'YET_TO_CHECKOUT'
                    })
                    .exec(async (err,cartDetails) => {

                        if(cartDetails[0]._id == _cartID){
                            if(err){
                                res.json({
                                    type:"FETCH_REMOVE_ERROR",
                                    status : "FAILED",
                                    err
                                })
                            }else{

                                var newProductArrayID = cartDetails[0]._productIDArray;
                                var newQuantityArray =cartDetails[0].quantityArray;
                                var newCost = cartDetails[0].cost;
                                var newNumberOfItem = cartDetails[0].numberOfItem;
                                cartDetails[0]._productIDArray.forEach(async (product,i)=>{

                                    if(pid == product._id){
                                        // new cost
                                        const quantityOfThisProduct =  cartDetails[0].quantityArray[i];
                                        newCost =   newCost - (price * quantityOfThisProduct);
                                        // new numberOfItem
                                        newNumberOfItem--;
                                        newProductArrayID.splice(i,1);
                                        newQuantityArray.splice(i,1);
                                    }
                                })
                                cartDetails[0]._productIDArray =  newProductArrayID;
                                cartDetails[0].quantityArray =  newQuantityArray;
                                cartDetails[0].numberOfItem =  newNumberOfItem;
                                cartDetails[0].cost =  newCost;
                                cartDetails[0].save(async (err,updatedCartDetails)=> {
                                if (err) {
                                    res.json({
                                        type:"UPDATE_REMOVE_ERROR",
                                        status : "FAILED",
                                        err
                                    })
                                }else{
                                    res.json({
                                        type:"SUCCESSFULLY_UPDATED_CART_DETAILS",
                                        status : "SUCCESS",
                                        cartDetails : updatedCartDetails
                                    })
                                }
                            })
                            }
                        }else{

                            res.json({
                                type:"UPDATE_CARID_NOT_MATCHED",
                                status : "FAILED",
                            })
                        }
                    })
            break;
            case "decrease":

                    await CartModel.find({
                    _userID : req.user._id,
                    status : 'YET_TO_CHECKOUT'
                })
                .exec(async (err,cartDetails) => {

                    if(cartDetails[0]._id == _cartID){
                        if(err){
                            res.json({
                                type:"FETCH_REMOVE_ERROR",
                                status : "FAILED",
                                err
                            })
                        }else{
                            var newQuantityArray = cartDetails[0].quantityArray;
                            var newCost = cartDetails[0].cost;
                            cartDetails[0]._productIDArray.forEach(async (product,i)=>{
                                if(pid == product._id){
                                    // new cost

                                    newQuantityArray.splice(i,1,newQuantityArray[i]-1);
                                    newCost =   newCost - price;

                                }
                            })
                            cartDetails[0].quantityArray =  newQuantityArray;

                            cartDetails[0].cost =  newCost;

                            cartDetails[0].save(async (err,updatedCartDetails)=> {
                                if (err) {
                                res.json({
                                    type:"UPDATE_REMOVE_ERROR",
                                    status : "FAILED",
                                    err
                                })
                                }else{
                                res.json({
                                    type:"SUCCESSFULLY_UPDATED_CART_DETAILS",
                                    status : "SUCCESS",
                                    cartDetails : updatedCartDetails
                                })
                                }
                            })
                        }
                    }else{

                        res.json({
                            type:"UPDATE_CARID_NOT_MATCHED",
                            status : "FAILED",
                        })
                    }
                })
            case "increase":

                await CartModel.find({
                _userID : req.user._id,
                status : 'YET_TO_CHECKOUT'
            })
            .exec(async (err,cartDetails) => {

                if(cartDetails[0]._id == _cartID){
                    if(err){
                        res.json({
                            type:"FETCH_REMOVE_ERROR",
                            status : "FAILED",
                            err
                        })
                    }else{
                        var newQuantityArray = cartDetails[0].quantityArray;
                        var newCost = cartDetails[0].cost;
                        cartDetails[0]._productIDArray.forEach(async (product,i)=>{
                            if(pid == product._id){
                                // new cost
                               newQuantityArray.splice(i,1,newQuantityArray[i]+1);
                                newCost =   parseInt(newCost) + parseInt(price);

                            }
                        })

                        cartDetails[0].quantityArray =  newQuantityArray;

                        cartDetails[0].cost =  newCost;

                        cartDetails[0].save(async (err,updatedCartDetails)=> {
                            if (err) {
                            res.json({
                                type:"UPDATE_REMOVE_ERROR",
                                status : "FAILED",
                                err
                            })
                            }else{
                            res.json({
                                type:"SUCCESSFULLY_UPDATED_CART_DETAILS",
                                status : "SUCCESS",
                                cartDetails : updatedCartDetails
                            })
                            }
                        })
                    }
                }else{

                    res.json({
                        type:"UPDATE_CARID_NOT_MATCHED",
                        status : "FAILED",
                    })
                }
            })
            break;
            default:
                break;
        }
    },
    updateOrderForCart : async (req,res) => {
        var output = {};
        const { _cartID , _orderId , address, mobile} = req.body.metadata;

        orderModel.findById(_orderId,async (err,orderDetails) => {
            if(err){
                res.json({
                        type:"ORDER_DETAILS_NOT_PRESENT",
                        status : "FAILED",
                        err
                    })
            }else{
                var addressArray = []
                for (const i in address) {
                    if (address.hasOwnProperty(i)) {
                        const element = address[i];
                        addressArray.push(element)
                    }
                }
                orderDetails.delivery_location = addressArray;
                orderDetails.mobileNo = mobile;
                orderDetails.save((err,newOrderDetails) => {
                    if(err){

                        res.json({
                            type:"FAILED_TO_UPDATE",
                            status : "FAILED",
                            err
                        })
                    }else{

                            res.json(newOrderDetails)

                    }
                })
            }
        })
    }

}