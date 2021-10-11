import React from 'react'

import { Card } from 'antd'
import { StarFilled, StarOutlined } from '@ant-design/icons'
import {NavLink} from "react-router-dom";

class Content extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='row m-2'>
        {this.props.products.map((product) => (
          <ProductTile
            _id={product._id}
            productName={product.brand + ' ' + product.model}
            rating={Math.floor(Math.random() * 5) + 1}
            noOfRatings={Math.floor(Math.random() * 1000) + 1}
            price={product.price}
            available={product.available}
            image={product.images[0]}
          />
        ))}
      </div>
    )
  }
}

export function ProductTile(props) {
   //distribute
  const { _id, productName, rating, noOfRatings, price, available, image } = props

  const stars = []

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<StarFilled style={{ color: 'gold' }} />)
    } else {
      stars.push(<StarOutlined style={{ color: 'gold' }} />)
    }
  }

  return (
    <NavLink className='col-md-3 m-1' style={{ width: '250px' }} to={'/product-details/' + _id}>
      <Card
        size='small'
        hoverable
        cover={
          <img
            alt='image'
            src={image}
            style={{ height: '150px', objectFit: 'cover' }}
          />
        }
      >
        <h6 className='mb-1'>{productName}</h6>
        <div className='row d-flex flex-row mb-2'>
          <div className='col-5'>{stars}</div>
          <div className='text-info col mx-0 px-0' style={{ marginTop: '3px' }}>
            {noOfRatings} Ratings
          </div>
        </div>
        <h6 className='text-secondary'>Rs.{price}/=</h6>
        <p className='text-danger mb-0'>
          {available < 20 ? <span>Only {available} left in stock</span> : <></>}
        </p>
      </Card>
    </NavLink>
  )
}

export default Content
