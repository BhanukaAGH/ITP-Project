import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AddSalary from './AddSalary'
import FetchAllSalary from './FetchAllSalary'

const SalaryManagement = (props) => {
  const [add, showAdd] = useState(false)
  const [text, setText] = useState(false)
  const allSal = 'Show all salaries'
  const addSal = 'Add new salary'

  return (
    <div>
      <div className='align-items-center row border-bottom'>
        <div className='col'>
          <h1>Salary Managment</h1>
        </div>
        <div className='d-flex align-items-center justify-content-end border-bottom'>
          <span
            role='button'
            className='my-3 btn bg-dark text-light'
            onClick={() => {
              showAdd(!add)
              setText(!text)
            }}
          >
            <i className='bi bi-currency-dollar'></i> {text ? allSal : addSal}
          </span>
        </div>
      </div>
      <br />
      {add ? <AddSalary /> : <FetchAllSalary />}
    </div>
  )
}

// SalaryManagement.PropTypes = {}

export default SalaryManagement
