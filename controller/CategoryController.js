const Category = require('../model/Category')



// create Category ... 
exports.createGategory = async (req, res) => {



    const { name, description } = req.body

    const file = req.file
    let checkName = await Category.findOne({ name })
    if (checkName) {


        return res.status(404).json({ message: 'we  have the same name' })

    } else {
        try {
            if (!file) return res.status(404).json({
                message: 'not uploading Image...'
            })

            const fileName = file.filename;

            let category = new Category({
                name,
                description,
                image: `/uploads/${fileName}`,
            })

            const saveCategory = await category.save()


            return res.json(saveCategory)
        } catch (error) {
            return res.status(404).json({
                message: error.message
            })
        }
    }


    //const basePath = `${req.protocol}://${req.get('host')}/uploads/`;


}


// delete Category ... 
exports.deleteCategory = async (req, res) => {


    try {
        let categoryRemove = await Category.findByIdAndDelete({ _id: req.params.id })



        if (categoryRemove) return res.json({ message: 'Remove Category...' })


        return res.status(404).json({
            message: 'we not have Category...'
        })



    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


// get all category...
exports.getallCategory = async (req, res) => {



    try {
        let category = await Category.find()

        if (category) return res.json(category)


        return res.status(404).json({ message: 'not category....' })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


// update category... 
exports.Updateingcategory = async (req, res) => {
    const { name, description } = req.body

    try {

        let category = await Category.findByIdAndUpdate({ _id: req.params.id }, { name, description })

        if (category) return res.json(category)

        return res.status(404).json('not update.....')

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}