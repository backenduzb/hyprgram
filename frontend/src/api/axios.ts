import axios from 'axios';
import { authService } from '../services/auth.service';

const api = axios.create({
  baseURL: 'http://localhost:8000/accounts/api',
});

api.interceptors.request.use(config => {
  const authHeader = authService.getAuthHeader();
  if (authHeader) {
    config.headers.Authorization = authHeader.Authorization;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
        const response = await axios.post(`${originalRequest.baseURL}/auth/token/refresh/`, {
          refresh: tokens.refresh,
        });
        
        localStorage.setItem('tokens', JSON.stringify({
          ...tokens,
          access: response.data.access,
        }));
        
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (err) {
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;