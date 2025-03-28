import React from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Carousel({ list }) {
  return (
    <Swiper
      modules={[EffectCoverflow, Navigation, Pagination]}
      effect="coverflow"
      pagination={{ clickable: true }}
      navigation={true}
      speed={1000}
      slidesPerView={'auto'}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      className="w-full h-[400px]"
    >
      {list && list.length > 0 ? (
        list.map((recipe, index) => (
          <SwiperSlide key={index} className="w-[300px] flex justify-center items-center">
            <img
              src={`data:image/jpeg;base64,${recipe.image}`}
              alt={recipe.name}
              className="rounded-2xl shadow-lg object-cover w-full h-full"
            />
          </SwiperSlide>
        ))
      ) : (
        <div className="text-center">Aucune recette à afficher</div>
      )}
    </Swiper>
  )
}

Carousel.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
}
