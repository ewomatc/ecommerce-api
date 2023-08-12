const {Order} = require('../models/order')
const {OrderItem} = require('../models/orderItem')
const router = require('express').Router()


//get all orders
router.get('/', async(req, res) => {
  try {
    const orderList = await Order.find()

    if (!orderList) {
      res.status(404).json({
        error: 'no order was found'
      })
    } else {
      res.status(200).json({
        orders: orderList
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})


router.post('/', async (req, res) => {

  const body = request.body;

  //get the id for order items
  const orderItemsId = Promise.all(req.body.orderItems.map( async orderItem => {
    const newOrderItem = new OrderItem({
      quantity: orderItem.quantity,
      product: orderItem.product
    })

    newOrderItem =  await newOrderItem.save()

    return newOrderItem._id
  }))

  const resolvedOrderItemsId = await orderItemsId

  const order = new Order({
    orderItems: resolvedOrderItemsId,
    shippingAddress: body.shippingAddress,
    city: body.city,
    country: body.country,
    phone: body.phone,
    status: body.status,
    totalPrice: body.totalPrice,
    user: body.user
    })

    try {
      const savedOrder = await order.save()

      if(!savedOrder) {
        res.status(400).json({ error: 'could not save order, check inputs and try again'})
      } else {
        res.status(201).json(savedOrder)
      }
    } catch (error) {
      res.status(500).json(error)
    }
})

module.exports = router