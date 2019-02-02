const UserModel = require('../model/userModel')


module.exports = {
    getAllUsers : async (req,res) => {
        return  UserModel.find({},(err,users) => {
            if(err){
                res.json({
                    err,
                    status : "Failed"
                })
            }else{



                var output = [];
                users = JSON.stringify(users);
                users = JSON.parse(users);
                for (const i in users) {
                    var eachRowArray = [];
                    if (users.hasOwnProperty(i)) {
                        const element = users[i];

                        eachRowArray.push(element._id)
                        eachRowArray.push(element.name)
                        eachRowArray.push(element.email)
                        eachRowArray.push(element.coins)
                        eachRowArray.push(element.mobile)
                         eachRowArray.push(element._oauthid)
                        eachRowArray.push(`${element.favList}, `)



                        eachRowArray.push(element.address)

                        eachRowArray.push(element.createdAt)



                    }
                    output.push(eachRowArray)
                }
                res.send(output);
            }
        })

    }
}