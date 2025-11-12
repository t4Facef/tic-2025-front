import { API_BASE_URL } from '../config/api';

// Função para obter token de localStorage/sessionStorage (compatível com AuthContext)
const getAuthToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

// Headers padrão com autenticação
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Função genérica para fazer requests autenticadas
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const api = {
  // GET request
  get: (endpoint: string) => apiRequest(endpoint),
  
  // POST request
  post: (endpoint: string, data: unknown) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // PUT request
  put: (endpoint: string, data: unknown) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // DELETE request
  delete: (endpoint: string) => apiRequest(endpoint, {
    method: 'DELETE',
  }),
};