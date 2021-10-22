const Object = require('mongoose').Types.ObjectId

const ProductModel = require('../model/Product')



const filterCategory = async (req, res, next) => {

     if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id undefined ${req.params.id}` })


    const pageSize = Number(5)

    const page = Number(req.query.pageNumber) || 1

    let count = await ProductModel.countDocuments({ category: req.params.id })

    const result = {}

    if (page < count) {
        result.next = {
            page: page + 1,
        }

    }






    try {

        //  if (Math.ceil(count / pageSize) < page) return res.status(404).json({ message: 'Not more product..' })
        let filterCategory = await ProductModel.find({ category: req.params.id })
            .populate({ path: 'category', select: '_id name' })
            .populate({ path: 'user', select: '_id username' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
        if (filterCategory) {

            //  next()
            return res.status(200).json({
                LengthProduct: count,
                result,
                pageNumber: page,
                pages: Math.ceil(count / pageSize),
                product: filterCategory,
            })


        }

        return res.status(404).json({ message: 'we do not have Product...' })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }

}


const AllProduct = async (req, res, next) => {




    // if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id undefined ${req.params.id}` })


    const pageSize = Number(5)

    const page = Number(req.query.pageNumber) || 1

    let count = await ProductModel.countDocuments()

    const result = {}

    if (page < count) {
        result.next = {
            page: page + 1,
        }

    }






    try {

        //  if (Math.ceil(count / pageSize) < page) return res.status(404).json({ message: 'Not more product..' })
        let filterCategory = await ProductModel.find()
            .populate({ path: 'category', select: '_id name' })
            .populate({ path: 'user', select: '_id username' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
        if (filterCategory) {

            //  next()
            return res.status(200).json({
                LengthProduct: count,
                result,
                pageNumber: page,
                pages: Math.ceil(count / pageSize),
                product: filterCategory,
            })


        }

        return res.status(404).json({ message: 'we do not have Product...' })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }



}






module.exports = {
    filterCategory,
    AllProduct
}

















/*
const Pagination = (model) => {


    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)


        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const result = {}

        if (endIndex < await model.countDocuments().exec()) {

            result.next = {
                page: page + 1,
                limit: limit
            }
        }


        if (startIndex > 0) {
            result.next = {
                page: page - 1,
                limit: limit
            }
        }

        try {
            result.result = await model.findById({ _id: productId , products:[] })
                .limit(limit)
                .skip(startIndex)
                .exec()

            res.Pagination = result
            naxt()
        } catch (error) {
            return res.status(404).json({ message: error.message })
        }

    }



}




exports.model = Pagination
*/