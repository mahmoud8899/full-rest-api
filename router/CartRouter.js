const router = require('express').Router()
const fromAdd = require('../controller/CartController')
const Verify = require('../Jwt/Verfiy')


// show all cart..
router.get('/visw/cart/', Verify, fromAdd.ViswCartUser)

// create cart items.....
router.post('/add/cart/create/', Verify, fromAdd.AddCart)



// delete cart
router.delete('/add/deletecart/:id/', Verify, fromAdd.deleteCart)


// cleaning 
router.post('/cleaning/user/', Verify,fromAdd.CleaningCart)

module.exports = router