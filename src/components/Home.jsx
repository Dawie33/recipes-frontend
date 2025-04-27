import React from 'react'
import Footer from './Footer'
import Search from './Search'
import CategoriesList from './categories/CategoriesList'
import RecipeList from './recipe/RecipeList'
import NavBar from './NavBar'
function Home() {
  return (
    <div>
      <div className="h-screen flex flex-col">
        <NavBar />
        <Search />
      </div>

      <CategoriesList />
      <RecipeList />

      <Footer />
    </div>
  )
}

export default Home
