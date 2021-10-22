const mongoose = require('mongoose')




const GoogleSchema = mongoose.Schema({

    email: { type: String, required: true },
    name: { type: String, required: true },
    googleId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
})



module.exports = mongoose.model('Google', GoogleSchema)
