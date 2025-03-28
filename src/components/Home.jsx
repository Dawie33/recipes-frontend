import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Search from './Search'
import CategoriesList from './categories/CategoriesList'
import RecipeList from './recipe/RecipeList'
function Home() {
  return (
    <div>
      <Header />
      <Search />
      <RecipeList />
      <CategoriesList />

      <Footer />
    </div>
  )
}

export default Home
