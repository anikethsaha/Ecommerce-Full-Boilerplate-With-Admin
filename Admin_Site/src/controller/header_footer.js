const BannerModel = require('../model/banner')
var showdown = require('showdown'),
converter = new showdown.Converter();
const fileUploadModel = require('../model/fileUpload')

module.exports = {

    addLogo : async (req,res) => {
        var fieldName;
        await new fileUploadModel(req.files).save();
        fieldName = req.files[0].fieldname;
        const isExist =await  BannerModel.count({banner_name : req.files[0].fieldname}).exec();
        if(isExist > 0){
            // Already Exist
            // Update the existing one

            BannerModel.findOneAndUpdate({banner_name : req.files[0].fieldname},{
                banner_name : req.files[0].fieldname,
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
     },
     addLogo2 : async (req,res) => {
        var fieldName;
        await new fileUploadModel(req.files).save();
        fieldName = req.files[0].fieldname;
        const isExist =await  BannerModel.count({banner_name : req.files[0].fieldname}).exec();
        if(isExist > 0){
            // Already Exist
            // Update the existing one

            BannerModel.findOneAndUpdate({banner_name : req.files[0].fieldname},{
                banner_name : req.files[0].fieldname,
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
     },
    addSocialMediaLink : async (req,res) =>{
        var text ,heading, fieldName;
        for (const i in req.body) {
            fieldName = i;

        }
        for (const i in req.body) {
            if (req.body.hasOwnProperty(i)) {
                const element = req.body[i];
                if(fieldName == i){
                    text = element;
                }else{
                    heading = element
                }
            }
        }


        const isExist = await BannerModel.count({
            banner_name : fieldName
        }).exec();
        if(isExist > 0){
            await BannerModel.findOneAndUpdate({ banner_name : fieldName},{
                banner_text : text,
                banner_heading : heading
            },(err,newPage) => {
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
            await BannerModel({
                        banner_name : fieldName,
                        banner_text : text,
                        banner_heading : heading
                    }).save((err,NewPage) => {
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

}