/**
 * nodeApi
 * @param {string} url
 * @param {object} data
 * @returns {Promise}
 */

const nodeApi = {
  get: async (url, data = {}) => {
    if (!url) {
      throw new Error('url is required')
    }
    console.log(url, data)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json()
    return result
  },
  post: async (url, data = {}) => {
    if (!url) {
      throw new Error('url is required')
    }

    const options = {
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
    }

    // Ajout conditionnel du Content-Type
    if (!(data instanceof FormData)) {
      options.headers = {
        'Content-Type': 'application/json',
      }
    }

    const response = await fetch(url, options)
    const result = await response.json()
    return result
  },

  put: async (url, data = {}) => {
    if (!url) {
      throw new Error('url is required')
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    return result
  },

  delete: async (url, data = {}) => {
    if (!url) {
      throw new Error('url is required')
    }

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    return result
  },
}

export default nodeApi
