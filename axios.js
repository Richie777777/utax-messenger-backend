import axios from 'axios'

const token = '7917403316:AAGvI4WMUMQB3CzASZX0z6kd9TVyhn4HlaY'



const BASE_URL = 'http://37.60.243.79:3000'
const API_URL = `https://api.telegram.org/bot${token}`

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    admin: '858063187',
  },
})

export const telegramApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
