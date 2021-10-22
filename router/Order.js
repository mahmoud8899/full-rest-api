const controllerOder = require('../controller/ControllerOrder')
const router = require('express').Router()
const verify = require('../Jwt/Verfiy')
const Admin = require('../Jwt/isAdmin')



// create order...
router.post('/order/order/', verify, controllerOder.CreateOrder)

// show order user ...
router.get('/order/userid/', verify, controllerOder.ordershowUserid)

// show order id ...
router.get('/order/order/:id/', controllerOder.ShowOrderId)


// remove order user from user...
router.delete('/order/order/user/:id/', verify, controllerOder.removeOrderId)


router.post('/order/order/change/:id/', verify, Admin, controllerOder.Delivered)

// view all orders 
router.get('/order/view/all/order/',
   
    controllerOder.ViewAllOrders
)


// search order name....
router.post('/order/srarch/userId', verify, controllerOder.AddSearch)


module.exports = router