import React, { useEffect, useState } from 'react'
import { recipes } from '../../api/index'
import Carousel from './Carousel'

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
    <div className="flex justify-center mt-24 mb-5 " style={{ backgroundColor: '#FFFBF0' }}>
      <Carousel list={list} />
      {notification && <div className="text-red-500 text-center mt-4">{notification}</div>}
    </div>
  )
}

export default RecipeList
