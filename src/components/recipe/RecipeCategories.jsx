import React, { useEffect, useState } from 'react'
import { categories } from '../../api/index'
const RecipeCategories = () => {
  const [list, setList] = useState([])
  const [notification, setNotification] = useState(null)
  const [fetched, setFetched] = useState(false) // Drapeau pour éviter les appels multiples

  // Fonction pour récupérer les recettes
  async function getCategories() {
    try {
      if (!fetched) {
        // Vérifie si les données ont déjà été récupérées
        const response = await categories.get()
        setList(response.rows)
        setFetched(true) // Marque comme récupéré
      }
    } catch (error) {
      setNotification(error.message)
    }
  }

  // Utilisation de useEffect pour exécuter getCategories au montage du composant
  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="flex justify-center">
      <div className="relative max-w-full py-10">
        {/* Bande blanche pour les catégories */}
        <div className="text-left mt-6 ">
          <h2 className="text-2xl font-extrabold inline-block rounded-md">Nos categories de recettes</h2>
        </div>

        <div className="flex flex-wrap  gap-4">
          {list.map((category, index) => (
            <div key={index} className="flex flex-col items-center justify-center w-20 h-24 group cursor-pointer">
              {/* Cercle avec icône */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-white transition-transform duration-300 transform hover:scale-125 hover:rotate-12 hover:shadow-xl ${category.color}`}
              >
                <img
                  src={category.image ? `data:image/jpeg;base64,${category.image}` : '/path/to/default-image.jpg'}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-2xl cursor-pointer"
                />
              </div>

              {/* Texte sous l'icône */}
              <span className="text-xs font-medium text-gray-800 mt-2 transition-all duration-300 group-hover:underline group-hover:text-gray-900">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeCategories
