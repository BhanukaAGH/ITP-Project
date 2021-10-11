const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  month: {
    type: String,
    required: true,
  },

  basicSalary: {
    type: Number,
    required: true,
  },

  colAllowance: {
    type: Number,
    required: true,
  },

  mediAllowance: {
    type: Number,
    required: true,
  },

  taxDeduction: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Salary', salarySchema)
