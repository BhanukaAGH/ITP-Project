import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart } from '../../../actions/cart'
import { Link } from 'react-router-dom'

const Product = ({ item, addToCart }) => {
  const { model, images, brand, price } = item

  const addCart = (Item) => {
    addToCart({ ...Item, amount: 1 })
  }

  return (
    <div className='col-6 col-md-4'>
      
      <div className='card card-hover h-100'>
      <Link to={`/product-details/${item._id}`}>
        <img src={images[0]} className='card-img-top' alt={model} />
        </Link>

        <div className='card-body d-flex flex-column justify-content-between'>
        <Link to={`/product-details/${item._id}`}>
          <p className='card-title fs-6 fw-bold '>{model}</p>
          <h6 className='card-title'>Rs. {price}</h6>
          <p className='card-text mb-0'> {brand}</p>
          </Link>
          <div className='d-flex justify-content-end'>
            <span
              role='button'
              className='circle-icon'
              onClick={() => addCart(item)}
            >
              <i className='bi bi-cart-plus'></i>
            </span>
          </div>
        </div>
      </div>
      
    </div>
  )
}

Product.propTypes = {
  addToCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  cart: state.cart,
})

export default connect(mapStateToProps, { addToCart })(Product)
