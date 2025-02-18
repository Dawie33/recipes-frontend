import React, { useEffect, useState } from 'react'
import { ingredients } from '../api/index'

function IngredientsList() {
  const [ingredientList, setIngredientList] = useState([])
  const [notification, setNotification] = useState(null)
  const [fetched, setFetched] = useState(false) // Drapeau pour éviter les appels multiples

  // Fonction pour récupérer les recettes
  async function getIngredients() {
    try {
      if (!fetched) {
        // Vérifie si les données ont déjà été récupérées
        const response = await ingredients.get()
        setIngredientList(response)
        setFetched(true) // Marque comme récupéré
      }
    } catch (error) {
      setNotification(error.message)
    }
  }

  useEffect(() => {
    getIngredients()
  }, [])

  return <></>
}

export default IngredientsList
