import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaRegHeart } from 'react-icons/fa'
import { recipes } from '../../api/index'

function RecipeList() {
  const [recipeList, setRecipeList] = useState([])
  const [notification, setNotification] = useState(null)

  // Fonction pour récupérer les recettes
  useEffect(() => {
    async function getRecipes() {
      try {
        const response = await recipes.get()
        setRecipeList(response)
      } catch (error) {
        setNotification(error.message)
      }
    }
    getRecipes()
  }, [])

  return (
    <div className=" max-w-full py-20">
      <div className="text-left mt-6 ">
        <h2 className="text-2xl font-extrabold inline-block rounded-md">Les recettes de la semaine</h2>
        <p className=" text-gray-600 mt-1">Découvrez nos suggestions gourmandes et inspirantes pour cette semaine.</p>
      </div>

      {notification && <p className="text-red-500">{notification}</p>}

      <div className="flex gap-6 py-4 ">
        {recipeList.map((recipe) => (
          <RecipeCard key={recipe.recipeId} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

function RecipeCard({ recipe }) {
  const navigate = useNavigate()

  return (
    <div className="w-[18rem] h-[22rem] flex-shrink-0 rounded-2xl overflow-hidden relative shadow-lg transform transition-transform duration-300 hover:scale-105">
      {/* Image de la recette avec onClick */}
      <img
        src={recipe.image ? `data:image/jpeg;base64,${recipe.image}` : '/path/to/default-image.jpg'}
        alt={recipe.name}
        className="w-full h-full object-cover rounded-2xl cursor-pointer"
        onClick={() => navigate(`/recipe/${recipe.recipeId}`)}
      />

      {/* Icône de favori en haut à droite */}
      <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-md cursor-pointer">
        <FaRegHeart className="text-red-500 text-xl" />
      </div>

      {/* Overlay avec le nom de la recette et avis */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <h3 className="text-white text-lg font-semibold">{recipe.name}</h3>
        <div className="flex items-center text-white text-sm mt-1">
          ⭐⭐⭐⭐⭐ <span className="ml-2">4.8/5</span>
        </div>
        <p className="text-white text-xs mt-1">156 avis</p>
      </div>
    </div>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    recipeId: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default RecipeList
