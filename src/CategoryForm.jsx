import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories } from './api/index'

function CategoryForm() {
  const [category, setCategory] = useState({
    name: '',
    image: null,
  })
  const [fileName, setFileName] = useState('')
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }))
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFileName(file.name)
      setCategory((prevCategory) => ({ ...prevCategory, image: file }))
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', category.name)
    if (category.image) {
      formData.append('image', category.image)
    }
    try {
      const response = await categories.post(formData)
      if (response) {
        setNotification({
          message: 'Catégorie ajoutée avec succès !',
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
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-6 mt-20"
    >
      <fieldset className="border rounded border-orange-500 p-6">
        <legend>
          <h1 className="text-orange-500 text-2xl">Ajouter une catégorie</h1>
        </legend>
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="w-40 text-gray-700 font-semibold">
              Nom de la catégorie
            </label>
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div>
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
          </div>
        </div>
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

      {notification && (
        <div
          className={`p-4 rounded text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {notification.message}
        </div>
      )}
    </form>
  )
}

export default CategoryForm
