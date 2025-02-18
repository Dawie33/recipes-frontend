import React from 'react'
import { FaUtensils, FaPizzaSlice, FaIceCream, FaHome, FaMugHot, FaLeaf, FaClock } from 'react-icons/fa'

const RecipeCategories = () => {
  const categories = [
    { icon: <FaClock />, label: 'Rapide', color: 'bg-yellow-500' },
    { icon: <FaHome />, label: 'Famille', color: 'bg-blue-500' },
    { icon: <FaUtensils />, label: 'Calories smart', color: 'bg-purple-500' },
    { icon: <FaPizzaSlice />, label: 'Plats', color: 'bg-red-500' },
    { icon: <FaIceCream />, label: 'Desserts', color: 'bg-pink-500' },
    { icon: <FaLeaf />, label: 'Végétarien', color: 'bg-green-500' },
    { icon: <FaMugHot />, label: 'Apéritifs', color: 'bg-orange-500' },
  ]

  const backgroundImage = 'src/assets/images/backgroundImage.webp'

  return (
    <div className="relative h-screen bg-cover bg-[40%_100%]" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Contenu superposé */}
      <div className="relative z-10 flex flex-col justify-between h-full text-white">
        {/* Header */}
        <div className="flex flex-col items-center pt-10">
          <div className="absolute bottom-80 left-1/2 transform -translate-x-1/2 text-center">
            <h1 className="text-4xl font-bold mb-2">Bienvenue sur Nos Recettes</h1>
            <p className="text-lg">Explorez nos inspirations thématiques et découvrez de nouvelles saveurs</p>
          </div>
        </div>

        {/* Bande blanche pour les catégories */}
        <div className="bg-white rounded-t-3xl w-9/12 mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center justify-center w-20 h-24 group cursor-pointer">
                {/* Cercle avec icône */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-white transition-transform duration-300 transform hover:scale-125 hover:rotate-12 hover:shadow-xl ${category.color}`}
                >
                  <div className="text-2xl">{category.icon}</div>
                </div>

                {/* Texte sous l'icône */}
                <span className="text-xs font-medium text-gray-800 mt-2 transition-all duration-300 group-hover:underline group-hover:text-gray-900">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCategories
