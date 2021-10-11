import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import TVimage from '../../img/tv.jpg'

const Cart = () => {
  return (
    <Fragment>
      <div className='offcanvas offcanvas-end' id='offcanvasRight'>
        <div className='offcanvas-header'>
          <div id='offcanvasRightLabel' className='w-100'>
            <div className='row border-bottom border-dark'>
              <div className='col'>
                <h4>
                  <b>Shopping Cart</b>
                </h4>
              </div>
              <div className='col-4 align-self-center text-end text-muted pe-4'>
                13 items
              </div>
            </div>
          </div>
          <button
            type='button'
            className='btn-close text-reset'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>
        <div className='offcanvas-body bg-light'>
          {/* cart item */}
          <div className='row border-bottom pb-3'>
            <div className='row main align-items-center'>
              <div className='col-2'>
                <img className='img-fluid' src={TVimage} alt='productimage' />
              </div>
              <div className='col-4'>
                <div className='row text-muted'>Laptop</div>
                <div className='row'>MSI GL65</div>
              </div>
              <div className='col fs-6'>
                <a href='#!' className='text-decoration-none text-dark'>
                  -{' '}
                </a>
                <span>1</span>
                <a href='#!' className='text-decoration-none text-dark'>
                  {' '}
                  +
                </a>
              </div>
              <div className='col-4 text-end'>Rs 247 000.00</div>
            </div>
          </div>
          {/* cart item end */}
          {/* cart item */}
          <div className='row border-bottom pb-3'>
            <div className='row main align-items-center'>
              <div className='col-2'>
                <img className='img-fluid' src={TVimage} alt='productimage' />
              </div>
              <div className='col-4'>
                <div className='row text-muted'>TV</div>
                <div className='row'>Samsung HD LED TV 32"</div>
              </div>
              <div className='col fs-6'>
                <a href='#!' className='text-decoration-none text-dark'>
                  -{' '}
                </a>
                <span>1</span>
                <a href='#!' className='text-decoration-none text-dark'>
                  {' '}
                  +
                </a>
              </div>
              <div className='col-4 text-end'>Rs 84 000.00</div>
            </div>
          </div>
          {/* cart item end */}
          {/* cart item */}
          <div className='row border-bottom pb-3'>
            <div className='row main align-items-center'>
              <div className='col-2'>
                <img className='img-fluid' src={TVimage} alt='productimage' />
              </div>
              <div className='col-4'>
                <div className='row text-muted'>Shirt</div>
                <div className='row'>Cotton T-shirt</div>
              </div>
              <div className='col fs-6'>
                <a href='#!' className='text-decoration-none text-dark'>
                  -{' '}
                </a>
                <span>1</span>
                <a href='#!' className='text-decoration-none text-dark'>
                  {' '}
                  +
                </a>
              </div>
              <div className='col-4 text-end'>Rs 84 000.00</div>
            </div>
          </div>
          {/* cart item end */}
        </div>

        <div className='offcanvas-footer'>
          <div className='row border-top pt-2 p-1 border-dark'>
            <div className='col fw-bold'>TOTAL PRICE</div>
            <div className='col align-self-center text-end text-muted fw-bolder'>
              Rs. 10 232 137.00
            </div>
          </div>
          <div className='row p-2'>
            <div className='col d-flex justify-content-center'>
              <button className='btn btn-dark w-100'>CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Cart
