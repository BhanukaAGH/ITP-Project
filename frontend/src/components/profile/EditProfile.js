import React, { useState, useEffect, Fragment } from 'react'
import Navbar from '../layout/Navbar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'

// alert
import { setAlert } from '../../actions/alert'
import Alert from '../layout/Alert'

const EditProfile = ({
  profile: { oneprofile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    birthday: '',
    gender: '',
  })

  useEffect(() => {
    getCurrentProfile()
    setFormData({
      name: loading || !oneprofile.name ? '' : oneprofile.name,
      email: loading || !oneprofile.email ? '' : oneprofile.email,
      mobile_number:
        loading || !oneprofile.mobile_number ? '' : oneprofile.mobile_number,
      birthday: loading || !oneprofile.birthday ? '' : oneprofile.birthday,
      gender: loading || !oneprofile.gender ? '' : oneprofile.gender,
    })
  }, [loading, getCurrentProfile])

  const { name, email, mobile_number, birthday, gender } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    createProfile(formData, true)
  }

  return (
    <Fragment>
      <Navbar />
      <section className='bg-light pb-5'>
        <section className='position-relative Account-banner bg-warning mt-5 mb-5'>
          <div className='container fs-3 position-absolute top-50 start-50 translate-middle'>
            <nav>
              <ol className='breadcrumb'>
                <li className='breadcrumb-item'>Home</li>
                <li className='breadcrumb-item active'>Edit Profile</li>
              </ol>
            </nav>
          </div>
        </section>
        <div className=' container p-2'>
          <Alert />
        </div>

        <section className='bg-light mt-2 mb-5'>
          <div className='container h-100 shadow p-5 pt-4 mb-5'>
            <div className='h2 mb-4'>Edit Profile</div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className='row mb-3'>
                <label for='name' className='col-sm-2 col-form-label'>
                  Name
                </label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    value={name}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <label for='email' className='col-sm-2 col-form-label'>
                  Email
                </label>
                <div className='col-sm-10'>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <label for='mobile' className='col-sm-2 col-form-label'>
                  Mobile Number
                </label>
                <div className='col-sm-10'>
                  <input
                    type='number'
                    className='form-control'
                    id='mobile'
                    name='mobile_number'
                    value={mobile_number}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <label for='birthday' className='col-sm-2 col-form-label'>
                  Birthday
                </label>
                <div className='col-sm-10'>
                  <input
                    type='date'
                    className='form-control'
                    id='birthday'
                    name='birthday'
                    value={birthday}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <label for='gender' className='col-sm-2 col-form-label'>
                  Gender
                </label>
                <div className='col-sm-10'>
                  <select
                    name='gender'
                    value={gender}
                    onChange={(e) => onChange(e)}
                  >
                    <option value='Male' selected>
                      Male
                    </option>
                    <option value='Female'>Female</option>
                  </select>
                </div>
              </div>
              <button type='submit' className='btn btn-primary'>
                Update Account
              </button>
            </form>
          </div>
        </section>
      </section>
    </Fragment>
  )
}

EditProfile.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, {
  setAlert,
  createProfile,
  getCurrentProfile,
})(EditProfile)
