import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    (config.headers as any)['Authorization'] = `Bearer ${token}`;
    // Debug: log the full Authorization header (remove in production)
    console.log('[Axios] Authorization header:', (config.headers as any)['Authorization']);
  } else {
    console.log('[Axios] No token found in localStorage');
  }
  return config;
}, (error) => {
  console.error('[Axios] Request error:', error);
  return Promise.reject(error);
});

export default api;
