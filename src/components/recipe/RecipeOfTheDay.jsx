import React, { useState, useEffect, useRef } from 'react'
import { FaUtensils } from 'react-icons/fa'
import { recipes } from '../../api/index'

const RecipeOfTheDay = () => {
  const [recipe, setRecipe] = useState(null)
  const [notification, setNotification] = useState(null)
  const hasFetched = useRef(false) //  Vérifie si la requête a déjà été faite

  useEffect(() => {
    if (hasFetched.current) return //  Empêche le deuxième appel

    const getRecipe = async () => {
      try {
        const response = await recipes.getRandom()
        setRecipe(response)
      } catch (error) {
        setNotification(error.message)
      }
    }

    getRecipe()
    hasFetched.current = true //  Marque que l’appel a été fait
  }, [])

  if (!recipe) return <p className="text-center">Aucune recette trouvée</p>

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row mt-20">
      <div className="w-full md:w-1/3">
        <img
          src={recipe.image ? `data:image/jpeg;base64,${recipe.image}` : '/path/to/default-image.jpg'}
          alt={recipe.name}
          className="w-full h-64 md:h-full object-cover"
        />
      </div>
      {notification && <p className="text-red-500">{notification}</p>}
      <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{recipe.name}</h2>
          <p className="text-gray-600 mt-2">{recipe.description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {recipe.categories?.map((category, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-2"
            >
              <FaUtensils />
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeOfTheDay
