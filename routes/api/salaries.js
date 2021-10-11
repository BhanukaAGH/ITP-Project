const router = require('express').Router()

const Salary = require('../../models/Salary')

router.route('/add').post((req, res) => {
  const employeeId = req.body.employeeId
  const year = req.body.year
  const month = req.body.month
  const basicSalary = req.body.basicSalary
  const colAllowance = req.body.colAllowance
  const mediAllowance = req.body.mediAllowance
  const taxDeduction = req.body.taxDeduction

  const newSalary = new Salary({
    employeeId,
    year,
    month,
    basicSalary,
    colAllowance,
    mediAllowance,
    taxDeduction,
  })

  newSalary
    .save()
    .then(() => {
      res.json('Salary Added')
    })
    .catch((err) => {
      console.log(err)
    })
})

router.route('/').get((req, res) => {
  Salary.find()
    .then((salaries) => {
      res.json(salaries)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.route('/update/:id').put(async (req, res) => {
  let salaryId = req.params.id
  const {
    employeeId,
    year,
    month,
    basicSalary,
    colAllowance,
    mediAllowance,
    taxDeduction,
  } = req.body

  const updateSalary = {
    employeeId,
    year,
    month,
    basicSalary,
    colAllowance,
    mediAllowance,
    taxDeduction,
  }

  const update = await Salary.findByIdAndUpdate(salaryId, updateSalary)
    .then(() => {
      res.status(200).send({ status: 'Salary updated' })
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .send({ status: 'Error with updating data', error: err.message })
    })
})

router.route('/delete/:id').delete(async (req, res) => {
  let salaryId = req.params.id

  await Salary.findByIdAndDelete(salaryId)
    .then(() => {
      res.status(200).send({ status: 'Salary deleted' })
    })
    .catch((err) => {
      console.log(err.message)
      res
        .status(500)
        .send({ status: 'Error with delete Salary', error: err.message })
    })
})

module.exports = router
