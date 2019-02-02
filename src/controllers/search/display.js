const {productModel} = require('../../models')
module.exports = {
    renderSearchPage  : async (req,res) => {
        res.render('search',{
            searchQuery : req.params.searchQuery
        })
    },
    autoSuggestionFetch : async (req,res) => {
        const key = req.params.key;

        var product = await productModel.find({
            $or : [
                {
                    name : {$regex : '.*'+key + ".*",$options: "si"}
                }
            ]
        })
        .limit(10)
        .exec();
        var categorySearch = await productModel.aggregate(
            [

                {    $match : {category : {$regex : '.*'+key + ".*",$options: "si"}},

                },
                {
                    $group : {
                        _id :
                            {
                                category : '$category'
                        }
                    }
                }
            ]
        ).exec();



        var subCategorySearch = await productModel.aggregate(
            [
                {
                    $match : {
                        subCategory : {
                            $regex : '.*'+key + ".*",
                            $options: "si"
                        }
                    }
                },
                {
                    $group : {
                        _id :{
                            subCategory : '$subCategory',
                            category :'$category'
                        },

                    }
                }
            ]
        )
        .exec();



        var output = '';
        output =output +  `<li class="srch-bar-title"> <span class="col-lg-12 search-title">Result</span></li> `;



        product.forEach((pro,i) => {
        output = output + `<li > <a href="/show/product/${pro._id}">${pro.name} <span> in </span> <span> ${pro.subCategory} </span> </a> </li>`;
        })
        output =output +  `<li class="srch-bar-title"> <span class="col-lg-12 search-title">Related Categories</span></li> `;



        categorySearch.forEach((category,i)=>{

            output =output +  `<li> <a href="/product/${category._id.category}">${category._id.category}</a></li> `;
        })

        subCategorySearch.forEach((subCategory,i)=>{

            output =output +  `<li> <a href="">${subCategory._id.subCategory} <span> in </span> <span>${subCategory._id.category}</span></a></li> `;
        })
        res.send(output);
    },
    fetchSearchResultInPage : async (req,res) => {
        const searchQuery = req.params.searchQuery;
        var limit = req.params.limit;
        limit = parseInt(limit);
        var product = await productModel.find({
            $or : [
                {
                    name : {$regex : '.*'+searchQuery + ".*",$options: "si"}
                },
                {
                    category : {$regex : '.*'+searchQuery + ".*",$options: "si"}
                },
                {
                    subCategory : {$regex : '.*'+searchQuery + ".*",$options: "si"}
                }
            ]
        }).exec();


        var output = '';
        product.forEach((pro,i) => {
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

    }
}