const router = require('express').Router()

const Employee = require('../../models/Employee')

router.route('/add').post((req, res) => {
  const id = req.body.id
  const name = req.body.name
  const designation = req.body.designation
  const address = req.body.address
  const email = req.body.email
  const contactNo = req.body.contactNo

  const newEmployee = new Employee({
    id,
    name,
    designation,
    address,
    email,
    contactNo,
  })

  newEmployee
    .save()
    .then(() => {
      res.json('Employee Added')
    })
    .catch((err) => {
      console.log(err)
    })
})

router.route('/').get((req, res) => {
  Employee.find()
    .then((employees) => {
      res.json(employees)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.route('/update/:id').put(async (req, res) => {
  let userId = req.params.id
  const { id, name, designation, address, email, contactNo } = req.body

  const updateEmployee = {
    id,
    name,
    designation,
    address,
    email,
    contactNo,
  }

  const update = await Employee.findByIdAndUpdate(userId, updateEmployee)
    .then(() => {
      res.status(200).send({ status: 'Employee updated' })
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .send({ status: 'Error with updating data', error: err.message })
    })
})

router.route('/delete/:id').delete(async (req, res) => {
  let userId = req.params.id

  await Employee.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: 'Employee deleted' })
    })
    .catch((err) => {
      console.log(err.message)
      res
        .status(500)
        .send({ status: 'Error with delete user', error: err.message })
    })
})

router.route('/get/:id').get(async (req, res) => {
  let userId = req.params.id
  const user = await Employee.findById(userId)
    .then((employee) => {
      res.status(200).send({ status: 'Employee fetched', employee })
    })
    .catch(() => {
      console.log(err.message)
      res
        .status(500)
        .send({ status: 'Error with get user', error: err.message })
    })
})

module.exports = router
