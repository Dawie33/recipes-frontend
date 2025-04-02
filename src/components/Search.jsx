import { FaSearch } from 'react-icons/fa'
import React from 'react'
import BgImage from '../assets/images/ChatGPT Image 31 mars 2025, 10_38_48.png'
import { motion } from 'framer-motion'

function Search() {
  return (
    <div
      className="flex justify-center flex-col items-center px-4 py-24 bg-cover bg-center h-full"
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
    >
      <motion.div
        className="bg-white bg-opacity-80 p-10 rounded-xl shadow-md text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.p
          className="text-lg text-gray-600 mb-2 italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Des recettes simples pour des saveurs inoubliables
        </motion.p>

        <motion.h1
          className="text-6xl font-bold text-black mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          La Cuisine, un jeu d'enfant !
        </motion.h1>

        <motion.div
          className="flex w-full max-w-4xl overflow-hidden rounded-full border shadow-sm bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center px-4">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une recette..."
            className="flex-grow py-2 px-2 focus:outline-none text-base"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 text-sm hover:bg-red-700 transition"
          >
            Rechercher
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Search
