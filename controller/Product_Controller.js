const PostModel = require('../model/Product')
const Object = require('mongoose').Types.ObjectId


/*
vegetarian,
Meat
rose
chicken
macaroni
Salad
*/




// create Post... 
exports.CreateProduct = async (req, res) => {
    // if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `not id ${req.params.id}` })
    const {
        name,
        prics,
        countInStock,
        description,
        category
    } = req.body

    const file = req.files


    if (!file) {
        return res.status(400).send('No image in the request')
    }



    try {

        const Follow = await Promise.all(
            req.files.map((fil) => {


                return `/${fil.path}`

            })
        )


        let post = await PostModel.create({
            user: req.user._id,
            name,
            image: Follow,
            prics,
            countInStock,
            description,
            category
        })

        const newPost = await post.save()
        return res.status(201).json(newPost)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }



}



// product id.. 
exports.productID = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })
    try {

        let productId = await PostModel.findById({ _id: req.params.id })
        if (productId) return res.status(200).json(productId)
        else return res.status(404).json({ message: 'we do not have id' })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}




















// count all product som have... 
exports.cuntAllProduct = async (req, res) => {

    let product = await PostModel.countDocuments((cun) => cun)
    if (product) {
        return res.json(product)
    } else {

        return res.status(404).json({ message: 'not have product not' })
    }
}






// Delete Post.. 
exports.DeletePost = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })
    try {
        let post = await PostModel.findById({ _id: req.params.id })
        if (post) {
            await post.remove()

            return res.status(201).json({ message: 'remove post id' })
        } else {
            return res.status(201).json({ message: 'we have not post id' })
        }

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}


// post Update 
exports.PostEdit = async (req, res) => {
    const {
        name,
        prics,
        countInStock,
        description,
        category
    } = req.body


    try {
        let product = await PostModel.findById({ _id: req.params.id })
        if (product) {


            const saveOk = await PostModel.updateOne({ _id: req.params.id }, {
                name,
                prics,
                countInStock,
                description,
                category,

            })



            return res.status(201).json(saveOk)
        }
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


/*
  if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `not id ${req.params.id}` })
    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');

    const fileName = file.filename;

*/






// add Commit ... 
exports.AddCommit = async (req, res) => {

    if (!Object.isValid(req.params.id) && !Object.isValid(req.body.username))
        return res.status(404).json({ message: `not id ${req.params.id}` })
    const { username, rating, userCommit } = req.body

    try {
        let post = await PostModel.findById({ _id: req.params.id })
        if (post) {

            const addCommti = {
                username: req.user.username,
                rating,
                userCommit,
                date: Date.now()
            }
            post.commit.push(addCommti)
            post.rating = rating
            const newCommitSave = await post.save()
            return res.status(201).json(newCommitSave)

        } return res.status(404).json({ message: 'not have post id' })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }


}


// delete my commit ........>>>
exports.deletemYCommit = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })

    try {

        let post = await PostModel.findById({ _id: req.params.id })
        if (post) {
            const checkId = post.commit.filter((user) => user._id.toString() !== req.params.commitId.toString())
            if (checkId) {

                post.commit = checkId
                const newSave = await post.save()
                return res.status(201).json(newSave)
            }
            else return res.status(404).json(post)
        }
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}



// Update commit ....>
exports.uploadingCommit = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })

    const {
        username,
        rating,
        userCommit,


    } = req.body

    try {
        let post = await PostModel.findById({ _id: req.params.id })
        if (post) {
            const checkCommit = post.commit.find((cx) => cx.id.toString() === req.params.updateCommit.toString())
            if (checkCommit) {

                checkCommit.username = username
                checkCommit.rating = rating
                checkCommit.userCommit = userCommit
                checkCommit.date = Date.now()


                const newSaveUpdate = await post.save()


                return res.status(200).json(newSaveUpdate)
            } else {
                return res.status(404).json({
                    message: 'not have commit id.'
                })
            }
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}


/*

https://github.com/WebDevSimplified/Paginated-API-Express/blob/master/server.js

// show all Posts
*/

/*

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit




    try {
        const post = await PostModel.find(
            { _id: req.params.id },
            { products: { $slice: [startIndex, limit] } }
        )

        //  console.log(typeof results)
        return res.json(post)

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }



*/


/*

  const pageSize = Number(5)
    const page = Number(req.query.pageNumber) || Number(1)





    try {
        let count = await PostModel.countDocuments((cunt) => cunt)

        if (Math.ceil(count / pageSize) < page) return res.status(404).json({
            message: 'not more Product.....'
        })
        let product = await PostModel.find()
            .populate('category')
            .populate({ path: 'user', select: '_id image username isAdmin' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
        if (product) return res.json({
            lengthPage: count,
            page,
            pages: Math.ceil(count / pageSize),
            product,

        })
        return res.status(404).json({ message: 'not have product...' })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
*/

