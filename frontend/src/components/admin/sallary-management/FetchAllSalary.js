import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const FetchAllSalary = () => {
  const [salaries, setSalaries] = useState([])
  const [results, setResults] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSalary = () => {
      axios
        .get('/api/salary/')
        .then((res) => {
          console.log(res)
          setSalaries(res.data)
        })
        .catch((err) => {
          alert(err.message)
        })
    }
    getSalary()

    setLoading(false)
  }, [loading, setLoading])

  const onDelete = (id) => {
    axios.delete(`/api/salary/delete/${id}`).then((res) => {
      alert('Deleted Successfully')
      setLoading(true)
    })
  }

  useEffect(() => {
    setSalaries(salaries)
  }, [salaries])

  useEffect(() => {
    if (searchInput === '') {
      setResults(salaries)
    } else {
      let results = salaries.filter(
        (salary) =>
          salary.employeeId.toLowerCase().includes(searchInput) ||
          salary.year.toLowerCase().includes(searchInput) ||
          salary.month.toLowerCase().includes(searchInput)
      )
      setResults(results)
    }
  }, [searchInput, salaries])

  return (
    <div className=''>
      <div className='float-end'>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='download-table-xls-button'
          table='saltable-to-xls'
          filename='tablexls'
          sheet='tablexls'
          buttonText='Generate User Report'
        />
      </div>
      <form>
        <div className='col-2'>
          <input
            className='form-control'
            type='search'
            placeholder='Search salary'
            name='searchQue'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </form>
      <table className='table table-striped table-hover' id='saltable-to-xls'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Employee ID</th>
            <th scope='col'>Year</th>
            <th scope='col'>Month</th>
            <th scope='col'>Basic Salary</th>
            <th scope='col'>COl Allo.</th>
            <th scope='col'>Medi Allo.</th>
            <th scope='col'>Tax Dedu.</th>
            <th scope='col'>Net Salary</th>
            <th scope='col'>Actions</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {results.map((salaries, index) => (
            <tr key={salaries._id}>
              <th scope='row'>{index + 1}</th>
              <td>{salaries.employeeId}</td>
              <td>{salaries.year}</td>
              <td>{salaries.month}</td>
              <td>{salaries.basicSalary}</td>
              <td>{salaries.colAllowance}</td>
              <td>{salaries.mediAllowance}</td>
              <td>{salaries.taxDeduction}</td>
              <td>
                {salaries.basicSalary +
                  salaries.colAllowance +
                  salaries.mediAllowance -
                  salaries.taxDeduction}
              </td>
              <td>
                &nbsp;
                <Link
                  to='#'
                  className='btn btn-danger'
                  onClick={() => onDelete(salaries._id)}
                >
                  <i className='bi bi-trash d-none d-lg-inline-block'></i>
                  &nbsp;Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FetchAllSalary
