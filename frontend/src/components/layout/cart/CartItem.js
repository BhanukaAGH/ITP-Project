import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { remove, toggleAmount } from '../../../actions/cart'

const CartItem = ({
  _id,
  type,
  model,
  images,
  brand,
  price,
  amount,
  remove,
  toggleAmount,
}) => {
  return (
    <div className='row border-bottom p-2 align-items-center'>
      <div className='col-3 ps-0 pe-2'>
        <img className='img-fluid' src={images[0]} alt={model} />
      </div>
      <div className='col-8'>
        <div className='row '>{brand}</div>
        <div className='row'>{model}</div>
        <div className='row'>Rs {price}</div>
        <div
          className='row text-muted'
          role='button'
          onClick={() => remove(_id)}
        >
          remove
        </div>
      </div>
      <div className='col-1 p-0 d-flex flex-column'>
        <div
          role='button'
          className='mx-auto'
          onClick={() => toggleAmount(_id, 'inc')}
        >
          +{' '}
        </div>
        <div className='mx-auto'>{amount}</div>
        <div
          role='button'
          className='mx-auto'
          onClick={() => toggleAmount(_id, 'dec')}
        >
          {' '}
          -
        </div>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  remove: PropTypes.func.isRequired,
  toggleAmount: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  cart: state.cart,
})

export default connect(mapStateToProps, { remove, toggleAmount })(CartItem)
