const {User} = require('../models/user')
const router = require('express').Router()
const bcrypt = require('bcryptjs')
//get all users
router.get('/', async(req, res) => {
  try {
    const usersList = await User.find()

    if (usersList.length > 0) {
      res.status(200).json(usersList)
    } else {
      res.status(404).json({
        error: 'No user was found'
      })
    }
  } catch (error) {
    
  }
})

//add a new user
router.post('/', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10), //'10' is the salt
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      city: req.body.city,
      country: req.body.country
    })

    const savedUser = await user.save()
    if(savedUser) {
      res.status(201).json({
        message: 'User Created',
        user: savedUser
      })
    } else {
      res.status(400).json({
        error: 'cannot create user, check your inputs and try again'
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})

  



module.exports = router