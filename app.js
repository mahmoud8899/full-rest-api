const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()

const mongoose = require('mongoose')





mongoose.connect(process.env.MONGOOSE_URL,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, info) => {
        if (!err) console.log('mongoose......')
    })





module.exports = mongoose

app.use([
    express.json(),
    express.urlencoded({ extended: true }),
    morgan('dev'),

    cors({
        origin: 'http://localhost:8000/',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    })



])

/*

 
*/

app.use('/*', (req, res, next) => {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
})





app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
const xpUser = require('./router/Auth')
const ProductRouter = require('./router/ProductRouter')
const uploading = require('./router/upload')
const OrderRoutering = require('./router/Order')
const CartAdd = require('./router/CartRouter')
const category = require('./router/CategoryRouter')
app.use('/api/',
    [
        xpUser,
        ProductRouter,
        OrderRoutering,
        uploading,
        CartAdd,
        category


    ])







/*
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*', (req, res) =>

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
} else {
    
}

*/



app.get('/', (req, res) => {
    res.json('API is running....')
})



module.exports = app