import React from 'react'
import PropTypes from 'prop-types'

// images
import finance from '../../../img/finance.png'
import orders from '../../../img/orders.png'
import customers from '../../../img/customers.png'
import products from '../../../img/products.png'

const AdminHome = (props) => {
  return (
    <div>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Dashboard</h1>
      </div>
      <div className='row g-3'>
        <div className='col-6 col-xl-3'>
          <div className='row bg-success bg-gradient rounded mx-1 h-100'>
            <div className='col-9'>
              <div className='card mb-3 bg-success bg-gradient border-0'>
                <div className='card-body'>
                  <h5 className='card-title fs-3'>Rs 10450.00</h5>
                  <p className='card-text fs-5'>Total Sales</p>
                </div>
              </div>
            </div>
            <div className='col-3 d-flex align-items-center'>
              <img
                src={finance}
                alt='sales'
                className='img-fluid rounded-start'
              />
            </div>
          </div>
        </div>
        <div className='col-6 col-xl-3'>
          <div className='row bg-primary bg-gradient rounded mx-1 h-100'>
            <div className='col-9'>
              <div className='card mb-3 bg-primary bg-gradient border-0'>
                <div className='card-body'>
                  <h5 className='card-title fs-3'>10</h5>
                  <p className='card-text fs-5'>Total Orders</p>
                </div>
              </div>
            </div>
            <div className='col-3 d-flex align-items-center'>
              <img
                src={orders}
                alt='sales'
                className='img-fluid rounded-start'
              />
            </div>
          </div>
        </div>
        <div className='col-6 col-xl-3'>
          <div className='row bg-danger bg-gradient rounded mx-1 h-100'>
            <div className='col-9'>
              <div className='card mb-3 bg-danger bg-gradient border-0'>
                <div className='card-body'>
                  <h5 className='card-title fs-3'>8</h5>
                  <p className='card-text fs-5'>Total Customers</p>
                </div>
              </div>
            </div>
            <div className='col-3 d-flex align-items-center'>
              <img
                src={customers}
                alt='sales'
                className='img-fluid rounded-start'
              />
            </div>
          </div>
        </div>
        <div className='col-6 col-xl-3'>
          <div className='row bg-warning bg-gradient rounded mx-1 h-100'>
            <div className='col-9'>
              <div className='card mb-3 bg-warning bg-gradient border-0'>
                <div className='card-body'>
                  <h5 className='card-title fs-3'>40</h5>
                  <p className='card-text fs-5'>Total Products</p>
                </div>
              </div>
            </div>
            <div className='col-3 d-flex align-items-center'>
              <img
                src={products}
                alt='sales'
                className='img-fluid rounded-start'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AdminHome.propTypes = {}

export default AdminHome
