import NodeApi from '../nodeApi'

const recipes = {
  get: (options) => NodeApi.get('http://localhost:3000/recipes', options),
  getById: (recipeId) => NodeApi.get(`http://localhost:3000/recipe/${recipeId}`),
  post: (options) => NodeApi.post('http://localhost:3000/recipes', options),
  put: (recipeId) => NodeApi.put(`http://localhost:3000/recipe/${recipeId}`),
  delete: (recipeId) => NodeApi.delete(`http://localhost:3000/recipe/${recipeId}`),
}

const ingredients = {
  get: (options) => NodeApi.get('http://localhost:3000/ingredients', options),
}

const categories = {
  get: (options) => NodeApi.get('http://localhost:3000/categories', options),
  post: (options) => NodeApi.post('http://localhost:3000/categories', options),
}

export { recipes, ingredients, categories }
