import axios from 'axios'

// Centralized Axios client: replace baseURL and add auth interceptors when API is ready.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})
