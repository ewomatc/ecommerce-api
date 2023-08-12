const {Product} = require('../models/product')
const {Category} = require('../models/category')
const router = require('express').Router()
const mongoose = require('mongoose')


//get products list
router.get(`/`, async(req, res) => {
  //filter products using req.query based on query parameters from url
  
    //if a categories query is passed in the url, then we'll split it and pass it to the Product.find(). else the value passed in find() will be an empty object.
  try {
    const {categories} = req.query;

    const filter = categories ? { category : categories.split(',')} : {}
    const productList = await Product.find(filter).populate('category')
    res.status(200).json(productList)
  }
  catch(err){
    res.status(500).json({
      error: err
    })
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

    const savedProduct = await product.save()
    if (savedProduct) {
      res.status(201).json(product)
    } else {
      res.status(400).json({
        error: 'Could not create product'
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
  
})

//get a single product by it's id
router.get('/:id', async (req, res) => {

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid id'})
  }
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

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      error: 'Invalid id'
    })
  }

  const category = await Category.findById(req.body.category)
  if(!category) {
    return res.status(400).json({
      error: 'Category does not exist'
    })
  }

  const body = req.body

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
      res.status(404).json({
        error: 'Product not found'
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})

//delete a product
router.delete('/:id', async (req, res) => {

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      error: 'Invalid id'
    })
  }

  try {
    const productDeleted = await Product.findByIdAndDelete(req.params.id)

    if (productDeleted) {
      res.status(204).json({
        success: true,
        message: 'Product deleted successfully'
      })
    } else {
      res.status(404).json({
        error: 'Product with this id does not exist'
      })
    }
  }
  catch (error) {
    res.status(500).json({
      error: error
    })
  }
})

//get the total number of products available in the store
router.get('/get/count', async (req, res) => {
  try {
    const productCount = await Product.countDocuments()

    if (productCount) {
      res.status(200).json({
        totalProducts: productCount
      })
    } else {
      res.status(404).json({
        error: 'No product found'
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})

//get featured products
router.get('/get/featured/:count', async (req, res) => {
  const count = req.params.count ? req.params.count : 0

  try {
    const featuredProduct = await Product.find({ isFeatured: true }).limit(+count)

    if (featuredProduct) {
      res.status(200).json({
        featuredProducts: featuredProduct
      })
    } else {
      res.status(404).json({
        error: `No product found`
      })
    }
  }
  catch (error) {
    next(error)
  }
})



module.exports = router