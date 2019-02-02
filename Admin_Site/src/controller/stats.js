const ProductModel = require('../model//product'),
UserModel = require('../model/userModel'),
SellerModel = require('../model/sellerModel'),
DeliveryModel = require('../model/delivery'),
OrderModel = require('../model/order');


module.exports = {
    getStats : async (req,res) => {
        var products,users,sellers,deliveries,orders,cancellations,shipping;
        products = await ProductModel.count().exec();
        users = await UserModel.count().exec();
        sellers = await SellerModel.count().exec();
        orders = await OrderModel.count().exec();
        deliveries = await DeliveryModel.count().exec();
        cancellations = await OrderModel.count({
            status : "CANCELLED"
        }).exec();
        shipping = await OrderModel.count({
            status : "SHIPPING"
        }).exec();
        res.json({
            products,
            users,
            sellers,
            deliveries,
            orders,
            cancellations,
            shipping
        })
     }
}