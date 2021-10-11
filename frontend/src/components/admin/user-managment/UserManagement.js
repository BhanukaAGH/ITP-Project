import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  getAllUsers,
  updateUserRole,
  addNewUsers,
  deleteUserAccount,
} from '../../../actions/profile'
import AddNewUser from './AddNewUser'

import ReactHTMLTableToExcel from 'react-html-table-to-excel'

// alert
import { setAlert } from '../../../actions/alert'
import Alert from '../../layout/Alert'

const UserManagement = ({
  getAllUsers,
  updateUserRole,
  addNewUsers,
  deleteUserAccount,
  profile: { profiles, loading },
}) => {
  const [addNewUser, toggleAddUser] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [results, setResults] = useState(profiles)
  const [deleteUser, setDeleteUser] = useState('')

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  useEffect(() => {
    setResults(profiles)
  }, [profiles])

  useEffect(() => {
    if (searchInput === '') {
      setResults(profiles)
    } else {
      let results = profiles.filter((profile) =>
        profile.name.includes(searchInput)
      )
      setResults(results)
    }
  }, [searchInput])

  return (
    <div>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>User Managment</h1>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='download-table-xls-button'
          table='table-to-xls'
          filename='tablexls'
          sheet='tablexls'
          buttonText='Generate User Report'
        />
      </div>
      <div className='d-flex justify-content-center text-center'>
        <div className='w-50'>
          <Alert />
        </div>
      </div>
      <div
        className={`d-flex flex-wrap ${
          addNewUser ? '' : 'justify-content-center'
        } px-0 py-2 mb-3 border-bottom`}
      >
        {addNewUser ? (
          <button
            type='button'
            className='btn btn-danger px-4 py-2 align-middle'
            onClick={() => toggleAddUser(!addNewUser)}
          >
            <i className='bi bi-chevron-left pe-1'></i>Back
          </button>
        ) : (
          <Fragment>
            <form className='col-6 col-lg-3 mb-2 mb-0 me-auto'>
              <input
                type='search'
                className='form-control'
                placeholder='Search by user name'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>

            <div className='text-end'>
              <button
                type='button'
                className='btn btn-dark'
                onClick={() => toggleAddUser(!addNewUser)}
              >
                <i className='bi bi-person-plus'></i> Add new User
              </button>
            </div>
          </Fragment>
        )}
      </div>

      {addNewUser ? (
        <AddNewUser addNewUsers={addNewUsers} />
      ) : (
        <div className='table-responsive px-2'>
          <table className='table' id='table-to-xls'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>User Name</th>
                <th scope='col'>User Email</th>
                <th scope='col'>User role</th>
                <th scope='col'>Options</th>
              </tr>
            </thead>
            <tbody>
              {results.length > 0 ? (
                results.map((profile, index) => (
                  <tr key={profile._id} className='bg-light'>
                    <th className='align-middle'>{index + 1}</th>
                    <td className='align-middle'>{profile.name}</td>
                    <td className='align-middle'>{profile.email}</td>
                    <td className='align-middle'>
                      {profile.user_type === 'Admin' ? (
                        <span className='badge rounded-pill bg-dark text-light'>
                          Admin
                        </span>
                      ) : (
                        <span className='badge rounded-pill bg-secondary text-light'>
                          User
                        </span>
                      )}
                    </td>
                    <td className='align-middle'>
                      {profile.user_type === 'Admin' ? (
                        <button
                          className='btn px-3 py-0 me-2 btn-secondary'
                          onClick={() => updateUserRole(profile._id, 'User')}
                        >
                          <i className='bi bi-person-fill d-none d-lg-inline-block'></i>{' '}
                          User
                        </button>
                      ) : (
                        <button
                          className='btn px-2 py-0 me-2 btn-secondary'
                          onClick={() => updateUserRole(profile._id, 'Admin')}
                        >
                          <i className='bi bi-person-check-fill d-none d-lg-inline-block'></i>{' '}
                          Admin
                        </button>
                      )}

                      <button
                        className='btn px-1 py-0 btn-danger'
                        data-bs-toggle='modal'
                        data-bs-target='#confirmModal'
                        onClick={() => setDeleteUser(profile._id)}
                      >
                        <i className='bi bi-trash d-none d-lg-inline-block'></i>{' '}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <h4>No Profiles found...</h4>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* modal */}
          <div className='modal fade' id='confirmModal'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='row p-3'>
                  <div className='col'>
                    <h5>Are you sure you want to delete this account?</h5>
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
                    onClick={() => deleteUserAccount(deleteUser)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* modal end */}
        </div>
      )}
    </div>
  )
}

UserManagement.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  updateUserRole: PropTypes.func.isRequired,
  addNewUsers: PropTypes.func.isRequired,
  deleteUserAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, {
  setAlert,
  getAllUsers,
  updateUserRole,
  addNewUsers,
  deleteUserAccount,
})(UserManagement)
