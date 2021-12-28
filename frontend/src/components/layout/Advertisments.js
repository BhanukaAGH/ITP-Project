import React from 'react'

const Advertisments = ({ add }) => {
  return (
    <div className='border border-dark bg-light border-1'>
      <img src={add.images[0]} className='img-fluid' alt={add.category} />
    </div>
  )
}

export default Advertisments
