import React, { useEffect, useState } from 'react'
import { ingredients } from '../api/index'

function IngredientsList() {
  const [ingredientList, setIngredientList] = useState([])
  const [notification, setNotification] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fonction pour récupérer les ingrédients
  useEffect(() => {
    async function getIngredients() {
      try {
        const response = await ingredients.get()
        setIngredientList(response?.rows)
      } catch (error) {
        setNotification(error.message || 'Erreur lors de la récupération des ingrédients')
      } finally {
        setLoading(false) // Fin du chargement
      }
    }

    getIngredients()
  }, [])

  return (
    <div className="border m-1 rounded">
      <h2 className="text-3xl font-extrabold inline-block px-4 py-2 rounded-md">Découvrez tous nos ingrédients</h2>

      <h2></h2>
      <div className="flex items-center">
        {loading && <p className="text-gray-500">Chargement des ingrédients...</p>}

        {notification && <p className="text-red-500">{notification}</p>}

        {!loading && ingredientList.length === 0 && !notification && (
          <p className="text-gray-500">Aucun ingrédient trouvé.</p>
        )}
        {ingredientList.map((ingredient, index) => (
          <div key={index} className=" flex flex-col w-full items-center p-2 border-b border-gray-300">
            <img
              src={ingredient.image ? `data:image/jpeg;base64,${ingredient.image}` : '/path/to/default-image.jpg'}
              alt={ingredient.name}
              className="w-12 h-12 object-cover rounded-full mr-2"
            />
            <div className="flex items-center">
              <span className="font-semibold">{ingredient.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IngredientsList
