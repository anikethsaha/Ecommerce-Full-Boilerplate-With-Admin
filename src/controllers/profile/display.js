const {userModel} = require('../../models')
module.exports = { 
    showProfile : async (req,res) => {
        const userDetails = await userModel.findById(req.user._id).exec()
        res.render('auth/profile',{
            userDetails
        })
    }
}