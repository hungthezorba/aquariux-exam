import axios from 'axios'


export const weatherAxios = axios.create({
  baseURL: import.meta.env.VITE_OPEN_WEATHER_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
})