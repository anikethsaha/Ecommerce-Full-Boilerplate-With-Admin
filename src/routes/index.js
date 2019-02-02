const authRoutes = require('./auth');
const productRoutes = require('./product')
const showRoutes = require('./showRoutes')
const buyRoutes = require('./buy')
const brandRoutes = require('./brand')
const  searchRoutes = require('./search')
const paymentRoutes = require('./payment')
const orderRoutes = require('./order')
const cartRoutes = require('./cart')
const profileRoutes = require('./profile')
const verfiyRoutes = require('./verify')
const newletterRoutes = require('./newsletter')
module.exports ={
    authRoutes,
    productRoutes,
    showRoutes,
    brandRoutes,
    buyRoutes,
    searchRoutes,
    paymentRoutes,
    orderRoutes,
    cartRoutes,
    verfiyRoutes,
    profileRoutes,
    newletterRoutes
}