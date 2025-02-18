import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-gray-600 hover:text-black">
          <h1 className="text-2xl font-bold">Mes recettes de cuisine</h1>
        </a>

        <div className="flex items-center ml-auto">
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FaSearch className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Rechercher une recette"
                className="px-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`focus:outline-none transform transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
            >
              {isMenuOpen ? (
                <FaTimes className="w-8 h-8 text-gray-600" />
              ) : (
                <FaBars className="w-8 h-8 text-gray-600" />
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="bg-white absolute right-0 top-16 w-screen h-60 p-4 shadow-lg">
          <a href="/" className="block px-4 py-2 text-bold-800 hover:text-black">
            Catégories
          </a>
          <Link
            to="/add-recipes"
            className="block px-4 py-2 text-gray-600 hover:text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            Ajouter une recette
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
