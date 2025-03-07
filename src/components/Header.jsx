import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaBars, FaTimes, FaUser } from 'react-icons/fa'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex  items-center">
        {/* Navigation Desktop */}

        {/* Logo */}
        <div className="flex w-4/12 ">
          <Link to="/" className="text-red-600 font-bold text-2xl ">
            <span className="text-black">Dawie</span> <span className="text-red-600">Recette</span>
          </Link>
        </div>
        <nav className="md:flex w-full space-x-6 text-gray-700 font-medium items-center justify-end ">
          <Link to="/" className="hover:text-red-600">
            Recettes
          </Link>
          <Link to="/videos" className="hover:text-red-600">
            Vidéos
          </Link>
          <Link to="/actualités" className="hover:text-red-600">
            Actualités
          </Link>
          {/* Barre de recherche centrée */}
          <div className="flex items-center ">
            <div className="relative inline-block w-full max-w-lg pr-2">
              <input
                type="text"
                placeholder="Rechercher une recette..."
                className="w-full px-20 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Recherche et icônes */}

            {/* Icônes et Connexion */}
            <div className="flex items-center space-x-4">
              {/* Bouton Connexion */}
              <Link
                to="/login"
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
              >
                <FaUser className="mr-2" />
                Connexion
              </Link>
            </div>
          </div>
        </nav>
        {/* Menu Mobile */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden focus:outline-none">
          {isMenuOpen ? <FaTimes className="w-8 h-8 text-gray-600" /> : <FaBars className="w-8 h-8 text-gray-600" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-white absolute top-16 left-0 w-full shadow-md py-4">
          <nav className="flex flex-col space-y-3 text-center text-gray-700">
            <Link to="/" className="hover:text-red-600 py-2" onClick={() => setIsMenuOpen(false)}>
              Recettes
            </Link>
            <Link to="/videos" className="hover:text-red-600 py-2" onClick={() => setIsMenuOpen(false)}>
              Vidéorecettes
            </Link>
            <Link to="/ingredients" className="hover:text-red-600 py-2" onClick={() => setIsMenuOpen(false)}>
              Ingrédients
            </Link>
            <Link to="/cooking-school" className="hover:text-red-600 py-2" onClick={() => setIsMenuOpen(false)}>
              École de cuisine
            </Link>
            <Link to="/chef" className="hover:text-red-600 py-2" onClick={() => setIsMenuOpen(false)}>
              Chef cuisinier
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
