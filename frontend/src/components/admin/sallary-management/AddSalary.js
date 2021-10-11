import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AddSalary = () => {
  const [employeeId, setEmployeeId] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [basicSalary, setBasicSalary] = useState('')
  const [colAllowance, setColAllowance] = useState('')
  const [mediAllowance, setMediAllowance] = useState('')
  const [taxDeduction, setTaxDeduction] = useState('')

  const [employees, setEmployees] = useState([])
  const [employeeName, setEmployeeName] = useState('')

  useEffect(() => {
    const getEmployee = () => {
      axios
        .get('/api/employee/')
        .then((res) => {
          setEmployees(res.data)
        })
        .catch((err) => {
          alert(err.message)
        })
    }
    getEmployee()
  }, [])

  useEffect(() => {
    if (employeeId.length > 0) {
      setEmployeeName(employees.filter((emp) => emp.id === employeeId)[0].name)
    }
  }, [employeeId])

  function sendData(e) {
    e.preventDefault()

    const newEmployee = {
      employeeId,
      year,
      month,
      basicSalary,
      colAllowance,
      mediAllowance,
      taxDeduction,
    }

    axios
      .post('/api/salary/add', newEmployee)
      .then(() => {
        alert('Salary Successfully Added')
      })
      .catch((err) => {
        alert(err)
      })
  }
  
  
  return (
    <div className='container border p-4 bg-light rounded'>
      <form onSubmit={sendData}>
        <div className='row mb-3'>
          <label for='employeeId' className='col-sm-2 col-form-label fw-bold'>
            Employee ID
          </label>
          <div className='col-sm-10'>
            <select
              className='form-select'
              name='month'
              id='month'
              placeholder='Select a Month'
              onChange={(e) => {
                setEmployeeId(e.target.value)
              }}
              required
            >
              <option selected>Choose...</option>
              {employees.map((employee) => (
                <option> {employee.id}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='row mb-3'>
          {/* <div className='col-md-6'> */}
          <label for='name' className='col-sm-2 col-form-label fw-bold'>
            Employee Name
          </label>
          <div className='col-sm-10'>
            <fieldset disabled>
              <input
                type='text'
                style={{ backgroundColor: '#C0C0C0', fontWeight: 'bold' }}
                className='form-control'
                id='name'
                value={employeeName}
                required
              />
            </fieldset>
          </div>
        </div>

        <div className='row mb-3'>
          {/* <div className='col-md-6'> */}
          <label for='year' className='col-sm-2 col-form-label fw-bold'>
            Year
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='year'
              placeholder='Enter Year'
              onChange={(e) => {
                setYear(e.target.value)
              }}
              required
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label for='month' className='col-sm-2 col-form-label fw-bold'>
            Month
          </label>
          <div className='col-sm-10'>
            <select
              className='form-select'
              name='month'
              id='month'
              placeholder='Select a Month'
              onChange={(e) => {
                setMonth(e.target.value)
              }}
              required
            >
              <option selected>Choose...</option>
              <option value='January'>January</option>
              <option value='February'>February</option>
              <option value='March'>March</option>
              <option value='April'>April</option>
              <option value='May'>May</option>
              <option value='June'>June</option>
              <option value='July'>July</option>
              <option value='August'>August</option>
              <option value='September'>September</option>
              <option value='October'>October</option>
              <option value='November'>November</option>
              <option value='December'>December</option>
            </select>
          </div>
        </div>

        <div className='row mb-3'>
          <label for='basicSalary' className='col-sm-2 col-form-label fw-bold'>
            Employee Basic Salary
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='basicSalary'
              placeholder='Enter Basic Salary'
              onChange={(e) => {
                setBasicSalary(e.target.value)
              }}
              required
            />
          </div>
        </div>

        <div className='row mb-3'>
          <label for='colAllowance' className='col-sm-2 col-form-label fw-bold'>
            COL Allowance
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='colAllowance'
              placeholder='Enter Cost of Living Allowance'
              onChange={(e) => {
                setColAllowance(e.target.value)
              }}
              required
            />
          </div>
        </div>

        <div className='row mb-3'>
          <label
            for='mediAllowance'
            className='col-sm-2 col-form-label fw-bold'
          >
            Medical Allowance
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='mediAllowance'
              placeholder='Enter Medical Allowance'
              onChange={(e) => {
                setMediAllowance(e.target.value)
              }}
              required
            />
          </div>
        </div>

        <div className='row mb-3'>
          <label for='taxDeduction' className='col-sm-2 col-form-label fw-bold'>
            Tax Deduction
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='taxDeduction'
              placeholder='Enter Tax Deduction.'
              onChange={(e) => {
                setTaxDeduction(e.target.value)
              }}
              required
            />
          </div>
        </div>

        <div className='text-center mt-4'>
          <button type='submit' className='btn btn-dark'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddSalary
