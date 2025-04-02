import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { recipes } from './api/index'
import { categories } from '../src/api/index'
import Select from 'react-select'

function RecipeForm() {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    cookingTime: '',
    preparationTime: '',
    category: '',
    ingredients: [{ name: '', quantity: '' }],
    instructions: [{ description: '' }],
    image: null,
  })
  const [fileName, setFileName] = useState('')
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [list, setList] = useState([])
  const [fetched, setFetched] = useState(false) // Drapeau pour éviter les appels multiples

  const handleChange = (event) => {
    const { name, value } = event.target
    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }))
  }

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target
    const updatedIngredients = [...recipe.ingredients]
    updatedIngredients[index][name] = value
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients,
    }))
  }

  const handleInstructionChange = (index, event) => {
    const value = event.target.value
    const updatedInstructions = [...recipe.instructions]
    updatedInstructions[index].description = value
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: updatedInstructions,
    }))
  }
  const handleIngredientImageChange = (index, event) => {
    const file = event.target.files[0]
    if (file) {
      const updatedIngredients = [...recipe.ingredients]
      updatedIngredients[index].image = file
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        ingredients: updatedIngredients,
      }))
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFileName(file.name)
      setRecipe((prevRecipe) => ({ ...prevRecipe, image: file }))
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const addIngredientField = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, { name: '', quantity: '' }],
    }))
  }

  const removeIngredientField = (index) => {
    const updatedIngredients = [...recipe.ingredients]
    updatedIngredients.splice(index, 1)
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients,
    }))
  }

  const removeInstructionField = (index) => {
    const updatedInstructions = [...recipe.instructions]
    updatedInstructions.splice(index, 1)
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: updatedInstructions,
    }))
  }

  const addInstructionField = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: [...prevRecipe.instructions, { description: '' }],
    }))
  }

  // Fonction pour récupérer les recettes
  async function getCategories() {
    try {
      if (!fetched) {
        const response = await categories.get()
        if (response.rows) {
          // ✅ Convertir en format { value, label } pour react-select
          const formattedCategories = response.rows.map((cat) => ({
            value: cat.categoryId, // Assurez-vous que `id` existe dans l'API
            label: cat.name, // Assurez-vous que `name` existe dans l'API
          }))

          setList(formattedCategories)
          setFetched(true)
        }
      }
    } catch (error) {
      setNotification(error.message)
    }
  }
  useEffect(() => {
    getCategories()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', recipe.name)
    formData.append('description', recipe.description)
    formData.append('cookingTime', recipe.cookingTime)
    formData.append('preparationTime', recipe.preparationTime)
    formData.append('category', recipe.category)

    recipe.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][name]`, ingredient.name)
      formData.append(`ingredients[${index}][quantity]`, ingredient.quantity)
      formData.append(`ingredients[${index}][unit]`, ingredient.unit)
      if (ingredient.image) {
        formData.append(`ingredients[${index}][image]`, ingredient.image)
      }
    })

    recipe.instructions.forEach((instruction, index) => {
      formData.append(`instructions[${index}][step]`, index + 1)
      formData.append(
        `instructions[${index}][description]`,
        instruction.description,
      )
    })

    if (recipe.image) {
      formData.append('image', recipe.image)
    }
    try {
      const response = await recipes.post(formData)

      if (response) {
        setNotification({
          message: 'Recette créée avec succès !',
          type: 'success',
        })
        navigate('/')
      }
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-6 mt-20"
      >
        <fieldset className="border rounded border-orange-500 p-6">
          <legend>
            <h1 className="text-orange-500 text-2xl">Ajouter une recette</h1>
          </legend>
          <div className="grid grid-cols-2 gap-4">
            {/* Informations générales */}
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-40 text-gray-700 font-semibold">
                  Nom de la recette
                </label>
                <input
                  type="text"
                  name="name"
                  value={recipe.name}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-gray-700 font-semibold">
                  Temps de cuisson
                </label>
                <input
                  type="text"
                  name="cookingTime"
                  value={recipe.cookingTime}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-gray-700 font-semibold">
                  Temps de préparation
                </label>
                <input
                  type="text"
                  name="preparationTime"
                  value={recipe.preparationTime}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
            </div>

            {/* Description et catégorie */}
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-40 text-gray-700 font-semibold">
                  Catégorie
                </label>
                <Select
                  options={list} // ✅ Utilise `list` correctement
                  value={list.find((c) => c.value === recipe.category)} // ✅ Récupère la valeur sélectionnée
                  onChange={(selectedOption) =>
                    setRecipe({ ...recipe, category: selectedOption.value })
                  } // ✅ Met à jour la catégorie
                  placeholder="Choisissez une catégorie"
                  isClearable
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-gray-700 font-semibold">
                  Description
                </label>
                <textarea
                  name="description"
                  value={recipe.description}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded p-2 w-full h-24"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Ingrédients */}
          <section>
            <h2 className="text-lg font-bold mb-2">Ingrédients</h2>
            <button
              type="button"
              onClick={addIngredientField}
              className="bg-orange-500 text-white p-2 rounded my-2"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" /> Ajouter un
              ingrédient
            </button>
            <div className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-2 items-center"
                >
                  <input
                    type="text"
                    name="name"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, e)}
                    placeholder="Nom"
                    className="border border-gray-300 rounded p-2"
                  />
                  <input
                    type="text"
                    name="quantity"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, e)}
                    placeholder="Quantité"
                    className="border border-gray-300 rounded p-2"
                  />
                  <input
                    type="text"
                    name="unit"
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, e)}
                    placeholder="Unité (g, ml, pcs)"
                    className="border border-gray-300 rounded p-2"
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleIngredientImageChange(index, e)}
                      className="text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeIngredientField(index)}
                    className="text-red-500"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Instructions */}
          <section>
            <h2 className="text-lg font-bold mb-2">Instructions</h2>
            <button
              type="button"
              onClick={addInstructionField}
              className="bg-orange-500 text-white p-2 rounded my-2"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" /> Ajouter une
              instruction
            </button>
            <div className="space-y-2">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="flex space-x-2 items-center">
                  <textarea
                    value={instruction.description}
                    onChange={(e) => handleInstructionChange(index, e)}
                    placeholder={`Étape ${index + 1}`}
                    className="border border-gray-300 rounded p-2 flex-1"
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => removeInstructionField(index)}
                    className="text-red-500"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Image */}
          <section>
            <h2 className="text-lg font-bold mb-2">Image</h2>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded"
                onClick={handleUploadClick}
              >
                Upload Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {fileName && (
                <p className="text-sm text-gray-600">
                  Fichier sélectionné : {fileName}
                </p>
              )}
            </div>
          </section>
        </fieldset>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Valider
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Quitter
          </button>
        </div>
      </form>

      {notification && (
        <div
          className={`p-4 rounded text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {notification.message}
        </div>
      )}
    </>
  )
}

export default RecipeForm
