import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// Waste Request APIs
export const wasteAPI = {
  createRequest: async (formData) => {
    const response = await api.post('/waste', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getMyRequests: async () => {
    const response = await api.get('/waste/my-requests');
    return response.data;
  },

  getRequest: async (id) => {
    const response = await api.get(`/waste/${id}`);
    return response.data;
  },

  deleteRequest: async (id) => {
    const response = await api.delete(`/waste/${id}`);
    return response.data;
  },

  // Admin APIs
  getAllRequests: async (params = {}) => {
    const response = await api.get('/waste/admin/all', { params });
    return response.data;
  },

  updateStatus: async (id, statusData) => {
    const response = await api.put(`/waste/${id}/status`, statusData);
    return response.data;
  },

  addFeedback: async (id, feedbackData) => {
    const response = await api.post(`/waste/${id}/feedback`, feedbackData);
    return response.data;
  },

  getTestimonials: async () => {
    const response = await api.get('/waste/public/testimonials');
    return response.data;
  },

  toggleFeatured: async (id) => {
    const response = await api.put(`/waste/${id}/feature`);
    return response.data;
  },
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    return { success: false, message: 'API is not reachable' };
  }
};

export default api;
