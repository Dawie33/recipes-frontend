import React, { useEffect, useState } from 'react'
import { categories } from '../../api/index'
import Carousel from './Carousel'

const CategoriesList = () => {
  const [list, setList] = useState([])
  const [notification, setNotification] = useState(null)
  const [fetched, setFetched] = useState(false) // Drapeau pour éviter les appels multiples

  // Fonction pour récupérer les catégories
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

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="container mx-auto  ">
      <h2 className="font-extrabold inline-block  py-2 ">Nos catégories de recettes</h2>
      <Carousel list={[...list, ...list]} from={0} to={'-100%'} />
      {notification && <div className="text-red-500 text-center mt-4">{notification}</div>}
    </div>
  )
}

export default CategoriesList
