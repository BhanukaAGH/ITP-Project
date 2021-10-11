const express = require('express')
const router = express.Router()
const Product = require('../../models/Product')

// @route   GET api/products
// @desc    Get all products
// @access  private
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
