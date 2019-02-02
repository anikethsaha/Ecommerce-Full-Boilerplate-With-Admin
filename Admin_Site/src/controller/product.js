const Product = require('../model/product')
const fileUploadModel = require('../model/fileUpload')
module.exports = {
    getAllProducts :async  (req,res) => {
         Product.find({

         },(err,products) => {
            if(err){
                res.json({
                    err,
                    status : "Failed"
                })
            }else{
                var output = [];
                products = JSON.stringify(products);
                products = JSON.parse(products);
                for (const i in products) {
                    var eachRowArray = [];
                    if (products.hasOwnProperty(i)) {
                        const element = products[i];

                        eachRowArray.push(element._id)
                        eachRowArray.push(element.name)
                        eachRowArray.push(element.metaData)
                        eachRowArray.push(element.description)
                        eachRowArray.push(element._vendorID)
                        eachRowArray.push(element.favCount)
                        eachRowArray.push(element.old_price)
                        eachRowArray.push(element.QualityType)
                        eachRowArray.push(element.highlights)
                        eachRowArray.push(element.isPopular)
                        eachRowArray.push(element.rating)
                        eachRowArray.push(element.category)
                        eachRowArray.push(element.subCategory)
                        eachRowArray.push(element.price)
                        eachRowArray.push(element.termsAndConditions)

                    }
                    output.push(eachRowArray)
                }

                res.send(output);
            }




        });

    },
    addProduct : async (req,res) => {
        var {
            name,
            metaData,
            category,
            subCategory,
            price,
            old_price,
            description,
            _vendorID,
            termsAndConditions,
            highlights,
            QualityType
        } = req.body;

        // operation on the inputs to format them
        var newmetaData = JSON.stringify(metaData);
        newmetaData = JSON.parse(newmetaData);
        var imageArray = [];
        var highlights = highlights.split(',')
        for (let i = 0; i < req.files.length; i++) {
            const element = req.files[i];
            imageArray.push(element.filename)
            await new fileUploadModel(element).save();
        }

        new Product({
            name,
            metaData :newmetaData,
            category,
            subCategory,
            price,
            old_price : old_price || null,
            description,
            _vendorID,
            termsAndConditions,
            highlights,
            QualityType,
            images :imageArray,
            rating : 0
        }).save((err,newproduct) => {
            if(err){
                res.render('result',{
                    err,
                    status :"FAILED"
                })
                // res.json({
                //     err,
                //     status : "FAILED"
                // })
            }else{
                // res.json({
                //     status :"SUCCESS",
                //     newproduct
                // })
                res.render('result',{
                    status :"SUCCESS",
                    err : undefined
                })


            }
         })





    },

    showEditProduct : async (req,res) => {
        const { _productID} = req.params;
        const productDetails = await Product.findById(_productID).exec();
        res.render("EditProduct",{
            productDetails
        })
    },

    editProduct : async (req,res) => {
          const {_productID} = req.params;
          var {
            name,
            metaData,
            category,
            subCategory,
            price,
            old_price,
            description,
            _vendorID,
            termsAndConditions,
            highlights,
            QualityType
        } = req.body;
           // operation on the inputs to format them
           var newmetaData = JSON.stringify(metaData);
           newmetaData = JSON.parse(newmetaData);
           var imageArray = [];
           var highlights = highlights.split(',')
        if(req.files.length == 0){
            await Product.findByIdAndUpdate(_productID,{
                name,
                metaData :newmetaData,
                category,
                subCategory,
                price,
                old_price : old_price || null,
                description,
                _vendorID,
                termsAndConditions,
                highlights,
                QualityType
               },(err,updatedProduct) => {
                if(err){
                    res.render('result',{
                        err,
                        status :"FAILED"
                    })
                    // res.json({
                    //     err,
                    //     status : "FAILED"
                    // })
                }else{
                    // res.json({
                    //     status :"SUCCESS",
                    //     newproduct
                    // })
                    res.render('result',{
                        status :"SUCCESS",
                        err : undefined
                    })


                }
               })
        }else{
           for (let i = 0; i < req.files.length; i++) {
               const element = req.files[i];
               imageArray.push(element.filename)
               await new fileUploadModel(element).save();
           }
           await Product.findByIdAndUpdate(_productID,{
            name,
            metaData :newmetaData,
            category,
            subCategory,
            price,
            old_price : old_price || null,
            description,
            _vendorID,
            termsAndConditions,
            highlights,
            QualityType,
            images :imageArray,
           },(err,updatedProduct) => {
            if(err){
                res.render('result',{
                    err,
                    status :"FAILED"
                })
                // res.json({
                //     err,
                //     status : "FAILED"
                // })
            }else{
                // res.json({
                //     status :"SUCCESS",
                //     newproduct
                // })
                res.render('result',{
                    status :"SUCCESS",
                    err : undefined
                })


            }
           })
      }
    }
}

