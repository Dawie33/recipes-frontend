import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, useAnimation } from 'framer-motion'

export default function Carousel({ list, from, to }) {
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredRecipe, setHoveredRecipe] = useState(null)

  useEffect(() => {
    controls.start({
      x: [from, to],
      transition: { duration: 60, repeat: Infinity, ease: 'linear' },
    })
  }, [controls, from, to])

  useEffect(() => {
    if (isHovered) {
      controls.stop()
    } else {
      controls.start({
        x: [null, to],
        transition: { duration: 40, repeat: Infinity, ease: 'linear' },
      })
      setHoveredRecipe(null)
    }
  }, [isHovered, controls, to])

  return (
    <div
      className="flex overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div animate={controls} className="flex flex-shrink-0 items-center">
        {list.map((recipe, index) => (
          <motion.div
            key={`img-1-${index}`}
            className="relative flex-shrink-0 mx-3 cursor-pointer my-4"
            onMouseEnter={() => setHoveredRecipe(recipe)}
            onMouseLeave={() => setHoveredRecipe(null)}
          >
            <motion.img
              src={`data:image/jpeg;base64,${recipe.image}`}
              alt={recipe.name}
              className="h-16 w-20 rounded-xl object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            {hoveredRecipe === recipe && (
              <motion.div
                className="absolute -bottom-6 left-0 right-0 text-center text-black text-sm bg-white bg-opacity-80 px-1 py-0.5 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {recipe.name}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div animate={controls} className="flex flex-shrink-0 items-center">
        {list.map((recipe, index) => (
          <motion.div
            key={`img-2-${index}`}
            className="relative flex-shrink-0 mx-3 cursor-pointer my-4"
            onMouseEnter={() => setHoveredRecipe(recipe)}
            onMouseLeave={() => setHoveredRecipe(null)}
          >
            <motion.img
              src={`data:image/jpeg;base64,${recipe.image}`}
              alt={recipe.name}
              className="h-16 w-20 rounded-xl object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            {hoveredRecipe === recipe && (
              <motion.div
                className="absolute -bottom-6 left-0 right-0 text-center text-black-600 text-sm bg-white bg-opacity-80 px-1 py-0.5 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {recipe.name}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

Carousel.propTypes = {
  list: PropTypes.array.isRequired,
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
