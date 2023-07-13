const {Order} = require('../models/order')
const router = require('express').Router()

router.get('/', async(req, res) => {
  const orderList = await Order.find()

  if(orderList) {
    res.json(orderList)
  }
  else {
    res.status(404).json({
      error: 'Could not get...'
    })
  }
})


module.exports = router