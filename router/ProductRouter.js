const router = require('express').Router()
const ProductControll = require('../controller/Product_Controller')
const verify = require('../Jwt/Verfiy')
const Admin = require('../Jwt/isAdmin')
const multer = require('multer')
const {filterCategory,AllProduct} = require('../Pagination/Pagination')

const path = require('path')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

function checkFileTypes(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        cb(null, true)
    } else {
        cb('Image Only')
    }
}


const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileTypes(file, cb)
    }
})
















//  all products...
router.get('/product/product/', AllProduct)


// create post... 
router.post('/product/create/', verify, Admin, upload.array('image', 12), ProductControll.CreateProduct)


// filter... 
router.get('/product/category/:id', filterCategory)


// delete... 
router.delete('/post/post/:id/', ProductControll.DeletePost)


// update....
router.put('/post/post/edit/:id/', verify, Admin, ProductControll.PostEdit)

// product id// 
router.get('/product/product/:id/', ProductControll.productID)
// add commit... 
router.post('/post/post/commit/:id/', verify, ProductControll.AddCommit)

// delete commit from post. 
router.delete('/post/post/:id/:commitId/', ProductControll.deletemYCommit)



// update commit..... test. 
router.put('/post/post/update/:id/:updateCommit/', ProductControll.uploadingCommit)






module.exports = router