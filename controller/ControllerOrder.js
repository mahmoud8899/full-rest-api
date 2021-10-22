const OrderModel = require('../model/Order')
const Object = require('mongoose').Types.ObjectId
const CartModel = require('../model/CartModel')

// create Order... 
exports.CreateOrder = async (req, res) => {

    const { orderitems, shippingAdress } = req.body
    try {


        let order = new OrderModel({
            user: req.user._id,
            timeOrder: new Date(),
            orderitems,
            shippingAdress,
            paymentMethod: req.body.paymentMethod,
            itemsPrics: req.body.itemsPrics,
        })




        const newSave = await order.save()


        let useFiler = await Promise.all(
            newSave.orderitems.map((use) => {
                return use.product
            })
        )


        let removeCart = await CartModel.find({ user: req.user._id })

        if (removeCart) {


            let checkOut = removeCart.find((check) =>
                check.user._id.toString() === req.user._id.toString() &&
                check.product._id.toString() === useFiler.toString()

            )

            if (checkOut) {

                checkOut.remove()

               
             
                return res.json({
                    removeCartItems: 'remove....',
                    order: newSave
                })


            } else {
                return res.status(404).json({ message: 'Anther User can remove this...' })
            }

        } else {
            return res.status(404).json({ message: 'we do not have the same id first.......' })
        }


    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

/*
  let checkOut = removeCart.find((check) => check.user._id.toString() === req.user._id.toString())

            if (checkOut) {


                let newRemove = await CartModel.deleteOne({ _id: useFiler.toString() })


                return res.json(newRemove)




            } else {
                return res.status(404).json({ message: 'Anther User can remove this...' })
            }
*/

// show order id 
exports.ShowOrderId = async (req, res) => {


    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `not id ${req.params.id}` })


    try {
        let order = await OrderModel.findById({ _id: req.params.id })
            .populate({ path: 'user', select: '_id username isAdmin' })
            .populate({ path: 'orderitems.product', select: '_id image name prics' })

        if (order) return res.json(order)
        return res.status(404).json({ message: 'not have some order id ...' })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}


// show all order to  user... 
exports.ordershowUserid = async (req, res) => {
    // if (!Object.isValid(req.user._id)) return res.status(404).json({ message: `user id.. ${req.user._id}` })

    try {
        let order = await OrderModel.find({ user: req.user._id })
            .populate({ path: 'user', select: '_id username isAdmin' })
            .populate({ path: 'orderitems.product', select: '_id image name prics' })
        if (order) {


            return res.status(200).json(order)

        } else {
            return res.status(401).json('error')
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



// user remove order id ... 
exports.removeOrderId = async (req, res) => {

    try {
        let order = await OrderModel.findById({ _id: req.params.id })
        if (order && order.user.toString() === req.user._id.toString()) {
            let removeOrder = await OrderModel.deleteOne({ _id: req.params.id })
            return res.status(201).json({
                message: 'Remove Order Thank Your....',
                "success": removeOrder
            })
        } else {
            return res.json({ message: 'we do not have order id sorry...' })
        }
    } catch (error) {

    }
}




// admin change order to deliver Delivered
exports.Delivered = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })
    try {
        let order = await OrderModel.findById({ _id: req.params.id })
        if (order) {

            if (order.isDelivered) {
                order.isDelivered = false
                order.delivered = new Date()
                const saveOrder = await order.save()

                return res.status(201).json(saveOrder)
            } else {
                order.isDelivered = true
                order.delivered = new Date()
                const saveOrderx = await order.save()

                return res.status(201).json(saveOrderx)
            }



        } else {
            return res.status(201).json({ message: `not have order .... ` })
        }
    }
    catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



//  search...
exports.AddSearch = async (req, res) => {
    const { search } = req.body

    try {
        let order = await OrderModel.find({ user: req.user._id })
            .populate({ path: 'user', select: '_id username isAdmin' })
            .populate({ path: 'orderItems.product', select: '_id image name prics' })

        if (order) {


            const xps = await OrderModel.find({ "orderItems.product.name": search })

            if (xps) {

                return res.status(200).json(xps)

            } else {
                return res.status(404).json('vo')
            }


        } else {
            return res.status(401).json('error')
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}




//View all orders
exports.ViewAllOrders = async (req, res) => {

    const pageSize = Number(7)
    const page = Number(req.query.pageNumber) || 1

    try {

        let ViewLength = await OrderModel.countDocuments((cun) => cun)

        if(Math.ceil(ViewLength / pageSize) ===  page - 1)  return res.status(404).json({message : 'not m'})

        let ViewOrders = await OrderModel.find({})
            .populate({ path: 'user', select: '_id username isAdmin' })
            .populate({ path: 'orderitems.product', select: '_id image name prics' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))

        if (ViewOrders) {
            return res.json({
                length: ViewLength,
                page,
                pages : Math.ceil(ViewLength / pageSize),
                data: ViewOrders
            })
        } else {
            return res.status(404).json({ message: 'not order....' })
        }


    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}