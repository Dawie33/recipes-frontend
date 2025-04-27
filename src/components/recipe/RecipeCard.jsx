import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React from 'react'
import { motion } from 'framer-motion'


const SlideUp = (delay) => ({
  initial: {
    y: '100%',
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: delay,
    },
  },
})

const titleVariants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function RecipeCard({list}) {
  return (
    <div>
      <div className="flex items-center mb-6 justify-between px-6 font-playfair">
        <motion.h2
          variants={titleVariants}
          initial="initial"
          animate="animate"
          className="text-3xl md:text-4xl font-bold text-gray-800  "
        >
          Les recettes de la semaine
        </motion.h2>
        <motion.button
          variants={SlideUp(1)}
          initial="initial"
          animate="animate"
        >
          <Link
            to="/recipes"
            className="text-sm text-orange-600 font-semibold hover:underline"
          >
            Toutes les recettes...
          </Link>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-8">
        {list.map((item) => (
          <motion.div
            key={item.recipeId}
            variants={SlideUp(item.delay)}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center min-h-[400px]"
          >
            {/* Cercle avec image plus grande */}
            <div className="bg-gray-100 rounded-full w-40 h-40 flex items-center justify-center mb-6 overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Titre */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2 font-playfair">
              {item.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-6 px-2">
              {item.description}
            </p>

            {/* Bouton ou lien */}
            <button className="text-sm text-orange-600 font-semibold hover:underline">
              voir la recette
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

RecipeCard.propTypes = {
  list: PropTypes.array.isRequired,
}
