import axios from 'axios'
import Config from 'react-native-config'

const api = axios.create({
  // baseURL: Config.API_URL,
})

api.interceptors.request.use(async ({ headers, ...config }) => {
  return {
    ...config,
    headers: {
      ...headers
    }
  }
})

api.interceptors.response.use(
  response => response?.data,
  err => Promise.reject(err?.response?.data)
)

export default api
