const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	},
	quantity: {
		type: Number,
		required: true
	}
})

exports.orderItem = mongoose.model('OrderItem', orderItemSchema)