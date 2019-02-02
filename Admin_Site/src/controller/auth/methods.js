const AdminModel =  require('../../model/admins')
const bcrypt = require('bcrypt')
module.exports = {
    register : async (req,res) => {
        console.log('req.body :', req.body);
        req.checkBody('username').trim();
        req.checkBody('password').escape();
        req.checkBody('mobile').trim();
        req.checkBody('mobile').escape();
        req.checkBody('username').trim();
        req.checkBody('username').escape();
        req.checkBody('first_name').trim();
        req.checkBody('first_name').escape();
        req.checkBody('last_name').trim();
        req.checkBody('last_name').escape();
        req.sanitizeBody('username');
        req.sanitizeBody('password');
        req.sanitizeBody('username');
        req.sanitizeBody('mobile');
        req.checkBody('mobile','enter the mobile correctly').notEmpty();
        req.checkBody('email','enter the email correctly').isEmail();
        req.checkBody('username',"please enter correct username").isString().notEmpty();
        req.checkBody('first_name',"please enter correct first name").isString().notEmpty();
        req.checkBody('last_name',"please enter correct last name").isString().notEmpty();
        req.checkBody('password','enter the password correctly').notEmpty();
                var errors = req.validationErrors();
                console.log('errors :', errors);
                console.log("inside register");
                if(errors){
                    console.log('errors :', errors);
                    res.render('result',{
                        status : "FAILED",
                        err : errors
                    })
                }else{
                    const mobile = req.body.mobile;
                    const username = req.body.username;
                    const email = req.body.email;
                    const last_name = req.body.last_name;
                    const first_name = req.body.first_name;
                    const role_type = req.body.role_type;
                    const password = await bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
                    return  new AdminModel({
                        mobile,
                        email,
                        username,
                        password,
                        last_name,
                        first_name,
                        role_type,
                        emp_id : await Math.floor(Math.random()*10000000)
                    }).save((errors,newuser) => {
                        if(errors){
                            console.log('errors :', errors);
                            res.render('result',{
                                status : "FAILED",
                                 err : errors
                            })
                        }else{
                            res.redirect('/login')
                        }
                    })
                }
    },
    localLogin : async (username,password,done) => {
        console.log('username :', username);
        await AdminModel.findOne({
            username
            },async (err,verifiedusernameUser) => {
            if(err) {
                console.log('err 1st :');
                done(null,false,{message : err});
            }else{
                if(!verifiedusernameUser) {
                    console.log('username verification failed');
                    done(null,false,{message:"no user found with this username"});
                }else{
                    var UserPassword = verifiedusernameUser.password;
                    await bcrypt.compare(password,UserPassword,(err,result) => {
                        if(err) {
                            console.log("err in compare",err)
                            done(null,false,{message:err})
                        }else{
                            if(!result) {
                                console.log("passsword fail")
                                done(null,false,{message:"Password invalid"})
                            }else{
                                console.log("all good")
                                done(null,verifiedusernameUser);
                            }

                        }

                    })
                }
            }

        })
    }
}