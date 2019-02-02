module.exports = {
    isLocation : (req,res,next) => {
        if(!req.params
            || req.params.city === 'null'
            || req.params.state === 'null'){
                res.redirect('/');
            }
        next();
    }
}
