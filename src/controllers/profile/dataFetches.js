const {
    userModel,
    productModel,
    CartModel,
    orderModel
} = require('../../models')
module.exports = {
    getAllOrders: async (req, res) => {
        const orderDetails = await orderModel.find({
                _userID: req.user._id
            })
            .populate('_productID')
            .populate('_completedCartID')
            .exec();
        if (orderDetails.length == 0 || orderDetails.length == undefined) {

            res.send('<span class="med-heading">No order Placed</span>');
        } else {


            var outputstring = "";
            orderDetails.forEach(async e => {

                var subOutputString = "";

                if (e._productID !== undefined || typeof e._productID == {}) {

                    subOutputString = `
                    <div class="col-lg-12">
                           <div class="col-md-3">
                               <img src="/images/product-img/${e._productID.images[0]}" alt="" srcset="">
                           </div>
                           <div class="col-md-9 p-1">
                               <span class="col-md-12 m-grey-title m-title-bold ">${e._productID.name}</span>
                               <span class="col-lg-12 meta-data-span m-half-auto ">${e.status}</span>
                               <span class="col-lg-12 meta-data-span ">Rs ${e._productID.price}</span>
                           </div>
                       </div>`;

                } else {
                    if (e._completedCartID !== undefined) {
                        var productInsideCartDetailsString = "";
                        // console.log('>>>>>>  CART IS PRESENT  e._completedCartID :', e._userID, e._completedCartID);
                        // e._completedCartID._productIDArray.forEach( ep => {
                        //     productModel.findById(ep, (err, productDetails) => {
                        //         console.log('productDetails._id :', productDetails._id);
                        //         subOutputString =  subOutputString + `
                        //             <div class="col-lg-12">
                        //             <div class="col-md-3">
                        //                 <img src="/images/product-img/${productDetails.images[0]}" alt="" srcset="">
                        //             </div>
                        //             <div class="col-md-9 p-1">
                        //                 <span class="col-md-12 m-grey-title m-title-bold ">${productDetails.name}</span>
                        //                 <span class="col-lg-12 meta-data-span m-half-auto ">${e.status}</span>
                        //                 <span class="col-lg-12 meta-data-span ">Rs ${productDetails.price}</span>
                        //             </div>
                        //         </div>

                        //         `;


                        //     });
                        // })

                            subOutputString = subOutputString + `
                            <div class="col-lg-12">

                                <div class="col-md-9 p-1">

                                    <a href="/show/cart/${e._completedCartID._id}" >
                                        <span class="col-md-12 m-grey-title m-title-bold ">CART ID : ${e._completedCartID._id}</span>
                                        <span class="col-lg-12 meta-data-span m-half-auto ">${e._completedCartID.status}</span>
                                        <span class="col-lg-12 meta-data-span ">Rs ${e._completedCartID.cost}</span>
                                    </a>
                                </div>
                            </div>

                                `;
                        }

                }


                outputstring = outputstring + `
                <div class="col-md-12 m-half-auto m-list m-border-full m-shadow p-h-0">
                   <div class="col-md-12 m-list-title-bar">
                       <div class="col-md-6">
                           <a href="/buy/done/${e._transactionID}" >
                                <span class="meta-data-span m-title-bold">ORDER ID  </span>
                                <span class="meta-data-span"> ${e._id}</span>
                           </a>
                       </div>
                       <div class="col-md-6">
                           <span class="meta-data-span m-title-bold"> Rs ${e.cost} </span>
                           <span class="meta-data-span"> ${e.createdAt}</span>
                       </div>
                   </div>



               </div>
                `;
            });

            res.send(outputstring)

        }

    },
    getAllFavs: async (req, res) => {
        var output = '';
        var userDetails = await userModel.findById(req.user._id).populate("favList").exec();
        if (userDetails.favList == []) {
            res.send("No Favourite to show");
        } else {

            userDetails.favList.map((pro, i) => {

                output = output + `
            <div class="fav-product  col-lg-3  m-border-full p-h-0">
                <div class="">
                    <a href="/show/product/` + pro._id + `">
                        <img src="http://localhost:8000/images/product-img/${pro.images[0]}" alt="" srcset="">
                    </a>
                </div>
                <div class="col-lg-12  m-half-auto p-h-0 text-center"><a href="/show/product/` + pro._id + `" class="blue-title">${pro.name}</a></div>
            </div>`;
            })


            res.send(output);
        }

    }
}