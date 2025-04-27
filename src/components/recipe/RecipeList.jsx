import React, { useEffect, useState } from 'react'
import { recipes } from '../../api/index'
import RecipeCard from './RecipeCard'

function RecipeList() {
  const [list, setlist] = useState([])
  const [notification, setNotification] = useState(null)

  // Fonction pour récupérer les recettes
  async function getRecipes() {
    try {
      // Vérifie si les données ont déjà été récupérées
      const { rows } = await recipes.get()
      setlist(rows)
    } catch (error) {
      setNotification(error.message)
    }
  }

  // Utilisation de useEffect pour exécuter getRecipes au montage du composant
  useEffect(() => {
    getRecipes()
  }, [])

  return (
    <div className="flex justify-center my-24 bg-[#f9f9f7] py-20 ">
      <RecipeCard list={list} />
      {notification && (
        <div className="text-red-500 text-center mt-4">{notification}</div>
      )}
    </div>
  )
}

export default RecipeList
