const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem'
    }],
    shippingAddress: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phone: {
      type:  Number,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: 'Pending'
    },
    totalPrice: {
      type: Number
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    dateOrdered: {
      type: Date,
      default: Date.now
    }
})



orderSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

orderSchema.set('toJSON', {
  virtuals: true
})


exports.Order = mongoose.model('Order', orderSchema)