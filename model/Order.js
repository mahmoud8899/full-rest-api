const mongoose = require('mongoose')


const OrderSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    timeOrder: {
        type: String,
        required: true,
    },
    orderitems: [
        {
            qty: { type: Number, required: true },
            prics: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ],
    shippingAdress: [
        {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            yourEmail: { type: String, required: true },
            yourAddress: { type: String, required: true },
            city: { type: String, required: true },
            zipCode: { type: String, required: true },
            telephone: { type: String, required: true },
        }
    ],

    paymentMethod: {
        type: String,
        required: true
    },
    itemsPrics: {
        type: Number,
        required: true,
        default: 0.0
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    ispaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    }


}, {
    timestamps: true
})





module.exports = mongoose.model('Order', OrderSchema)