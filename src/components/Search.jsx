import { FaSearch } from 'react-icons/fa'
import React from 'react'
function Search() {
  return (
    <div className="my-20 flex justify-center flex-col items-center px-4 py-12" style={{ backgroundColor: '#FFFBF0' }}>
      <p className="text-lg text-gray-600 mb-2 italic">Des recettes simples pour des saveurs inoubliables</p>
      <h1 className="text-6xl font-bold text-black-600 mb-8">La Cuisine, un jeu d'enfant !</h1>

      <div className="flex w-full max-w-4xl overflow-hidden rounded-full border shadow-sm">
        <div className="flex items-center px-4">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Rechercher une recette..."
          className="flex-grow py-2 px-2 focus:outline-none text-base"
        />
        <button type="submit" className="bg-black text-white px-6 text-sm hover:bg-red-700 transition">
          Rechercher
        </button>
      </div>
    </div>
  )
}

export default Search
