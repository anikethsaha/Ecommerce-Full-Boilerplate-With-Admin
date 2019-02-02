const {CartModel} = require('../models')


module.exports={
    isEmptyCart : async (req,res,next) => {
        const cartDetails = await CartModel.find({
            _userID : req.user._id,
            status : "YET_TO_CHECKOUT"
        }) 
        .populate('_productIDArray')
        .exec();
        if(cartDetails === null 
            || cartDetails[0] === undefined 
            || cartDetails === []
            || cartDetails[0]._productIDArray.length == 0){
            console.log("EMPTY CART")
            res.render('cart/empty')
        }else{
           next();
        }
    }
}