module.exports = {
    isAuth : (req,res,next) => {

        if( !req.isAuthenticated()
            && typeof req.session.passport === 'undefined'
            && !req.session.passport){
            res.redirect('/login');
          }else{
                        next();
          }

    },
    hideLoginPage : (req,res,next)=>{
        if( req.isAuthenticated()
            && typeof req.session.passport !== 'undefined'
            && req.session.passport){
            res.redirect('/home');
      }else{
        next();
      }

    }
}