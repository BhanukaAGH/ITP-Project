import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='p-5 bg-dark text-white'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-5 text-start me-3'>
            <h1 className='fs-5'>ABOUT US</h1>
            <p className='py-1'>
              TECH GEAR is the most prestigious Store in Sri Lanka, delivers the
              best experience by providing top-end Technology the industry has
              to offer.
            </p>
            <p className='py-1'>
              Having a creative team of people who understand the art of elite
              system building and maintenance. A real gaming PC must be focused
              on Customization, Our Technical team will assist gamers to build
              their dreaming Monster as per their budget and choices. Our retail
              showroom is an open paradise for gamers where they can feel the
              quality and performance of any component or they can visit our
              dedicated online store.
            </p>
          </div>
          <div className='col text-start me-3'>
            <h1 className='fs-5'>INFORMATION</h1>
            <Link className='py-1' to='/about'>
              About Us
            </Link>
            <p className='py-1'>Our Showroom</p>
            <Link className='py-1' to='/contact'>
              Contact Us
            </Link>
          </div>
          <div className='col text-start me-3'>
            <h1 className='fs-5'>CONTACT US</h1>
            <p className='py-1'>
              <i className='bi bi-geo-alt-fill'></i> #101, LGF Unity Plaza,
              Galle Road, Colombo 04, Sri Lanka.
            </p>
            <p className='py-1'>
              <i className='bi bi-telephone-fill'></i> +94 77 261 3 062 | +94 77
              261 3 063 +94 112 504 072
            </p>
            <p className='py-1'>
              <i className='bi bi-envelope-fill'></i> sales@gamestreet.lk
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
