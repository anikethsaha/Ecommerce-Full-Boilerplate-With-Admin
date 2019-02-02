const BannerModel  = require('../model/banner')
module.exports = {
    addCommunity : async (req,res) => {

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

     },
     addFeature : async (req,res) =>{
        const { Community  } = req.body;
        const isExist =await  BannerModel.count({
            banner_name : "Community"
        }).exec();
        if(isExist > 0){
            // Already Exist
            // Update the existing one

            BannerModel.findOneAndUpdate({banner_name : "Community"},{
                banner_name : "Community",
                banner_text : Community
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
                banner_name : "Community",
                banner_text : Community
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
     addDonate : async (req,res) => {
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