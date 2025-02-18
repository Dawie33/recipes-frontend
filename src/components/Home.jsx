import React from 'react'
import RecipeList from './recipe/RecipeList'
import RecipeCategories from './recipe/RecipeCategories'
import Footer from './Footer'
import IngredientsList from './IngredientsList'

function Home() {
  return (
    <>
      <RecipeCategories />
      <RecipeList />
      <IngredientsList />
      <Footer />
    </>
  )
}

export default Home
