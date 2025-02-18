import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const RecipeCarroussel = ({ recipeList }) => {
  const swiperRef = useRef(null)

  // Dupliquer les slides si nécessaire pour éviter le problème de loop
  const extendedRecipeList = recipeList.length < 5 ? [...recipeList, ...recipeList] : recipeList

  useEffect(() => {
    if (swiperRef.current) {
      setTimeout(() => {
        swiperRef.current.slideNext()
      }, 1000) // Force le premier mouvement pour activer l'autoplay
    }
  }, [])

  return (
    <div className="relative max-w-[90rem] mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-6">Recette de la semaine</h2>
      <div className="relative">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={extendedRecipeList.length > 2}
          slidesPerView="auto"
          speed={1000} // Augmente la fluidité du défilement
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
          modules={[EffectCoverflow, Navigation, Autoplay]}
          className="h-[48rem]"
        >
          {extendedRecipeList.map((recipe, index) => (
            <SwiperSlide key={index} className="w-[37rem] h-[40rem] rounded-2xl overflow-hidden">
              <img
                src={recipe.image ? `data:image/jpeg;base64,${recipe.image}` : '/path/to/default-image.jpg'}
                alt={`Recette ${index}`}
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 text-white text-2xl cursor-pointer z-10">
          <FaChevronLeft className="bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition" size={40} />
        </div>
        <div className="custom-next absolute right-0 top-1/2 -translate-y-1/2 text-white text-2xl cursor-pointer z-10">
          <FaChevronRight className="bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition" size={40} />
        </div>
      </div>
    </div>
  )
}

RecipeCarroussel.propTypes = {
  recipeList: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default RecipeCarroussel
