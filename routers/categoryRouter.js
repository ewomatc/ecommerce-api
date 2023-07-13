const {Category} = require('../models/category')
const router = require('express').Router()

//get all product categories
router.get('/', async(req, res) => {
 try {
  const categoryList = await Category.find()

  if (categoryList.length > 0) {
    res.json(categoryList)
  } else {
    res.status(404).json({
      error: 'No category found'
    })
  }
 } catch (error) {
  res.status(500).json({
    error: 'Failed to get categories'
  })
 }
})

//add a new category for your product
router.post('/', async(req, res) => {
  try {
    const category = new Category ({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color
    })
  
    await category.save()
  
    res.status(201).json(category)
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to create category' })
  }
})


//delete a category
router.delete('/:categoryId', async(req, res) => {
  try{
    const categoryDeleted = await Category.findByIdAndDelete(req.params.categoryId)

    if (categoryDeleted) {
      res.sendStatus(204)
    } else {
      res.status(404).json({
        success: false,
        error: 'Category not found'
      })
    }
  }
  catch(error) {
    console.error(error.message);
    res.status(500).json({
      oops: 'Failed to delete category', error: error
    })
  }
})

//get a single category by it's id
router.get('/:id', async (req, res) => {

  try {
    const category = await Category.findById(req.params.id)

    if(category) {
      res.json(category)
    } else {
      res.status(404).json({
        error: 'Category not found'
      })
    }
  } catch (error) {
    res.json({
      error: error
    })
  }

})

//update a category
router.put('/:id', async (req, res) => {

  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color
    },
    {
      new: true
    })

    if (category) {
      res.json(category)
    } else {
      res.status(400).json({
        error: 'could not update catagory'
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})



module.exports = router