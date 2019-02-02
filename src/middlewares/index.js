const { isAuth ,hideLoginPage} = require('./auth')
const { isLocation } =require('./tiffin')
const { isEmptyCart} = require('./cart')

const notFound404 = (req,res,next) => {
    if(res.statusCode !== '200')
        if (req.accepts('html')) {
            // Respond with html page.
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write("Woops");
                res.end();

        }
        else if (req.accepts('json')) {
            // Respond with json.
            res.status(404).send({ error: 'Not found' });
        }
        else {
            // Default to plain-text. send()
            res.status(404).type('txt').send('Not found');
        }
    next();
}



module.exports = {
    isAuth,
    isLocation,
    notFound404,
    isEmptyCart,
    hideLoginPage
    
}
