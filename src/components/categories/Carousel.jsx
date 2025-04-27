import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, useAnimation } from 'framer-motion'

export default function Carousel({ list, from, to }) {
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState(null)

  useEffect(() => {
    controls.start({
      x: [from, to],
      transition: { duration: 40, repeat: Infinity, ease: 'linear' },
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
      setHoveredCategory(null)
    }
  }, [isHovered, controls, to])

  return (
    <div className=" ">
      <div
        className="flex overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={controls}
          className="flex flex-shrink-0 items-center"
        >
          {list?.map((cat, index) => (
            <motion.div
              key={`img-1-${index}`}
              className="relative flex-shrink-0 mx-3 cursor-pointer my-4"
              onMouseEnter={() => setHoveredCategory(cat)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <motion.img
                src={`/categories/${cat.id}/image`}                
                alt={cat.name}
                loading="lazy" 
                className="h-20 w-28 rounded-xl object-cover shadow"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              {hoveredCategory === cat && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 text-center text-black text-sm bg-white bg-opacity-80 px-1 py-0.5 rounded shadow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {cat.name}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          animate={controls}
          className="flex flex-shrink-0 items-center"
        >
          {list?.map((cat, index) => (
            <motion.div
              key={`img-2-${index}`}
            className="flex flex-col items-center flex-shrink-0 mx-3 cursor-pointer my-4 w-28"
              onMouseEnter={() => setHoveredCategory(cat)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <motion.img
                src={`/categories/${cat.id}/image`}
                alt={cat.name}
                loading="lazy" 
                className="h-20 w-28 rounded-xl object-cover shadow"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              {hoveredCategory === cat && (
                <motion.div
                  className="absolute bottom- left-0 ri0ght-0 text-center text-black text-sm bg-white bg-opacity-80 px-1 py-0.5 rounded shadow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {cat.name}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

Carousel.propTypes = {
  list: PropTypes.array.isRequired,
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
