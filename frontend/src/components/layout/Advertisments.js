import React from 'react'

const Advertisments = ({ add }) => {
  return (
    <div className='border border-dark bg-light border-1'>
      <img src={add.images[0]} className='w-100' alt={add.category} />
    </div>
  )
}

export default Advertisments
