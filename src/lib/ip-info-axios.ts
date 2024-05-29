import axios from 'axios'


export const ipInfoAxios = axios.create({
  baseURL: import.meta.env.VITE_IP_INFO_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
})