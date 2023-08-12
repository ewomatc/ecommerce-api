require('dotenv').config()
const {User} = require('../models/user')
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//get all users
router.get('/', async(req, res) => {
  try {
    const usersList = await User.find().select('-passwordHash')

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


//get a single user by id
router.get('/:id', async(req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash')

    if(user) {
      res.status(200).json({
        success: true,
        message: 'user found',
        user: user
      })
    } else {
      res.status(404).json({
        error: 'user not found'
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})

//add a new user
router.post('/register', async (req, res) => {
  try {
    //check if the user with this email is already registered
    const userExists = await User.findOne({email: req.body.email})
    if (userExists) {
      return res.status(409).json({
        error: 'User with this email already exists'
      })
    }

    // create and save new user
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

  
//login a user
router.post('/login', async(req, res) => {
  //find the user by email to see if they're registered
  try {
    const user = await User.findOne({ email: req.body.email})

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized, user with email does not exist'})
    }

    // if the user exists, compare password input with hashed one in db
    const passwordMatch = await bcrypt.compareSync(req.body.password, user.passwordHash)

    if( !passwordMatch ) {
      return res.status(401).json({ error: 'Incorrect password' })
    }

    // if the passwords are a match, create token for the user and log them in

    const token = jwt.sign({ userId: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.SECRET, { expiresIn: '1d' })
    
    return res.status(200).json({ message: 'Login successful ', token: token })

  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})


//get a count of total number of users
router.get('/get/count', async (req, res) => {
  try {
    const userCount = await User.countDocuments()

    if (!userCount) {
      res.status(404).json({
        error: 'No users found'
      })
    } else {
      res.status(200).json({
        totalUsers: userCount
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})


//delete a user
router.delete('/:id', async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id)

    if (!userDeleted) {
      res.status(404).json({
        error: 'user does not exist'
      })
    } else {
      res.status(204).json({
        success: true,
        message: 'user deleted successfully'
      })
    }
  }
  catch (error) {
    res.status(500).json({
      error: error
    })
  }
})


module.exports = router