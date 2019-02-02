
const {productModel} = require('../../models')


module.exports = {
    showBrand : async (req,res)=>{

        const brand  = req.params.brand;
        const category  = req.params.category;
        const prods = await productModel.find({
            brand,
            category
        }).exec();

        res.render('product-list-3',{
            brand,
            category,
            count : prods.length || 0
        })
    },
    fetchBrand :  async (req,res)=>{
        // await seed();
        // await seed();
        // await seed();
        console.log("WOKRING Brand")
        const brand  = req.params.brand;
        var limit = req.params.limit;
        const category  = req.params.category;
        limit = parseInt(limit);
        console.log('limit :', limit);
        const product = await productModel.find({
            brand,
            category
        }).
        populate('_vendorID')
        .skip(limit + 3)
        .limit(limit)
        .exec();
        var output = '';
        product.forEach((pro,i) => {
            var colorsString = '';
            var sizeString = '';
            pro.colors.forEach(color => {
                colorsString += `<i class="fa fa-circle" style='`+
                    (function(colorr){
                        if(colorr == "White"){
                            return "border: 1px solid grey;";
                        }else{
                            return ""
                        }
                    })(color)
                +` color:${color};margin: auto .5em;border-radius: 100%;' aria-hidden="true"></i>`;

            })
            pro.size.forEach(s => {
                sizeString += s + " ";
             })
            output = output + `
            <div class="col-md-3 product-card ">
                <a class=" favme fa fa-heart-o my-fav-hert"  style="color:grey;padding:1em;"
                href="/add/fav/` + pro._id +`/` + pro._vendorID._id +`"
                >
                </a>
                <a href="/show/product/` + pro._id +`">
                    <div class="product-details">
                        <div class="img-container">
                            <img  src="/images/product-img/`+ pro.images[0] + `" alt="">
                        </div>
                        <div class="row product-meta-data">

                            <div class="col-md-12">
                                <h3 class="sub-heading t compact">` + pro.name +`</h3>
                            </div>
                            <div class="col-md-12 m-half-auto">
                                <span class="small-para">` + pro.subCategory +`</span>
                            </div>
                            <div class='col-md-12'>
                                <div class="l-product-details">
                                    <span class="small-label">colors : </span>
                                    <span >` + colorsString+ ` </span>
                                </div>
                            </div>
                            <div class='col-md-12'>
                                <div class="l-product-details">
                                    <span class="small-label">sizes : </span>
                                    <span >` + sizeString+ ` </span>
                                </div>
                            </div>
                            <div class="col-md-12 hr-line m-half-auto">

                                 <div class=" box-compact">
                                    <div class="cost">
                                        <span class="small-para" style="font-size:15px;">&#9733;</span>
                                        <span class="small-para" >` + pro.rating +`</span>
                                    </div>
                                </div>

                                 <div class=" box-compact">
                                    <div class="cost">
                                       <img class="icon-svg sh" src="/images/icon/rupee-indian.svg" alt="">
                                    </div>
                                </div>
                                <div class=" box-compact">
                                    <div class="cost">

                                        <span class="small-para">` + pro.price +`</span>
                                    </div>
                                </div>
                                <div class=" box-compact">
                                    <div class="cost">
                                        <span class="small-para">` + pro.brand +`</span>
                                    </div>
                                </div>

                            </div>


                        </div>




                    </div>
                    </a>
                    </div>

            `;
        });
        res.send(output);
    }

}