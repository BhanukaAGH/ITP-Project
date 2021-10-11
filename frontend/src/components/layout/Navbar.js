import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <li className='nav-item dropdown fw-normal fs-5'>
      <span
        className='nav-link dropdown-toggle'
        id='navbarDarkDropdownMenuLink'
        role='button'
        data-bs-toggle='dropdown'
      >
        {user && user.name}
      </span>
      <ul className='dropdown-menu dropdown-menu-dark dropdown-menu-end'>
        <li>
          <Link className='dropdown-item' to='/profile'>
            My Account
          </Link>
        </li>
        {user && user.user_type === 'Admin' && (
          <li>
            <Link className='dropdown-item' to='/admin/dashboard'>
              Dashboard
            </Link>
          </li>
        )}
        <li>
          <Link className='dropdown-item' to='/orders'>
            Add Orders
          </Link>
        </li>
        <li>
          <span role='button' onClick={logout} className='dropdown-item'>
            Logout
          </span>
        </li>
      </ul>
    </li>
  )

  const guestLinks = (
    <li className='nav-item fw-normal fs-5'>
      <Link to='/login' className='nav-link'>
        Login <i className='bi bi-person-plus-fill'></i>
      </Link>
    </li>
  )

  return (
    <div>
      <div className='section nav-bar-top d-md-block d-none'>
        <h6 className='text-light mb-0 top-left'>
          {' '}
          <i className='bi bi-telephone-fill pe-2'></i>
          Hot Line <span className='fw-light'>+94 123 2345 </span>
          <span className='h5 fw-light ps-1 pe-1'>|</span>
          <Link to='/faq' className='text-decoration-none text-light'>
            Help & Support
          </Link>
        </h6>
        <h6 className='text-light mb-0 top-email'>
          <i className='bi bi-envelope-fill pe-2'></i>techgear@gmail.com
        </h6>
      </div>
      <nav className='navbar navbar-expand-lg nav-bar navbar-dark py-lg-3 px-3 sticky-top'>
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand'>
            TECH GEAR
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navmenu'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navmenu'>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item fw-normal fs-5 px-2'>
                <Link to='/' className='nav-link'>
                  Home
                </Link>
              </li>
              <li className='nav-item fw-normal fs-5 px-2'>
                <Link to='/products' className='nav-link'>
                  Products
                </Link>
              </li>
              <li className='nav-item fw-normal fs-5 px-2'>
                <Link to='/about' className='nav-link'>
                  About
                </Link>
              </li>
            </ul>
            <ul
              className='navbar-nav ms-auto justify-content-around'
              style={{ flexDirection: 'row' }}
            >
              <li className='nav-item fw-normal fs-5'>
                <span
                  className='nav-link'
                  role='button'
                  data-bs-toggle='offcanvas'
                  data-bs-target='#offcanvasRight'
                >
                  Cart <i className='bi bi-cart-fill'></i>
                </span>
              </li>
              {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar)
