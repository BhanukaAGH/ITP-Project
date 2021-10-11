const express = require('express')

const adminModel = require('../../models/adminModel')

const router = express.Router()

router.post('/adminRoute/save', (req, res) => {
  let newpost = new adminModel(req.body)

  newpost.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      })
    }
    return res.status(200).json({
      success: 'post saved successfuly',
    })
  })
})
router.get('/adminRoute/:id', (req, res) => {
  let idrq = req.params.id
  adminModel.findById(idrq, (err, post) => {
    if (err) {
      return res.status(400).json({
        success: false,
        err,
      })
    }
    return res.status(200).json({
      success: true,
      post,
    })
  })
})

module.exports = router
