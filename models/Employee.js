const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  designation: {
    type: String,
    required: true,
  },

  address: {
    type: String,
  },

  email: {
    type: String,
    required: true,
  },

  contactNo: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Employee', employeeSchema)
