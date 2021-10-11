const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const User = require('../../models/User')

// @route   GET api/admin/dashboard
// @desc    Get dashboard
// @access  private
router.get('/dashboard', auth, async (req, res) => {
  res.send('admin dashboard')
})

// @route   GET api/admin/users
// @desc    Get all users
// @access  private
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find().select(
      '-password -birthday -gender -mobile_number'
    )
    res.json(users)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route   PUT api/admin/users
// @desc    Update user role
// @access  private
router.put('/users', auth, async (req, res) => {
  const { id, userRole } = req.body

  try {
    userRoles = await User.findOneAndUpdate(
      { _id: id },
      { user_type: userRole },
      { new: true }
    )

    const users = await User.find().select(
      '-password -birthday -gender -mobile_number'
    )
    res.json(users)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/admin/user
// @desc    Add new user
// @access  private
router.post(
  '/users',
  auth,
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      name,
      email,
      mobile_number,
      birthday,
      gender,
      password,
      user_type,
    } = req.body

    try {
      // See if user exists
      let user = await User.findOne({ email })

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
      }

      user = new User({
        name,
        email,
        mobile_number,
        birthday,
        gender,
        password,
        user_type,
      })

      // Encrypt password
      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()
      const users = await User.find().select(
        '-password -birthday -gender -mobile_number'
      )
      res.json(users)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// @route   PUT api/admin/users
// @desc    Delete user accouunt
// @access  private
router.put('/users/delete', auth, async (req, res) => {
  const { userID } = req.body

  try {
    await User.findOneAndRemove({ _id: userID })

    const users = await User.find().select(
      '-password -birthday -gender -mobile_number'
    )
    res.json(users)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
