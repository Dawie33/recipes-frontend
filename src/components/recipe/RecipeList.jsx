import React, { useEffect, useState } from 'react'
import { recipes } from '../../api/index'
import RecipeCarroussel from './RecipeCarroussel'

function RecipeList() {
  const [recipeList, setRecipeList] = useState([])
  const [notification, setNotification] = useState(null)
  const [fetched, setFetched] = useState(false) // Drapeau pour éviter les appels multiples

  // Fonction pour récupérer les recettes
  async function getRecipes() {
    try {
      if (!fetched) {
        // Vérifie si les données ont déjà été récupérées
        const response = await recipes.get()
        setRecipeList(response)
        setFetched(true) // Marque comme récupéré
      }
    } catch (error) {
      setNotification(error.message)
    }
  }

  // Utilisation de useEffect pour exécuter getRecipes au montage du composant
  useEffect(() => {
    getRecipes()
  }, [])

  return (
    <div className="flex justify-center w-full ">
      <RecipeCarroussel recipeList={recipeList} />

      {notification && <div className="text-red-500 text-center mt-4">{notification}</div>}
    </div>
  )
}

export default RecipeList
