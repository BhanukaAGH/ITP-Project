import React, { useState } from 'react'

import AddEmployee from './AddEmployee'
import FetchAllEmployees from './FetchAllEmployees'

const EmployeeManagment = (props) => {
  const [add, showAdd] = useState(false)
  const [text, setText] = useState(false)
  const allEmp = 'Show all employees'
  const addEmp = 'Add new employee'

  return (
    <div>
      <div className='align-items-center row border-bottom'>
        <div className='col'>
          <h1>Employee Managment</h1>
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
            <i className='bi bi-person-plus'></i> {text ? allEmp : addEmp}
          </span>
        </div>
      </div>
      <br />
      {add ? <AddEmployee /> : <FetchAllEmployees />}
    </div>
  )
}

export default EmployeeManagment
