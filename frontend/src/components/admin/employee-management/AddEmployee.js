import React, { useState } from 'react'
import axios from 'axios'

const AddEmployee = () => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [designation, setDesignation] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [contactNo, setContactNo] = useState('')

  function sendData(e) {
    e.preventDefault()

    const newEmployee = {
      id,
      name,
      designation,
      address,
      email,
      contactNo,
    }

    // console.log(newEmployee);
    axios
      .post('/api/employee/add', newEmployee)
      .then(() => {
        alert('Employee Successfully Added')
      })
      .catch((err) => {
        alert(err)
      })
  }

  
  return (
    <div className='container border p-4 bg-light rounded'>
      <form onSubmit={sendData}>
        <div className='row mb-3'>
          <label for='id' className='col-sm-2 col-form-label fw-bold'>
            Employee ID
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='id'
              placeholder='Enter Employee ID'
              onChange={(e) => {
                setId(e.target.value)
              }}
              required
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label for='name' className='col-sm-2 col-form-label fw-bold'>
            Employeee Name
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='name'
              placeholder='Enter Employee Name'
              onChange={(e) => {
                setName(e.target.value)
              }}
              required
            />
          </div>
        </div>
        {/* <div className='mb-3'>
          <label for='nic' className='form-label'>
            Employee NIC No
          </label>
          <input
            type='text'
            className='form-control'
            id='nic'
            placeholder='Enter Employee NIC No.'
            onChange={(e) => {
              setNic(e.target.value)
            }}
          />
        </div> */}
        <div className='row mb-3'>
          <label for='designation' className='col-sm-2 col-form-label fw-bold'>
            Designation
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='designation'
              placeholder='Enter Employee Designation'
              onChange={(e) => {
                setDesignation(e.target.value)
              }}
              required
            />
          </div>
        </div>

        <div className='row mb-3'>
          <label for='address' className='col-sm-2 col-form-label fw-bold'>
            Employee Address
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='address'
              placeholder='Enter Employee Address'
              onChange={(e) => {
                setAddress(e.target.value)
              }}
              required
            />
          </div>
        </div>

        <div className='row mb-3'>
          <label for='email' className='col-sm-2 col-form-label fw-bold'>
            Email
          </label>
          <div className='col-sm-10'>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='Enter Email'
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              required
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label for='contactNo' className='col-sm-2 col-form-label fw-bold'>
            Contact No.
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              maxlength='10'
              pattern='[0-9]{3}[0-9]{7}'
              className='form-control'
              id='contactNo'
              placeholder='Enter Contact No.'
              onChange={(e) => {
                setContactNo(e.target.value)
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

export default AddEmployee
