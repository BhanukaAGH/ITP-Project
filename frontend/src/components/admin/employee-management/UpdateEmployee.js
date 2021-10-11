import React, { useState } from 'react'
import axios from 'axios'

const UpdateEmployee = ({ oneEmployee }) => {
  const [id, setId] = useState(oneEmployee.id)
  const [name, setName] = useState(oneEmployee.name)
  const [designation, setDesignation] = useState(oneEmployee.designation)
  const [address, setAddress] = useState(oneEmployee.address)
  const [email, setEmail] = useState(oneEmployee.email)
  const [contactNo, setContactNo] = useState(oneEmployee.contactNo)

  function sendData(e) {
    e.preventDefault()

    const updatedEmployee = {
      id,
      name,
      designation,
      address,
      email,
      contactNo,
    }

    axios
      .put(`/api/employee/update/${oneEmployee._id}`, updatedEmployee)
      .then(() => {
        alert('Employee Successfully updated')
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
            <fieldset disabled>
              <input
                type='text'
                style={{ backgroundColor: '#C0C0C0', fontWeight: 'bold' }}
                className='form-control'
                id='id'
                placeholder='Enter Employee ID'
                value={oneEmployee.id}
                onChange={(e) => {
                  setId(e.target.value)
                }}
                required
              />
            </fieldset>
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
              defaultValue={oneEmployee.name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              required
            />
          </div>
        </div>

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
              defaultValue={oneEmployee.designation}
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
              defaultValue={oneEmployee.address}
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
              defaultValue={oneEmployee.email}
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
              defaultValue={oneEmployee.contactNo}
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

export default UpdateEmployee
