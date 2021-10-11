import React, { useState, useEffect, Fragment } from 'react'
import Navbar from '../layout/Navbar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changePassword } from '../../actions/profile'

// alert
import { setAlert } from '../../actions/alert'
import Alert from '../layout/Alert'

const ChangePassword = ({ setAlert, changePassword }) => {
  const [formData, setFormData] = useState({
    currentpassword: '',
    newpassword: '',
    verifypassword: '',
  })

  const { currentpassword, newpassword, verifypassword } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (newpassword !== verifypassword) {
      setAlert("Password doesn't match", 'danger')
    } else {
      changePassword(currentpassword, newpassword)
    }
  }

  return (
    <Fragment>
      <Navbar />
      <section className='bg-light pb-5'>
        <section className='position-relative Account-banner bg-warning mt-5'>
          <div className='container fs-3 position-absolute top-50 start-50 translate-middle'>
            <nav>
              <ol className='breadcrumb'>
                <li className='breadcrumb-item'>Home</li>
                <li className='breadcrumb-item active'>Change Password</li>
              </ol>
            </nav>
          </div>
        </section>
        <div className=' container p-2'>
          <Alert />
        </div>
        <section className='bg-light mt-2 mb-5'>
          <div className='container h-100 shadow p-5 pt-4 mb-5'>
            <div className='h2 mb-4'>Change Password</div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className='row mb-3'>
                <label
                  for='currentpassword'
                  className='col-sm-2 col-form-label'
                >
                  Current Password
                </label>
                <div className='col-sm-10'>
                  <input
                    type='password'
                    className='form-control'
                    id='currentpassword'
                    name='currentpassword'
                    value={currentpassword}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <label for='newpassword' className='col-sm-2 col-form-label'>
                  New Password
                </label>
                <div className='col-sm-10'>
                  <input
                    type='password'
                    className='form-control'
                    id='newpassword'
                    name='newpassword'
                    value={newpassword}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <label for='verifypassword' className='col-sm-2 col-form-label'>
                  Verify Password
                </label>
                <div className='col-sm-10'>
                  <input
                    type='password'
                    className='form-control'
                    id='verifypassword'
                    name='verifypassword'
                    value={verifypassword}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>

              <button type='submit' className='btn btn-primary'>
                Change Password
              </button>
            </form>
          </div>
        </section>
      </section>
    </Fragment>
  )
}

ChangePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
}

export default connect(null, { setAlert, changePassword })(ChangePassword)
