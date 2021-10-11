const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

// @route   GET api/profile
// @desc    Get current user profile
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const profile = await User.findById(req.user.id).select('-password')

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/profile
// @desc    Update user profile
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('name', 'name is required').notEmpty(),
      check('email', 'email is required').isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, mobile_number, birthday, gender } = req.body

    // Build profile object
    const profileFields = {}
    profileFields.user = req.user.id
    if (name) profileFields.name = name
    if (email) profileFields.email = email
    if (mobile_number) profileFields.mobile_number = mobile_number
    if (birthday) profileFields.birthday = birthday
    if (gender) profileFields.gender = gender

    try {
      let profile = await User.findById(req.user.id).select('-password')

      if (profile) {
        // update
        profile = await User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: profileFields },
          { new: true }
        )

        return res.json(profile)
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route   PUT api/profile
// @desc    Change password
// @access  Private

router.put('/change-password', auth, async (req, res) => {
  const { currentpassword, newpassword } = req.body

  try {
    let user = await User.findById(req.user.id).select('password')

    const isMatch = await bcrypt.compare(currentpassword, user.password)

    if (isMatch) {
      // check password length
      if (newpassword.length < 6) {
        return res.status(400).json({
          errors: [
            { msg: 'Please enter a password with 6 or more characters' },
          ],
        })
      }
      // encrypt password
      const salt = await bcrypt.genSalt(10)

      hashpassword = await bcrypt.hash(newpassword, salt)

      // update password
      userpassword = await User.findOneAndUpdate(
        { _id: req.user.id },
        { password: hashpassword },
        { new: true }
      )

      return res.json(userpassword)
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Password is not match' }] })
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route   DELETE api/profile
// @desc    Delete profile,user
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id })

    res.json({ msg: 'User deleted' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
