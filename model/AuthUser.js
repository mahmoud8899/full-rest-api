const mongoose = require('mongoose')



const AuthSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },

    Adress: [
        {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            yourEmail: { type: String, required: true },
            yourAddress: { type: String, required: true },
            city: { type: String, required: true },
            zipCode: { type: String, required: true },
            telephone: { type: String, required: true },
        }
    ]
},
    {
        timestamps: true
    }
)







module.exports = mongoose.model('User', AuthSchema)