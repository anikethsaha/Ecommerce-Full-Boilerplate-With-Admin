const BannerModel  = require('../model/banner')

const fileUploadModel = require('../model/fileUpload')

module.exports = {
    addBanner : async (req,res) => {
        var link,fieldName;
        console.log('req.files :',req.body);
        for (const i in req.body) {
            link = req.body[i];
        }

        await new fileUploadModel(req.files).save();
        fieldName = req.files[0].fieldname;
        const isExist =await  BannerModel.count({banner_name : req.files[0].fieldname}).exec();
        if(isExist > 0){
            // Already Exist
            // Update the existing one

            BannerModel.findOneAndUpdate({banner_name : req.files[0].fieldname},{
                banner_name : req.files[0].fieldname,
                banner_name_link : link,
                banner_name_img : req.files[0].filename
            },(err,NewBanner) => {

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

        }else{
            // Create New One

            BannerModel({
                banner_name : req.files[0].fieldname,
                banner_name_img : req.files[0].filename,
                banner_name_link : link
            }).save((err,NewBanner) => {
                if (err) {

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
}