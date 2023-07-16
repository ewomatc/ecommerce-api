const {Product} = require('../models/product')
const {Category} = require('../models/category')
const router = require('express').Router()


//get products list
router.get(`/`, async(req, res) => {
  try {
    const productList = await Product.find().populate('category')
    res.status(200).json(productList)
  }
  catch(err){
    res.json(err)
  }
})

//post new product
router.post(`/`, async(req, res) => {

  const body = req.body

  const category = await Category.findById(req.body.category)
  if(!category) {
    return res.status(400).json({
      error: 'Category does not exist'
    })
  }

  try {
    const product = new Product({
      name: body.name,
      description: body.description,
      richDescription: body.richDescription,
      image: body.image,
      images: body.images,
      brand: body.brand,
      price: body.price,
      category: body.category,
      countInStock: body.countInStock,
      rating: body.rating,
      isFeatured: body.isFeatured
    })

    if (product) {
      await product.save()

      res.status(201).json(product)
    } else {
      res.status(400).json({
        error: 'Could not create product'
      })
    }
  } catch (error) {
    res.json({
      error: error.message
    })
  }
  
})

//get a single product by it's id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category')

    if(product) {
      res.status(200).json(product)
    } else {
      res.status(404).json({
        error: `Product ${req.params.id} not found`
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})

//update a product
router.put('/:id', async (req, res) => {

  const body = req.body

  const category = await Category.findById(req.body.category)
  if(!category) {
    return res.status(400).json({
      error: 'Category does not exist'
    })
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name: body.name,
      description: body.description,
      richDescription: body.richDescription,
      image: body.image,
      images: body.images,
      brand: body.brand,
      price: body.price,
      category: body.category,
      countInStock: body.countInStock,
      rating: body.rating,
      isFeatured: body.isFeatured
    },
    {
      new: true
    })

    if (product) {
      res.json(product)
    } else {
      res.status(400).json({
        error: 'could not update product'
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})


module.exports = router