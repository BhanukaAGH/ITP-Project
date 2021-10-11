const express = require('express')

const posts = require('../../models/posts')

const router = express.Router()

// save post route

router.post('/post/save', (req, res) => {
  let newpost = new posts(req.body)

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

router.put('/post/update/:id', (req, res) => {
  posts.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({ error: err })
      }
      return res.status(200).json({
        success: 'Update is succesfuly',
      })
    }
  )
})

router.get('/posts', (req, res) => {
  posts.find().exec((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err,
      })
    }
    return res.status(200).json({
      success: true,
      existingpost: post,
    })
  })
})

router.delete('/post/delete/:id', (req, res) => {
  posts.findByIdAndDelete(req.params.id).exec((err, deletepost) => {
    if (err) {
      return res.status(400).json({
        massage: 'Delete unsuccesful',
      })
    }
    return res.status(200).json({
      massage: 'Delete succesfuly ',
      deletepost,
    })
  })
})
// get spacific id using data
router.get('/post/:id', (req, res) => {
  let idrq = req.params.id
  posts.findById(idrq, (err, post) => {
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
