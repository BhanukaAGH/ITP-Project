import React, { Fragment, useEffect } from 'react'
import AdminHome from './admin-dashboard/AdminHome'
import Orders from './Orders'
import Store from './Store'
import Payments from './Payments'
import UserManagement from './user-managment/UserManagement'
import EmployeeManagment from './employee-management/EmployeeManagment'
import SupplierManagment from './SupplierManagment'
import AdvertismentManagment from './AdvertismentManagment'
import DeliveryManagment from './DeliveryManagment/DeliveryManagment'
import SalaryManagement from './sallary-management/SalaryManagement'
import FAQManagment from './faq/FAQManagement'
import { Link, useParams, useHistory, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Dashboard = ({ auth: { isAuthenticated, user }, logout }) => {
  const DEFAULT_ACTIVE_TAB = 'dashboard'
  const tabs = {
    dashboard: {
      id: 'admin_home',
      title: 'Dashboard',
      icon: <i className='bi bi-house'></i>,
      content: <AdminHome />,
    },
    orders: {
      id: 'orders',
      title: 'Orders',
      icon: <i className='bi bi-clipboard-check'></i>,
      content: <Orders />,
    },
    products: {
      id: 'products',
      title: 'Products',
      icon: <i className='bi bi-basket'></i>,
      content: <Store />,
    },
    payments: {
      id: 'payments',
      title: 'Payments',
      icon: <i className='bi bi-credit-card'></i>,
      content: <Payments />,
    },
    users: {
      id: 'userManagment',
      title: 'User Managment',
      icon: <i className='bi bi-people'></i>,
      content: <UserManagement />,
    },
    employees: {
      id: 'employeeManagment',
      title: 'Employees Managment',
      icon: <i className='bi bi-building'></i>,
      content: <EmployeeManagment />,
    },
    salaries: {
      id: 'salaryManagment',
      title: 'Salary Managment',
      icon: <i className='bi bi-currency-dollar'></i>,
      content: <SalaryManagement />,
    },
    suppliers: {
      id: 'supplierManagment',
      title: 'Supplier Managment',
      icon: <i className='bi bi-truck'></i>,
      content: <SupplierManagment />,
    },
    advertisments: {
      id: 'advertismentManagment',
      title: 'Advertisment Managment',
      icon: <i className='bi bi-badge-ad'></i>,
      content: <AdvertismentManagment />,
    },
    deliveries: {
      id: 'deliveryManagment',
      title: 'Delivery Managment',
      icon: <i className='bi bi-cart-check'></i>,
      content: <DeliveryManagment />,
    },
    faq: {
      id: 'faqManagement',
      title: 'FAQ Managment',
      icon: <i className='bi bi-info-square'></i>,
      content: <FAQManagment />,
    },
  }

  const { active_tab } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (!active_tab) {
      history.push(`/admin/${DEFAULT_ACTIVE_TAB}`)
    }
  }, [])

  const toggle = (tab) => {
    if (active_tab !== tab) {
      history.push(`/admin/${tab}`)
    }
  }

  // Redirect if logged in
  if (isAuthenticated) {
    if (user && user.user_type === 'User') {
      return <Redirect to='/' />
    }
  }

  return (
    <Fragment>
      <header className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
        <Link
          className='navbar-brand admin-brand col-md-3 col-lg-2 me-0 px-3 fw-bold'
          to='/'
        >
          TECH GEAR
        </Link>
        <button
          className='navbar-toggler position-absolute d-md-none collapsed'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#sidebarMenu'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='navbar-nav'>
          <div className='nav-item text-nowrap me-5 me-md-0'>
            <span
              role='button'
              className='nav-link px-3 me-4 me-md-0'
              onClick={logout}
            >
              Sign out
            </span>
          </div>
        </div>
      </header>

      <div className='container-fluid'>
        <div className='row'>
          <nav
            className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse pt-0 pt-md-5'
            id='sidebarMenu'
          >
            <div className='position-sticky pt-3'>
              <ul className='nav flex-column' id='myTab'>
                {Object.entries(tabs).map((tab) => (
                  <li className='nav-item' role='button' key={tab[0]}>
                    <span
                      className={
                        active_tab === tab[0]
                          ? 'active nav-link text-danger'
                          : 'nav-link'
                      }
                      onClick={() => {
                        toggle(tab[0])
                      }}
                      role='button'
                      data-bs-toggle='tab'
                      data-bs-target={`#${tab[1].id}`}
                    >
                      <span className='nav-item-icon'>{tab[1].icon}</span>
                      {tab[1].title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            <div className='tab-content' id='myTabContent'>
              {Object.entries(tabs).map((tab) => (
                <div
                  className={`tab-pane ${active_tab === tab[0] && 'active'}`}
                  key={tab[0]}
                  id={tab[1].id}
                >
                  {tab[1].content}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  )
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Dashboard)
