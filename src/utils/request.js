import axios from 'axios'

const baseURL = import.meta.env.ENV_BASE_API
console.log(import.meta.env)

const instance = axios.create({
  baseURL,
  timeout: 10000,
})

export default instance
