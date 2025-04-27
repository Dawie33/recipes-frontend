import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { recipes } from './api/index'
import { categories } from '../src/api/index'
import Select from 'react-select'
import { useForm, Controller, useFieldArray } from 'react-hook-form';

function RecipeForm() {

  const { control, handleSubmit, register, setValue, getValues } = useForm({
    defaultValues: {
      name: '',
      description: '',
      cookingTime: '',
      preparationTime: '',
      categoryIds: [], 
      ingredients: [{ name: '', quantity: '', unit: '', image: null }],
      instructions: [{ description: '' }],
      image: null,
    },
  });

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control,
    name: "instructions",
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: "ingredients",
  });
  

  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()
  const [list, setList] = useState([])


  // Fonction pour récupérer les recettes
  async function getCategories() {
    try {
      if (list.length === 0) {
        const response = await categories.get()
        if (response.rows) {
          const formattedCategories = response.rows.map((cat) => ({
            value: cat.id, 
            label: cat.name, 
          }))

          setList(formattedCategories)
        }
      }
    } catch (error) {
      setNotification(error.message)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const onSubmit = async (data) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('cookingTime', data.cookingTime)
    formData.append('preparationTime', data.preparationTime)
    data.categoryIds.forEach((categoryId, index) => {
      formData.append(`categoryIds[${index}]`, categoryId);
    })
    data.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][name]`, ingredient.name);
      formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
      formData.append(`ingredients[${index}][unit]`, ingredient.unit);
      if (ingredient.image) {
        formData.append(`ingredients[${index}][image]`, ingredient.image);
      }
    });
        
    data.instructions.forEach((instruction, index) => {
      formData.append(`instructions[${index}][step]`, index + 1)
      formData.append(
        `instructions[${index}][description]`,
        instruction.description,
      )
    })

    if (data.image) {
      formData.append('image', data.image)
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
     <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6 mt-20">

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
                  {...register('name', { required: true })}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-gray-700 font-semibold">
                  Temps de cuisson
                </label>
                <input
                  type="text"
                  {...register('cookingTime', { required: true })}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-gray-700 font-semibold">
                  Temps de préparation
                </label>
                <input
                  type="text"
                  {...register('preparationTime', { required: true })}
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
                <Controller
                  name="categoryIds"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={list}
                      placeholder="Choisissez des catégories"
                      isClearable
                      value={list.filter(option => (field.value || []).includes(option.value))} 
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
                        field.onChange(selectedValues);
                      }}
                    />
                  )}
                />

              </div>
              <div className="flex items-center">
                <label className="w-40 text-gray-700 font-semibold">
                  Description
                </label>
                <textarea
                  {...register('description', { required: true })}
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
              onClick={() => appendIngredient({id: '', name: '', quantity: '', unit: '', image: null })}
              className="bg-orange-500 text-white p-2 rounded my-2"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" /> Ajouter un
              ingrédient
            </button>
            <div className="space-y-2">
              {ingredientFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-5 gap-2 items-center">
                  <input
                    type="text"
                    {...register(`ingredients.${index}.name`, { required: true })}
                    placeholder="Nom"
                    className="border border-gray-300 rounded p-2"
                  />
                  <input
                    type="text"
                    {...register(`ingredients.${index}.quantity`, { required: true })}
                    placeholder="Quantité"
                    className="border border-gray-300 rounded p-2"
                  />
                  <input
                    type="text"
                    {...register(`ingredients.${index}.unit`, { required: true })}
                    placeholder="Unité (g, ml, pcs)"
                    className="border border-gray-300 rounded p-2"
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setValue(`ingredients.${index}.image`, file);
                        }
                      }}
                      className="text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
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
              onClick={() => appendInstruction({ description: '' })}
              className="bg-orange-500 text-white p-2 rounded my-2"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" /> Ajouter une
              instruction
            </button>
            <div className="space-y-2">
              {instructionFields.map((field, index) => (
                <div key={field.id} className="flex space-x-2 items-center">
                  <textarea
                    {...register(`instructions.${index}.description`, { required: true })}
                    placeholder={`Étape ${index + 1}`}
                    className="border border-gray-300 rounded p-2 flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
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
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue('image', file);  // Stocker dans react-hook-form
                  }
                }}
                className="block p-2 border rounded"
              />
              {getValues('image') && (
                <p className="text-sm text-gray-600">
                  Fichier sélectionné : {getValues('image').name}
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
