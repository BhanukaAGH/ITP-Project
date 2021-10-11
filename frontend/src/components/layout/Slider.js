import React, { useRef, useState } from 'react'
import image1 from '../../img/1.jpg'
import image2 from '../../img/2.jpg'
import image3 from '../../img/3.jpg'
import image4 from '../../img/4.jpg'
import image5 from '../../img/5.jpg'
import image6 from '../../img/6.jpg'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core'

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation])

const Slider = () => {
  return (
    <div className='slider'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className='mySwiper'
      >
        <SwiperSlide>
          <img src={image1} alt='image1' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image2} alt='image2' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image3} alt='image3' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image4} alt='image4' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image5} alt='image5' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image6} alt='image6' />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Slider
