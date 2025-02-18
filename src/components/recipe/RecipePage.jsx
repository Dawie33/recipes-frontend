import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { recipes } from '../../api/index'
import Footer from '../Footer'

function RecipePage() {
  const { id } = useParams()

  const [recipe, setRecipe] = useState(null) // Utiliser `null` comme valeur initiale
  const [notification, setNotification] = useState(null)

  // Fonction pour récupérer une recette par ID
  async function getRecipeById() {
    try {
      const response = await recipes.getById(id) // Passez `id` directement à l'API
      setRecipe(response)
    } catch (error) {
      setNotification(error.message)
    }
  }

  // Effet pour récupérer la recette au montage
  useEffect(() => {
    if (id) {
      getRecipeById()
    }
  }, [id]) // Ajouter `id` comme dépendance

  // Gestion des notifications
  if (notification) {
    return <div className="text-red-500 text-center mt-4">{notification}</div>
  }

  // Affichage d'un état de chargement
  if (!recipe) {
    return <div className="text-center mt-4">Chargement...</div>
  }

  return (
    <>
      <div className="mt-28 mb-20 w-9/12 mx-auto">
        {/* Titre de la recette */}
        <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>

        {/* Image principale */}
        <div
          className="w-full h-96 bg-cover bg-center transition-transform duration-300 border rounded"
          style={{
            backgroundImage: recipe.image
              ? `url(data:image/jpeg;base64,${recipe.image.replace(/\\x/g, '')})`
              : `url(/path/to/default-image.jpg)`,
          }}
        ></div>

        {/* Description */}
        <div className="mt-4 mb-8">{recipe.description}</div>

        {/* Informations générales */}
        <div className="flex justify-around border rounded bg-gray-300 p-4">
          <div className="flex">
            <label className="mr-4 font-semibold">Temps de préparation :</label>
            <div>{recipe.preparationTime} min</div>
          </div>
          <div className="flex">
            <label className="mr-4 font-semibold">Cuisson :</label>
            <div>{recipe.cookingTime} min</div>
          </div>
        </div>

        {/* Section Ingrédients */}
        <h2 className="text-2xl font-semibold mb-4 mt-8 border-b-2 border-black pb-2">Ingrédients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recipe?.ingredients?.map((ingredient, index) => (
            <div key={index} className="flex items-center">
              <img
                src={ingredient.image ? `data:image/jpeg;base64,${ingredient.image}` : '/path/to/default-image.jpg'}
                alt={ingredient.name}
                className="w-12 h-12 object-cover rounded-full mr-2"
              />
              <div className="flex">
                <div>{ingredient.name}</div>

                <div className="mr-2">{ingredient.RecipeIngredient?.quantity}</div>
                <div>{ingredient.unit}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Étapes de préparation */}
        <h2 className="text-2xl font-semibold mb-4 mt-8 border-b-2 border-black pb-2">Étapes de préparation</h2>
        <ol className="list-decimal pl-6">
          {recipe?.instructions?.map((instruction, index) => (
            <li key={index} className="mb-2">
              {instruction.description}
            </li>
          ))}
        </ol>
      </div>
      <Footer />
    </>
  )
}

export default RecipePage
