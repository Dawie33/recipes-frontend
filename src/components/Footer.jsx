import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Section supérieure */}
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Recipe App</h3>
            <p className="text-sm text-gray-400">Partagez vos recettes favorites avec le monde.</p>
          </div>

          <div className="flex space-x-6">
            {/* Liens de réseaux sociaux */}
            <a href="#" className="text-gray-400 hover:text-white transition duration-300" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Section inférieure */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>&copy; 2024 Recipe App. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
