const AuthController = require('../controller/Controller_Auth')
const router = require('express').Router()
const verify = require('../Jwt/Verfiy')
const Admin = require('../Jwt/isAdmin')
const GooleController = require('../controller/Goole')
// singUp
router.post('/user/create/', AuthController.singup)

// logo in...
router.post('/user/login/', AuthController.login)


router.post('/user/singup/googl/',GooleController.GoogleLogin)
// list user
router.get('/user/lists/', AuthController.ListUser)
router.get('/user/user/:id/', AuthController.userId)
// test user token 
router.put('/user/test/token/user/', verify, Admin, AuthController.RemoveUserid)
// update adress..
router.put('/user/update/user/',  verify,  AuthController.UpdateAdress)

// remove user Adress.
router.put('/user/update/removeadress/:id/',AuthController.RemoveMyAdress)

// edit username 

router.put('/user/update/username/',  verify, AuthController.ChangeUserName)




module.exports = router