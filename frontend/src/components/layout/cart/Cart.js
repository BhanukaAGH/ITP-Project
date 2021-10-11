import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTotals } from '../../../actions/cart'
import emptyCart from '../../../img/empty-cart.png'

const Cart = ({ cart, getTotals }) => {
  const { cartItems, total, amount } = cart

  useEffect(() => {
    getTotals()
  }, [cartItems])

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
                {amount} items
              </div>
            </div>
          </div>
          <button
            type='button'
            className='btn-close text-reset'
            data-bs-dismiss='offcanvas'
          ></button>
        </div>
        <div className='offcanvas-body bg-light pt-2'>
          {cartItems.length === 0 ? (
            <div className='h-100 d-flex flex-column justify-content-center align-items-center'>
              <img src={emptyCart} alt='empty-cart' className='w-100 pb-2' />
              <p className='fs-1 fw-bold'>Your cart</p>
              <p className='fs-5 text-secondary fw-bold '>
                Your cart is currently empty.
              </p>
            </div>
          ) : (
            cartItems.map((item) => {
              return <CartItem key={item._id} {...item} />
            })
          )}
        </div>

        <div className='offcanvas-footer p-1 position-relative'>
          <div className='row border-top pt-2 border-dark w-100 mx-auto'>
            <div className='col-6 fw-bold'>TOTAL PRICE</div>
            <div className='col-6 align-self-center text-end text-muted fw-bolder'>
              Rs. {total}
            </div>
          </div>
          <div className='row pb-1 p-2 mx-auto'>
            {cartItems.length === 0 ? (
              <button className='btn btn-dark w-100'>CART IS EMPTY</button>
            ) : (
              <Link
                type='button'
                to='/payment'
                className='btn btn-dark w-100'
                data-bs-dismiss='offcanvas'
              >
                CHECKOUT
              </Link>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

Cart.propTypes = {
  getTotals: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  cart: state.cart,
})

export default connect(mapStateToProps, { getTotals })(Cart)
