import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, useAnimation } from 'framer-motion'

// Composant Carousel qui affiche un défilement infini d'images avec effet de zoom au survol.
export default function Carousel({ list, from, to }) {
  // Contrôle l'animation avec Framer Motion
  const controls = useAnimation()

  // State pour détecter le survol du carrousel par la souris
  const [isHovered, setIsHovered] = useState(false)

  // Lance l'animation de défilement dès le montage du composant
  useEffect(() => {
    controls.start({
      x: [from, to], // Animation horizontale de position initiale à position finale
      transition: { duration: 60, repeat: Infinity, ease: 'linear' },
    })
  }, [controls, from, to])

  // Gère l'arrêt et la reprise de l'animation lors du survol
  useEffect(() => {
    if (isHovered) {
      // Arrête immédiatement l'animation lors du survol
      controls.stop()
    } else {
      // Reprend l'animation à partir de la position actuelle lorsqu'on retire la souris
      controls.start({
        x: [null, to],
        transition: { duration: 60, repeat: Infinity, ease: 'linear' },
      })
    }
  }, [isHovered, controls, to])

  return (
    // Container principal du carrousel qui détecte le survol
    <div
      className="flex overflow-hidden"
      onMouseEnter={() => setIsHovered(true)} // Survol détecté
      onMouseLeave={() => setIsHovered(false)} // Fin du survol détectée
    >
      {/* Première série d'images en défilement */}
      <motion.div animate={controls} className="flex flex-shrink-0 items-center">
        {list.map((recipe, index) => (
          <motion.img
            key={`img-1-${index}`}
            src={`data:image/jpeg;base64,${recipe.image}`}
            alt={recipe.name}
            className="h-24 w-32 rounded-xl object-cover mx-3 cursor-pointer my-4"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>

      {/* Deuxième série d'images identique à la première pour créer une boucle continue */}
      <motion.div animate={controls} className="flex flex-shrink-0 items-center">
        {list.map((recipe, index) => (
          <motion.img
            key={`img-2-${index}`}
            src={`data:image/jpeg;base64,${recipe.image}`}
            alt={recipe.name}
            className="h-24 w-32 rounded-xl object-cover mx-3 cursor-pointer my-4"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>
    </div>
  )
}

// Validation des types des props pour éviter des erreurs d'utilisation
Carousel.propTypes = {
  list: PropTypes.array.isRequired, // Liste des images à afficher
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Position initiale de l'animation
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Position finale de l'animation
}
