const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile_number: {
    type: Number,
  },
  birthday: {
    type: Date,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    default: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = User = mongoose.model('user', UserSchema)
