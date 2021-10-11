import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import NotFoundImage from '../../img/404.svg'

const NotFound = () => {
  return (
    <Fragment>
      <div className='text-center mt-5'>
        <h1 className='x-large text-dark'>
          <i className='bi bi-exclamation-triangle'></i> 404 Page Not Found
        </h1>
        <p className='large'>Sorry, this page does not exist</p>
        <p>
          <Link to='/'>Go Home</Link>
        </p>
        <img className='p-5 svg-width' src={NotFoundImage} alt='404' />
      </div>
    </Fragment>
  )
}

export default NotFound
