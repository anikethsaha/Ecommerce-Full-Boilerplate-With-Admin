const {
    orderModel,
    sellerModel,
    productModel,
    userModel
} = require('../../models')



module.exports = {
    updateOne: async (req, res) => {

        const productDetails = await productModel
            .findById(req.body.metadata._proID)
            .populate('_vendorID')
            .exec();
        const {
            address
        } = req.body.metadata;
        var addressArray = []
        for (const i in address) {
            if (address.hasOwnProperty(i)) {
                const element = address[i];
                addressArray.push(element)
            }
        }


        var cost = null;
        cost = productDetails.price * req.body.metadata.quantity;
        const IsOrderAlreadyExist = await orderModel.count({
            _vendorID: productDetails._vendorID._id,
            _userID: req.user._id,
            _productID: productDetails._id,
        }).exec();
        if (IsOrderAlreadyExist > 0) {
            // Already Its in order table......UPDATE THIS ONE
            orderModel.findOneAndUpdate({
                _vendorID: productDetails._vendorID._id,
                _userID: req.user._id,
                _productID: productDetails._id,
            }, {
                $set: {
                    mobileNo: req.body.metadata.mobile,
                    delivery_location: addressArray,
                    cost,
                    status: "PAYMENT_PENDING"
                }
            }, (err, newOrder) => {
                if (err) {
                    console.log('>>> UPDATE ERROR err :', err);
                } else {
                    res.json(newOrder);
                }
            })


        } else {
            const newOrder = await new orderModel({
                _vendorID: productDetails._vendorID._id,
                _userID: req.user._id,
                _productID: productDetails._id,
                mobileNo: req.body.metadata.mobile,
                delivery_location: addressArray,
                cost,
                status: "PAYMENT_PENDING"
            }).save()

            res.json(newOrder);
        }

    },
    cancelOrdering : async (req,res) => {
        const {_OID,_UID} = req.params;
        orderModel.findOneAndRemove({
            _id : _OID,
            _userID : _UID
        },(err,removedOrder)=>{
            if(err){
                res.render('error', {
                    message: "ERROR WHILE CANCELLING ..PLEASE CHECK THE DETAILS",
                    err
                })
            }else{

                res.render('success', {
                    message: "Successfully Cancelled The Order",
                })
            }
        })
     }
}