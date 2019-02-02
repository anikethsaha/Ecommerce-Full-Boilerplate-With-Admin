const orderModel = require('../model/order')

module.exports = {
    getAllOrders : async (req,res) => {
        orderModel.find({

        },async (err,orders) => {
           if(err){
               res.json({
                   err,
                   status : "Failed"
               })
           }else{
               var output = [];
               orders = JSON.stringify(orders);
               orders = JSON.parse(orders);
               for (const i in orders) {
                   var eachRowArray = [];
                   if (orders.hasOwnProperty(i)) {
                       const element = orders[i];
                       eachRowArray.push(element._id)
                       eachRowArray.push(element._vendorIDArray)
                       eachRowArray.push(element.delivery_location)
                       eachRowArray.push(element._userID)
                       eachRowArray.push(element._completedCartID)
                       eachRowArray.push(element._transactionID)
                       eachRowArray.push(element._productID)
                       eachRowArray.push(element._vendorID)
                       eachRowArray.push(element.cost)
                       eachRowArray.push(element.status)
                       eachRowArray.push(element.mobileNo)
                       eachRowArray.push(element.createdAt)

                   }
                   output.push(eachRowArray)
               }
               res.send(output);
           }
       });

      },
      showEditOrder : async (req,res) => {
        const { _orderID} = req.params;
        const orderDetails = await orderModel.findById(_orderID).exec();
        res.render("EditOrder",{
            orderDetails
        })
       },

    editOrderStatus :async (req,res) => {
        const {_orderID } = req.params;
        const {orderStatus} = req.body;
        await orderModel.findByIdAndUpdate(_orderID,{
            status : orderStatus
        },async (err,newDelivery) => {
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
}