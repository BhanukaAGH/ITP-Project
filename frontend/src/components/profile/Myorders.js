import React, { Fragment } from 'react'
import Navbar from '../layout/Navbar'

const Myorders = () => {
  return (
    <Fragment>
      <Navbar />
      <section className='bg-light pb-5'>
        <section className='position-relative Account-banner bg-warning mt-0'>
          <div className='container fs-3 position-absolute top-50 start-50 translate-middle'>
            <nav>
              <ol class='breadcrumb'>
                <li class='breadcrumb-item'>Home</li>
                <li class='breadcrumb-item active'>My Orders</li>
              </ol>
            </nav>
          </div>
        </section>
        <nav class='navbar navbar-expand-lg navbar-light bg-light'>
          <div class='container'>
            {' '}
            <button
              class='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#mynav'
              aria-controls='mynav'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              {' '}
              <span class='navbar-toggler-icon'></span>{' '}
            </button>{' '}
            <a class='navbar-brand' href='#'>
              <div class='d-flex'>
                <div class='ms-3 d-flex flex-column'>
                  <div class='h4'>TECH GEAR</div>
                  <div class='fs-6'>Online Electronic Items store</div>
                </div>
              </div>
            </a>
            <div class='collapse navbar-collapse' id='mynav'>
              <ul class='navbar-nav ms-auto mb-2 mb-lg-0'>
                <li class='nav-item'>
                  {' '}
                  <a class='nav-link active' aria-current='page' href='#'>
                    Categories <span class='fas fa-th-large px-1'></span>
                  </a>{' '}
                </li>
                <li class='nav-item'>
                  {' '}
                  <a class='nav-link' href='#'>
                    Exclusive
                  </a>{' '}
                </li>
                <li class='nav-item'>
                  {' '}
                  <a class='nav-link' href='#'>
                    Collections
                  </a>{' '}
                </li>
                <li class='nav-item'>
                  {' '}
                  <a class='nav-link' href='#'>
                    Blogs
                  </a>{' '}
                </li>
                <li class='nav-item'>
                  {' '}
                  <a class='nav-link' href='#'></a>{' '}
                </li>
                <img
                  src='https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-donations-shopping-carts-forms-membershipworks-21.png'
                  width='80'
                  alt='shopping cart, donations shopping carts forms membershipworks'
                />
                <li class='nav-item'>
                  {' '}
                  <a class='nav-link' href='#'>
                    {' '}
                    <span class='fas fa-user pe-2'></span> Hello Kasuni!
                  </a>{' '}
                </li>
                <img
                  src='https://www.freepnglogos.com/uploads/arrow-png/arrow-brushes-design-png-34.png'
                  width='80'
                  alt='brushes arrow png download'
                />
              </ul>
            </div>
          </div>
        </nav>
        <div class='container mt-4'>
          <div class='row'>
            <div class='col-lg-3 my-lg-0 my-md-1'>
              <div id='sidebar' class='bg-purple'>
                <img
                  src='https://www.freepnglogos.com/uploads/computer-png/computer-png-cool-electronics-and-electronic-reviews-33.png'
                  width='100'
                  alt='computer png cool electronics and electronic reviews'
                />
                <div class='h4 text-white'>My Orders</div>
              </div>
            </div>
            <div class='col-lg-9 my-lg-0 my-1'>
              <div id='main-content' class='bg-white border'>
                <div class='d-flex flex-column'>
                  <div class='h5'>Hello Kasuni,</div>
                  <div>Logged in as: kasuni @gmail.com</div>
                </div>
                <div class='d-flex my-4 flex-wrap'>
                  <div class='box me-4 my-1 bg-light'>
                    {' '}
                    <img
                      src='https://www.freepnglogos.com/uploads/box-png/cardboard-box-brown-vector-graphic-pixabay-2.png'
                      alt=''
                    />
                    <div class='d-flex align-items-center mt-2'>
                      <div class='tag'>Orders placed</div>
                      <div class='ms-auto number'>2</div>
                    </div>
                  </div>
                  <div class='box me-4 my-1 bg-light'>
                    {' '}
                    <img
                      src='https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-campus-recreation-university-nebraska-lincoln-30.png'
                      alt=''
                    />
                    <div class='d-flex align-items-center mt-2'>
                      <div class='tag'>Items in Cart</div>
                      <div class='ms-auto number'>10</div>
                    </div>
                  </div>
                  <div class='box me-4 my-1 bg-light'>
                    {' '}
                    <img
                      src='https://www.freepnglogos.com/uploads/love-png/love-png-heart-symbol-wikipedia-11.png'
                      alt=''
                    />
                    <div class='d-flex align-items-center mt-2'>
                      <div class='tag'>Wishlist</div>
                      <div class='ms-auto number'>5</div>
                    </div>
                  </div>
                </div>
                <div class='text-uppercase'>My recent orders</div>
                <br></br>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
export default Myorders
