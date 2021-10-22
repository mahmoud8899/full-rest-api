const mongoose = require('mongoose')


const PostSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    name: {
        type: String,
        required: true,

    },
    image: {
        type: Array,
        default: []
    },
    prics: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        required: true,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    countInStock: {
        type: Number,
        required: true,
        default: 1

    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    commit: [
        {
            username: { type: String, required: true },
            rating: { type: Number, required: true },
            userCommit: { type: String, required: true },
            date: { type: Date, required: true }
        }
    ],

}, {
    timestamps: true,
})





module.exports = mongoose.model('Product', PostSchema)