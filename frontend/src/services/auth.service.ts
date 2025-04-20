import axios from 'axios';
import { LoginData, RegisterData, AuthResponse } from '../types/auth';

const API_URL = 'http://localhost:8000/accounts/api/auth';

const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/register/`, data);
  return response.data;
};

const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login/`, data);
  if (response.data.tokens) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
  }
  return response.data;
};

const logout = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('tokens');
  // Agar kerak bo'lsa, backendga logout request yuborish mumkin
  // await axios.post(`${API_URL}/logout/`);
};

const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const getAuthHeader = (): { Authorization: string } | null => {
  const tokens = localStorage.getItem('tokens');
  if (!tokens) return null;
  
  const { access } = JSON.parse(tokens);
  return { Authorization: `Bearer ${access}` };
};

export const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getAuthHeader,
};