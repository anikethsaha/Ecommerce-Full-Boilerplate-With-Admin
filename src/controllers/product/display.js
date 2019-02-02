const {productModel ,subscriptionplanModel} = require('../../models')
const randomname = () =>{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };
  const randonumber = () =>{
    var text = "";
    var possible = "123456789";

    for (var i = 0; i < 3; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };
  const randomNumberOne = (l) => {
    var possible = "0123456789";

    for (var i = 0; i < 1; i++)
      text = possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };
  seed = async () => {
    var o = 0;
    var nameArray = ['In Search of Lost Time by Marcel Proust',
         'Don Quixote by Miguel de Cervantes',
         'Ulysses by James Joyce',
         'The Great Gatsby by F. Scott Fitzgerald',
         'Moby Dick by Herman Melville',
         'Hamlet by William Shakespeare',
         'War and Peace by Leo Tolstoy',
         'The Odyssey by Homer'
        ]

    var QualityTypeArray = ['Used','New','Used','New','Used','New','Used','New','Used','New','Used','New','Used','New']
    var  imagesArray = ['sid1.jpg','sid2.jpg','sid3.jpg','sid1.jpg','sid2.jpg','sid3.jpg','sid1.jpg','sid2.jpg','sid3.jpg' ];
    var  categoryArray = ['Men','Women','Kids','Sports','Men','Women','Kids','Sports','Men','Women','Kids','Sports'];
    var  subCategoryArray = ['fiction','non-fiction','academics','exam','fiction','non-fiction','academics','exam','fiction','non-fiction','academics','exam'];
    var  metaDataArray  =  [{author : "RK",publisher : 'S.books'},{author : "SKSingh"},{author : "Aniketh"},{author : "Galtv"}];
    var vendorIDArray = ['5bb328d524b1828acfe2c657','5bb31aca24b1828acfe2be71',"5bb328fa24b1828acfe2c67d","5bb3292124b1828acfe2c6a8",'5bb328d524b1828acfe2c657','5bb31aca24b1828acfe2be71',"5bb328fa24b1828acfe2c67d","5bb3292124b1828acfe2c6a8",'5bb328d524b1828acfe2c657','5bb31aca24b1828acfe2be71',"5bb328fa24b1828acfe2c67d","5bb3292124b1828acfe2c6a8"]
    var highlights = [	'Runner Type:Pro	Running' ,'Track:Road'	,'Color:Blue','Features:Lightweight','Pronation:Neutral','Upper Material:Mesh','Textile Sole Material:Rubber'	,'Shoe Weight:Lightweight(300 gms to 599 gms)'	,'Style Code:AQ0067-400','MRP (Inc. of all taxes):9999','UPC: SDL847707091']
    var description = "The Nike Epic React Flyknit Men's Running Shoe provides crazy comfort that lasts as long as you can run. Its Nike React foam cushioning is responsive yet lightweight, durable yet soft. This attraction of opposites creates a sensation that not only enhances the feeling of moving forwards, but makes running feel fun, too";
    var tnC = "Shop for ASICS on Jabong (Website, Mobile site or Mobile App) between 7th September and 9th September 2018 The eligibility criteria for the offer is based on the total transaction amount of the shopper on Jabong    MJIPL reserves the right to disqualify any participant that tampers or attempts to tamper with the Terms & Conditions of the offer, as mentioned in this documentThe decision of MJIPL shall be final with respect to all matters relating to this campaign and the result of this campaign and shall not be subject to review or appeal by any customer or by any third party  The authorized subscriber of the e-mail account used to enter the Campaign at the actual time of entry will be deemed to be the participant and must comply with these terms & conditions in the event of a dispute as to entries submitted by multiple users having the same e-mail account. The authorized account holder is deemed to be the natural person who is assigned to an e-mail address by an Internet access provider, service provider, or other online organization that is responsible for assigning e-mail addresses for the domain associated with the submitted e-mail address";
    await new productModel({
    name : nameArray[randomNumberOne()],
    highlights :highlights ,
    description : description,
    _vendorID :"5c14f9fc992e90fefd9f02cf", //vendorIDArray[randomNumberOne(vendorIDArray.length-1)],
    rating : randomNumberOne(),
    metaData :metaDataArray[randomNumberOne()],
    category:"book",
    subCategory :'non-fiction', //subCategoryArray[randomNumberOne(subCategoryArray.length-1)],
    price: randonumber(),
    images : imagesArray[randomNumberOne(imagesArray.length-1)],
    QualityType : QualityTypeArray[randomNumberOne()],
    termsAndConditions : tnC

}).save(async(err,newproduct) => {
    // console.log('newproduct :', newproduct);
    console.log("savinng seeding");
});
}
module.exports = {
    showCheckout : (req,res)=> {
    //     if( !req.isAuthenticated()
    //     && typeof req.session.passport === 'undefined'
    //     && !req.session.passport){
    //     res.redirect('/auth/login');
    //   }
            res.render('cart/productcheckout');
    },
    showProductPage : async (req,res) =>{
        const pid  = req.params.pid;

        const productDetails =await  productModel.findById(pid).exec();

        res.render('product-details',{
            pid,
            productDetails
        })
    },
    showAll : async (req,res) => {
        const category  = req.params.category;
        var prods = null;

        if (req.params.subCategory !== undefined){
            if(req.params.subCategory !== undefined && req.params.QualityType !== undefined){
                const QualityType = req.params.QualityType;
                const subCategory = req.params.subCategory;
                // URL EXAMPLE /product/book/fiction/Used
                console.log('QualityType  and subCategory in showAll:', QualityType);
                prods = await productModel.find({
                    category,
                    QualityType,
                    subCategory
                }).exec();
                res.render('product-list-3',{
                    category,
                    subCategory,
                    QualityType,
                    count : prods.length || 0
                })
            }else{
                const subCategory = req.params.subCategory;
                if(subCategory == "New" ||  subCategory == 'Used'){
                    console.log('subCategory  is QualityType in showAll:', subCategory);
                    // URL EXAMPLE : /product/book/Used
                    prods = await productModel.find({
                        category,
                        QualityType :  subCategory
                    }).exec();
                    res.render('product-list-2',{
                        category,
                        subCategory,
                        count : prods.length || 0
                    })
                }else{
                    // URL EXAMPLE : /product/book/fiction
                        prods = await productModel.find({
                        category,
                        subCategory
                    }).exec();
                    res.render('product-list-2',{
                        category,
                        subCategory,
                        count : prods.length || 0
                    })
                }

            }
        }else{
            // URL EXAMPLE : product/book
            prods = await productModel.find({category}).exec();
            res.render('product-list',{
                category,
                count : prods.length || 0
            })
        }

    },

    fetch : async (req,res)=>{
        // await seed();
        // await seed();
        // await seed();
        const category  = req.params.category;
        var limit = req.params.limit;
        limit = parseInt(limit);
        var product = null;
        if (req.params.subCategory !== undefined){
            if(req.params.subCategory !== undefined && req.params.QualityType !== undefined){
                const subCategory =  req.params.subCategory
                const QualityType =  req.params.QualityType
                console.log('subCategory,QualityType  in the both in fetch:', subCategory,QualityType);
                product = await productModel.find({
                    category,
                    subCategory,
                    QualityType
                }).
                populate('_vendorID')
                .skip(limit + 3)
                .limit(limit)
                .exec();
                console.log('product.length in qual after db :', product.length);
            }else{
                const subCategory =  req.params.subCategory
                if(subCategory == "New" ||  subCategory == 'Used'){
                    console.log('subCategory  is QualityType in fetch:', subCategory);
                    product = await productModel.find({
                        category,
                        QualityType : subCategory
                    }).
                    populate('_vendorID')
                    .skip(limit + 3)
                    .limit(limit)
                    .exec();
                    console.log('subCategory in quality in fetch:', subCategory in quality);
                }else{
                        product = await productModel.find({
                        category,
                        subCategory
                    }).
                    populate('_vendorID')
                    .skip(limit + 3)
                    .limit(limit)
                    .exec();
                    console.log('category and subCategory simple one :', subCategory , category);
                }
            }
        }else{
            product = await productModel.find({
                category
            }).
            populate('_vendorID')
            .skip(limit + 3)
            .limit(limit)
            .exec();
            console.log("ONLY CATEGORY")
        }

        console.log('product.length :', product.length);
        var output = '';
        product.forEach((pro,i) => {
            console.log('pro._id :', pro._vendorID._id);
            output = output + `
            <div class="col-md-3 product-card ">
                <a class=" favme fa fa-heart-o my-fav-hert"  style="color:grey;padding:1em;"
                href="/product/add/fav/` + pro._id +`/` + pro._vendorID._id +`"
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
                                        <span class="small-para">` + pro.QualityType +`</span>
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
    },

}



















// for coloring and sizing add this....in fetch and concatenate with the o/p string
    // pro.colors.forEach(color => {
            //     colorsString += `<i class="fa fa-circle" style='`+
            //         (function(colorr){
            //             if(colorr == "White"){
            //                 return "border: 1px solid grey;";
            //             }else{
            //                 return ""
            //             }
            //         })(color)
            //     +` color:${color};margin: auto .5em;border-radius: 100%;' aria-hidden="true"></i>`;

            // })
            // pro.size.forEach(s => {
            //     sizeString += s + " ";
            //  })
