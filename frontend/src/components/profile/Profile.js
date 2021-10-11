import React, { useEffect, Fragment } from 'react'
import Navbar from '../layout/Navbar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'

const Profile = ({
  profile: { oneprofile, loading },
  getCurrentProfile,
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [loading])

  return (
    <Fragment>
      <Navbar />
      <section className='bg-light pb-5'>
        <section className='position-relative Account-banner bg-warning mt-5'>
          <div className='container fs-3 position-absolute top-50 start-50 translate-middle'>
            <nav>
              <ol className='breadcrumb'>
                <li className='breadcrumb-item'>Home</li>
                <li className='breadcrumb-item active'>My account</li>
              </ol>
            </nav>
          </div>
        </section>

        {oneprofile === null || loading ? (
          <Spinner />
        ) : (
          <section className='bg-light mt-5 mb-5'>
            <div className='container h-100 shadow p-5 pt-4 mb-5'>
              <div className='h2 mb-4'>Account Information</div>
              <form>
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
                      value={oneprofile.name && oneprofile.name}
                      disabled
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
                      value={oneprofile.email && oneprofile.email}
                      disabled
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
                      value={
                        oneprofile.mobile_number && oneprofile.mobile_number
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label for='birthday' className='col-sm-2 col-form-label'>
                    Birthday
                  </label>
                  <div className='col-sm-10'>
                    <input
                      type='text'
                      className='form-control'
                      id='birthday'
                      name='birthday'
                      value={
                        oneprofile.birthday && oneprofile.birthday.split('T')[0]
                      }
                      disabled
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
                      value={oneprofile.gender && oneprofile.gender}
                      disabled
                    >
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                    </select>
                  </div>
                </div>
              </form>
              <div className='mt-5'>
                <Link className='btn btn-primary' to='/profile/edit-profile'>
                  Edit Profile
                </Link>
                <Link
                  className='btn btn-primary mx-3'
                  to='/profile/change-password'
                >
                  Change Password
                </Link>
                <button
                  className='btn btn-danger float-end '
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop'
                >
                  Delete Account
                </button>
                <div className='modal fade' id='staticBackdrop'>
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='row p-3'>
                        <div className='col'>
                          <h5>Are you sure you want to delete your account?</h5>
                        </div>
                      </div>
                      <div className='d-flex flex-row justify-content-end p-3'>
                        <button
                          className='btn btn-secondary mx-2'
                          data-bs-dismiss='modal'
                        >
                          Cancel
                        </button>

                        <button
                          className='btn btn-danger mx-1'
                          data-bs-dismiss='modal'
                          onClick={() => deleteAccount()}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </section>
    </Fragment>
  )
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Profile
)
