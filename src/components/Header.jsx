import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes, FaUser } from 'react-icons/fa'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-lg" style={{ backgroundColor: '#FFFBF0' }}>
      <div className="container mx-auto px-6 py-4 flex  items-center">
        {/* Navigation Desktop */}

        {/* Logo */}
        <div className="flex w-4/12 ">
          <Link to="/" className="text-black-600 font-bold text-2xl ">
            <span className="text-black-600">Recette</span>
          </Link>
        </div>
        <nav className="md:flex w-full space-x-6 text-black font-medium items-center justify-end ">
          <Link to="/" className="hover:text-red-600">
            Recettes
          </Link>
          <Link to="/ingredients" className="hover:text-red-600 py-2" onClick={() => setIsMenuOpen(false)}>
            Ingrédients
          </Link>
          <Link to="/videos" className="hover:text-red-600">
            Vidéos
          </Link>
          <Link to="/actualités" className="hover:text-red-600">
            Actualités
          </Link>
          {/* Barre de recherche centrée */}
          <div className="flex items-center ">
            {/* Icônes et Connexion */}
            <div className="flex items-center space-x-4">
              {/* Bouton Connexion */}
              <Link
                to="/login"
                className="flex items-center bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-red-700 transition"
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
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
