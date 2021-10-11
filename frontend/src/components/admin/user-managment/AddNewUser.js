import React, { useState } from 'react'

const AddNewUser = ({ addNewUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    user_type: 'User',
    password: '',
  })

  const { name, email, user_type, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    addNewUsers({ name, email, user_type, password })
  }

  return (
    <div className='container border p-4 bg-light rounded'>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='row mb-3'>
          <label className='col-sm-2 col-form-label fw-bold'>User name</label>
          <div className='col-sm-10'>
            <input
              type='name'
              className='form-control'
              id='name'
              placeholder='User Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label className='col-sm-2 col-form-label fw-bold'>
            Email address
          </label>
          <div className='col-sm-10'>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label className='col-sm-2 col-form-label fw-bold'>User role</label>
          <div className='col-sm-10'>
            <select
              className='form-select'
              name='user_type'
              value={user_type}
              onChange={(e) => onChange(e)}
            >
              <option value='User'>User</option>
              <option value='Admin'>Admin</option>
            </select>
          </div>
        </div>
        <div className='row mb-3'>
          <label className='col-sm-2 col-form-label fw-bold'>Password</label>
          <div className='col-sm-10'>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className='text-end mt-4'>
          <button type='submit' className='btn btn-dark p-2 px-5'>
            Add User
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNewUser
