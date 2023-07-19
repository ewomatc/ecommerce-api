const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

userSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

userSchema.set('toJSON', {
  virtuals: true
})

exports.User = mongoose.model('User', userSchema)