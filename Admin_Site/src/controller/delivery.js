const deliveryModel = require('../model/delivery')
const orderModel = require('../model/order')
module.exports = {
    getDelivery : async (req,res) => {
        return  deliveryModel.find({},(err,users) => {
            if(err){
                res.json({
                    err,
                    status : "Failed"
                })
            }else{
                var output = [];
                users = JSON.stringify(users);
                users = JSON.parse(users);
                for (const i in users) {
                    var eachRowArray = [];
                    if (users.hasOwnProperty(i)) {
                        const element = users[i];

                        eachRowArray.push(element._id)
                        eachRowArray.push(element._vendorID)
                        eachRowArray.push(element.delivery_location)
                        eachRowArray.push(element._userID)
                        eachRowArray.push(element._productID)
                        eachRowArray.push(element._cartID)
                        eachRowArray.push(element.delivery_status)
                        eachRowArray.push(element._orderID)
                        eachRowArray.push(element.delivery_contact_details)
                        eachRowArray.push(element.createdAt)
                    }
                    output.push(eachRowArray)
                }
                res.send(output);
            }
        })

     },
     showEditDelivery : async(req,res) => {
        const {_deliveryID } = req.params;
        const deliveryDetails = await deliveryModel.findById(_deliveryID).exec();
        res.render('EditDelivery',{
            deliveryDetails
        })
     },
     editDeliveryStatus : async (req,res) => {
        const {_deliveryID } = req.params;
        const {deliveryStatus} = req.body;
        await deliveryModel.findByIdAndUpdate(_deliveryID,{
            delivery_status : deliveryStatus
        },async (err,newDelivery) => {
            if(err){
                res.render('result',{
                    err,
                    status :"FAILED"
                })
            }else{
                await orderModel.findByIdAndUpdate(newDelivery._orderID,{
                    status : deliveryStatus
                },async (err,newOrder) => {
                    if(err){
                        res.render('result',{
                            err,
                            status :"FAILED"
                        })
                    }else{
                        res.render('result',{
                            status :"SUCCESS",
                            err : undefined
                        })
                    }
                })

            }
        })
     }
}