const {User} = require('../models/user')
const router = require('express').Router()

router.get('/', async(req, res) => {
  const userList = await User.find()

  if(userList) {
    res.json(userList)
  }
  else{
    res.status(500).json({error: 'could not get'})
  }
})

module.exports = router