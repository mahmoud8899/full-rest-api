const AuthGoogl = require('../model/Goole')
const getToken = require('../Jwt/JwtSignl')


// login with google singup .. 

exports.GoogleLogin = async (req, res) => {

    const { email, name, googleId, imageUrl } = req.body

    try {
        const user = await AuthGoogl.findOne({ email })
        if (user) {

            return res.json({
                _id: user._id,
                username: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: getToken(user._id)
            })
        } else {

           let user = new AuthGoogl({
                email, name, googleId, imageUrl
            })


            const newSave = await user.save()

            return res.status(201).json({
                _id: newSave._id,
                username: newSave.name,
                email: newSave.email,
                isAdmin: newSave.isAdmin,
                token: getToken(newSave._id)
            })


        }




    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}