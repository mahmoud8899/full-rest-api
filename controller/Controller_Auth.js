const Auth = require('../model/AuthUser')
const bcrypt = require('bcrypt')
const getToken = require('../Jwt/JwtSignl')
const Object = require('mongoose').Types.ObjectId
const Validation = require('../Validation/InputValtion')


// login in ..... first requires....
exports.login = async (req, res) => {

    const { email, password } = req.body



    try {
        const user = await Auth.findOne({ email })
        if (!user) return res.status(404).json({
            message: `we have someEmail ${email}`
        })
        else {


            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(404).json({ message: `not match password...` })


            return res.json({

                username: user.username,
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                Adress: user.Adress,
                token: getToken(user._id)
            })




        }
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }

}




// sing up 
exports.singup = async (req, res) => {

    const { username, email, password } = req.body


  

    if (email.startsWith(" ") || email.endsWith(" ") ||
        username.startsWith(" ") || username.endsWith(" ") ||
        password.startsWith(" ") || password.endsWith(" ")
    ) return res.status(404).json({ message: `Not Empty` })

    try {
        let user = await Auth.findOne({ email })
        if (user) return res.status(404).json({ message: `We have the same ${email} you can log in ` })
        const hasPassword = await bcrypt.hash(password, 10)
        user = new Auth({

            username,
            email,
            password: hasPassword
        })

        const newUser = await user.save()
        return res.json({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser._id)
        })



    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}



// lists user .. 
exports.ListUser = async (req, res) => {
    try {
        let user = await Auth.find({}).select('-password')
        if (user) return res.json(user)

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


// user id... 
exports.userId = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `ID ${req.params.id}` })
    try {

        let user = await Auth.findById({ _id: req.params.id })
        if (user) return res.status(200).json(user)
        else res.status(200).json({ message: 'we have not user id' })

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}




// chenge user and password... 
exports.ChangeUserName = async (req, res) => {
    // if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `ID ${req.params.id}` })
    const { username, email } = req.body
    try {
        // let user = await Auth.updateOne({ _id: req.params.id }, { username, email })
        let user = await Auth.findOne({ _id: req.user._id })
        if (user) {

            user.email = email
            user.username = username

            const newSave = await user.save()




            return res.status(201).json({
                username: newSave.username,
                isAdmin: newSave.isAdmin,
                email: newSave.email,
                token: getToken(newSave._id)
            })
        } else {
            return res.status(201).json('not...')
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}




// update Address..
exports.UpdateAdress = async (req, res) => {
    //if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `not id ${req.params.id}` })
    const {
        firstName,
        lastName,
        yourEmail,
        yourAddress,
        city,
        zipCode,
        telephone,
    } = req.body
    //Adress

    try {
        let user = await Auth.findOne({ _id: req.user._id }).select('-password')
        if (user) {

            const addAdress = {
                firstName,
                lastName,
                yourEmail,
                yourAddress,
                city,
                zipCode,
                telephone,
            }

            user.Adress = addAdress
            const userSave = await user.save()

            return res.json({
                _id: userSave._id,
                username: userSave.username,
                email: userSave.email,
                isAdmin: userSave.isAdmin,
                token: getToken(userSave._id),
                Adress: userSave.Adress
            })
        } else return res.status(404).json({ message: 'not user id' })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


/*

*/

// remove Adress... 
exports.RemoveMyAdress = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `not id ${req.params.id}` })
    try {
        let user = await Auth.findById({ _id: req.params.id })
        if (user) {
            user.Adress = []
            const addSave = await user.save()
            return res.status(201).json(addSave)
        } else {
            return res.status(201).json({ message: 'we have not user id' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



/* Admin remove all*/

// this is profile....
exports.RemoveUserid = async (req, res) => {
    // if(!Object.isValid(req.params.id)) return res.status(404).json({message : ` not id ${req.params.id}`})
    const { userId, addAmin } = req.body
    try {
        const user = await Auth.findOne(req.user._id)

        if (addAmin) {

            const newUser = await Auth.findOne({ _id: addAmin })

            if (newUser.isAdmin) {
                newUser.isAdmin = false

                await newUser.save()
                return res.status(201).json({ message: 'remove user Admin' })

            } else {
                newUser.isAdmin = true
                await newUser.save()
                return res.status(201).json({ message: '  user is  Admin now ' })

            }

            if (newUser) return res.json(newUser)

            // return res.status(201).json({message: 'Change user to Admin'})
        }

        if (user.isAdmin) {

            await Auth.deleteOne({ _id: userId })
            return res.status(201).json({ message: 'User Remove.' })

        }

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}



