import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RecipeForm from './RecipeForm'
import Home from './components/Home'
import RecipePage from './components/recipe/RecipePage'
import CategoryForm from './CategoryForm'

function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Home />} />
        {/* Route pour le formulaire d'ajout de recette */}
        <Route path="/add-recipes" element={<RecipeForm />} />
        {/* Route pour afficher ma page de recette */}
        <Route path="/recipe/:id" element={<RecipePage />} />
        {/* Route pour afficher ma page de recette */}
        <Route path="/add-categories" element={<CategoryForm />} />
      </Routes>
    </Router>
  )
}

export default App
