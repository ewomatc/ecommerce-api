const {Product} = require('../models/product')
const router = require('express').Router()


//get products list
router.get(`/`, async(req, res) => {
  try {
    const productList = await Product.find()
    res.status(200).json(productList)
  }
  catch(err){
    res.json(err)
  }
})

//post new product
router.post(`/`, async(req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock
  })

  await product.save()
  .then((createdProduct => {
    res.status(201).json(createdProduct)
  }))
  .catch((err) => {
    res.status(500).json({
      error: err,
      success: false
    })
  })
})


module.exports = router