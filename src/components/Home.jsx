import React from 'react'
import RecipeList from './recipe/RecipeList'
import RecipeCategories from './recipe/RecipeCategories'
import Footer from './Footer'
import IngredientsList from './IngredientsList'
import Header from './Header'

function Home() {
  return (
    <>
      <Header />
      <RecipeList />
      <RecipeCategories />
      <IngredientsList />
      <Footer />
    </>
  )
}

export default Home
