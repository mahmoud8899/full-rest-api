//const ModelPost = require('../model/Post')
//const Object = require('mongoose').Types.ObjectId
const CartModol = require('../model/CartModel')



// show all cart to user..
exports.ViswCartUser = async (req, res) => {



    try {
        let cart = await CartModol.find({ user: req.user._id })
            .populate({ path: 'product', select: '_id name image prics description' })
            .populate({ path: 'user', select: '_id username isAdmin' })


        if (cart) return res.json({
            Length: cart.length,
            data: cart
        })
        else return res.json({ message: 'not user cart....' })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }




}








// create  add cart... 
exports.AddCart = async (req, res) => {


    const { product, qty } = req.body


    if (product === '' || qty === '') return res.status(404).json({ message: `Empty..` })

    try {

        let createcart = await CartModol.find({ user: req.user._id })

        if (createcart) {

            let checkFilter = createcart.find((check) => check.product._id.toString() === product.toString())

            if (checkFilter) {


                let UpdateData = await CartModol.updateOne({ _id: checkFilter._id }, { qty })

                return res.status(201).json({
                    message: 'Update data..',
                    UpdateData
                })
            } else {

                let addcart = await CartModol.create({
                    user: req.user._id,
                    product,
                    qty
                })

                return res.status(202).json({
                    message: 'add to cart.',
                    addcart,
                })
            }



        } else {




            return res.status(201).json('not user id...')

        }





    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}




// delete  cart... 
exports.deleteCart = async (req, res) => {

    //  const { product } = req.body

    try {

        let removeCart = await CartModol.find({ _id: req.params.id })

        if (removeCart) {

            let checkOut = removeCart.find((check) => check.user._id.toString() === req.user._id.toString())

            if (checkOut) {


                let newRemove = await CartModol.deleteOne({ _id: checkOut._id })


                return res.json(newRemove)




            } else {
                return res.status(404).json({ message: 'Anther User can remove this...' })
            }
        } else {
            return res.status(404).json({ message: 'we do not have the same id first.......' })
        }




        return res.json('not')

    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}




// cleaning all cart from User..
exports.CleaningCart = async (req, res) => {


    try {
        let Cleaning = await CartModol.find({})

        if (Cleaning) {

            let checkUserr = Cleaning.filter((remove) => remove.user._id.toString() === req.user._id.toString())

            if (checkUserr) {


                let newRemove = await CartModol.deleteMany({ user: req.user._id })

                return res.status(201).json(newRemove)

            } else {

                return res.status(404).json({ message: 'not have user... cart.' })
            }

        } else {

            return res.status(404).json({ message: 'we do not have user cart..' })
        }
    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}