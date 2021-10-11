import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Product from './Product'

// images
import Laptop from '../../../img/laptop.png'
import Tv from '../../../img/tv.png'
import Phone from '../../../img/phone.png'

const Section = ({ category, products }) => {
  const [sImage, setSImage] = useState(null)
  const [sBorder, setSBorder] = useState('')
  useEffect(() => {
    switch (category.toUpperCase()) {
      case 'LAPTOP':
        setSImage(Laptop)
        setSBorder('warning')
        break
      case 'TELEVISION':
        setSImage(Tv)
        setSBorder('primary')
        break
      case 'MOBILE':
        setSImage(Phone)
        setSBorder('danger')
        break

      default:
        break
    }
  }, [])

  const items = products.filter((product) => product.category === category)

  return (
    <section className='p-lg-5 pt-5 pb-5 bg-light'>
      {/* Mobile Screen */}
      <div className='title d-lg-none text-uppercase h1 bg-dark mb-3 p-3 text-light text-center'>
        {category.toUpperCase()}
      </div>
      <div
        className={`container border border-${sBorder} border-5 container-border`}
      >
        {/* Desktop Screen */}
        <div className='row g-4'>
          <div className='col-md-4 d-none d-lg-block'>
            <div className={`row bg-${sBorder} p-5 h-100 d-flex flex-column`}>
              <h2 className='pb-1'>{category.toUpperCase()}</h2>
              <p className='lead'>
                Shop a wide selection of {category}s at affordable prices.
              </p>
              <Link to='/products' className='text-dark text-decoration-none '>
                <span>See All Products </span>
                <i className='bi bi-chevron-right'></i>
              </Link>
              <img src={sImage} alt={category} className='my-auto' />
            </div>
          </div>
          <div className='col-md pt-2 pb-2'>
            <div className='row row-cols-2 row-cols-md-3 g-4'>
              {/* item list */}
              {items.length > 0 ? (
                items
                  .slice(0, 6)
                  .map((item) => <Product key={item._id} item={item} />)
              ) : (
                <h1>Loading</h1>
              )}
              {/* item list end */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section
