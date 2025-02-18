import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import RecipeForm from './RecipeForm'
import Home from './components/Home'
import RecipePage from './components/recipe/RecipePage'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Home />} />
        {/* Route pour le formulaire d'ajout de recette */}
        <Route path="/add-recipes" element={<RecipeForm />} />
        {/* Route pour afficher ma page de recette */}
        <Route path="/recipes/:id" element={<RecipePage />} />
      </Routes>
    </Router>
  )
}

export default App
