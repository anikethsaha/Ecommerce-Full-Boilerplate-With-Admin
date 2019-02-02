var showdown = require('showdown'),
converter = new showdown.Converter(),
bannerModel = require('../model/banner');


module.exports ={
    addPage:async (req,res) => {
        var text , fieldName;
        for (const i in req.body) {
            console.log(i)
            text = req.body[i];
            fieldName = i
        }
        console.log('text', text)
        text = converter.makeHtml(text)
        const isExist = await bannerModel.count({
            banner_name : fieldName
        }).exec();
        if(isExist > 0){
            await bannerModel.findOneAndUpdate({ banner_name : fieldName},{
                banner_text : text
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
            await bannerModel({
                        banner_name : fieldName,
                        banner_text : text
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