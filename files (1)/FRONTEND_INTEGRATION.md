# 🔗 Frontend Integration Guide

## Connect React App to Backend API

This guide shows you how to integrate the backend API with your EcoWaste React frontend.

---

## Step 1: Install Required Packages

In your **frontend** folder (ecowaste-app):

```bash
cd ecowaste-app

# Install axios for API calls
npm install axios

# Install React Router for navigation
npm install react-router-dom

# Install context API or Redux (optional)
npm install @reduxjs/toolkit react-redux
```

---

## Step 2: Create API Configuration

Create `src/services/api.js`:

```javascript
import axios from 'axios';

// Base URL for API
const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
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

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## Step 3: Create API Service Functions

Create `src/services/wasteService.js`:

```javascript
import api from './api';

const wasteService = {
  // Submit waste request
  submitWasteRequest: async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await api.post('/waste', formData, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user's waste requests
  getMyRequests: async () => {
    try {
      const response = await api.get('/waste/my-requests');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single waste request
  getRequestById: async (id) => {
    try {
      const response = await api.get(`/waste/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete waste request
  deleteRequest: async (id) => {
    try {
      const response = await api.delete(`/waste/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default wasteService;
```

Create `src/services/authService.js`:

```javascript
import api from './api';

const authService = {
  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
```

---

## Step 4: Update Your Main Component

Update `src/App.js` to integrate with backend:

```javascript
import React, { useState, useEffect } from "react";
import wasteService from "./services/wasteService";
import authService from "./services/authService";
// ... (keep all your existing imports)

export default function ModernWasteFoodExchange() {
  // ... (keep all your existing state)
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
    }
  }, []);

  // Updated handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Check if user is authenticated
      if (!isAuthenticated) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      // Create FormData for image upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('phone', formData.phone);
      submitData.append('email', formData.email);
      submitData.append('address', formData.address);
      submitData.append('wasteType', formData.wasteType);
      submitData.append('estimatedWeight', formData.estimatedWeight);
      submitData.append('frequency', formData.frequency);
      submitData.append('paymentMethod', formData.paymentMethod);
      submitData.append('description', formData.description);
      
      if (formData.preferredPickup) {
        submitData.append('preferredPickup', formData.preferredPickup);
      }
      
      if (selectedImage) {
        submitData.append('image', selectedImage);
      }

      // Submit to backend
      const response = await wasteService.submitWasteRequest(submitData);

      if (response.success) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
        
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          wasteType: "",
          estimatedWeight: "",
          description: "",
          preferredPickup: "",
          frequency: "one-time",
          paymentMethod: "bank",
        });
        setSelectedImage(null);
        setImagePreview(null);
      }
    } catch (err) {
      console.error("Error submitting waste request:", err);
      setError(err.message || "Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ... (keep all your existing JSX, but update the submit button)

  // In your form submit button, change to:
  <button
    type="submit"
    disabled={loading}
    className={`w-full bg-gradient-to-r from-emerald-500 to-teal-500 py-4 rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all font-semibold text-lg flex items-center justify-center space-x-2 group ${
      loading ? 'opacity-50 cursor-not-allowed' : ''
    }`}
  >
    <span>{loading ? 'Submitting...' : 'Submit Request'}</span>
    {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
  </button>

  // Add error display above the form:
  {error && (
    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400">
      {error}
    </div>
  )}
}
```

---

## Step 5: Create Login/Register Components

Create `src/components/Login.js`:

```javascript
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import authService from '../services/authService';

export default function Login({ onSuccess, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData);
      if (response.success) {
        onSuccess(response.data);
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-effect rounded-3xl p-8 border border-emerald-500/20 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
        Welcome Back
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 py-3 rounded-xl hover:shadow-xl hover:shadow-emerald-500/50 transition font-semibold flex items-center justify-center space-x-2"
        >
          <span>{loading ? 'Logging in...' : 'Login'}</span>
          {!loading && <ArrowRight className="w-5 h-5" />}
        </button>
      </form>

      <p className="text-center text-sm text-gray-400 mt-4">
        Don't have an account?{' '}
        <button
          onClick={onSwitchToRegister}
          className="text-emerald-400 hover:text-emerald-300 font-semibold"
        >
          Register here
        </button>
      </p>
    </div>
  );
}
```

Create `src/components/Register.js`:

```javascript
import React, { useState } from 'react';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import authService from '../services/authService';

export default function Register({ onSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      const response = await authService.register(userData);
      
      if (response.success) {
        onSuccess(response.data);
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-effect rounded-3xl p-8 border border-emerald-500/20 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
        Create Account
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
              placeholder="+91 98765 43210"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full glass-effect pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-white/10"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 py-3 rounded-xl hover:shadow-xl hover:shadow-emerald-500/50 transition font-semibold flex items-center justify-center space-x-2"
        >
          <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
          {!loading && <ArrowRight className="w-5 h-5" />}
        </button>
      </form>

      <p className="text-center text-sm text-gray-400 mt-4">
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-emerald-400 hover:text-emerald-300 font-semibold"
        >
          Login here
        </button>
      </p>
    </div>
  );
}
```

---

## Step 6: Create Dashboard Component

Create `src/components/Dashboard.js`:

```javascript
import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import wasteService from '../services/wasteService';

export default function Dashboard({ user }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await wasteService.getMyRequests();
      if (response.success) {
        setRequests(response.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-yellow-400 bg-yellow-400/10',
      verified: 'text-blue-400 bg-blue-400/10',
      collected: 'text-purple-400 bg-purple-400/10',
      completed: 'text-green-400 bg-green-400/10',
      cancelled: 'text-red-400 bg-red-400/10',
    };
    return colors[status] || 'text-gray-400 bg-gray-400/10';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-emerald-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="glass-effect p-6 rounded-2xl border border-white/5">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-gray-400">Total Earnings</span>
          </div>
          <p className="text-3xl font-bold">₹{user.totalEarnings || 0}</p>
        </div>

        <div className="glass-effect p-6 rounded-2xl border border-white/5">
          <div className="flex items-center space-x-3 mb-2">
            <Package className="w-5 h-5 text-teal-400" />
            <span className="text-gray-400">Waste Collected</span>
          </div>
          <p className="text-3xl font-bold">{user.totalWasteCollected || 0} kg</p>
        </div>

        <div className="glass-effect p-6 rounded-2xl border border-white/5">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle className="w-5 h-5 text-cyan-400" />
            <span className="text-gray-400">Total Requests</span>
          </div>
          <p className="text-3xl font-bold">{requests.length}</p>
        </div>
      </div>

      {/* Requests Table */}
      <div className="glass-effect rounded-2xl border border-white/5 p-6">
        <h3 className="text-2xl font-bold mb-6">My Requests</h3>

        {requests.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No requests yet. Submit your first waste request!</p>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request._id}
                className="glass-effect p-4 rounded-xl border border-white/5 hover:border-emerald-500/30 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-4xl">{request.wasteType.includes('Vegetable') ? '🥬' : request.wasteType.includes('Fruit') ? '🍎' : '♻️'}</span>
                      <div>
                        <h4 className="font-semibold">{request.wasteType}</h4>
                        <p className="text-sm text-gray-400">{request.estimatedWeight} kg</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{new Date(request.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    {request.totalAmount && (
                      <span className="text-emerald-400 font-bold">₹{request.totalAmount}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## Step 7: Test Everything

### Start Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd ecowaste-app
npm start
```

### Test Flow:
1. ✅ Register new account
2. ✅ Login with credentials
3. ✅ Submit waste request
4. ✅ View requests in dashboard
5. ✅ Check backend database

---

## Common Issues & Solutions

### CORS Error
```javascript
// In backend server.js, update CORS:
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Image Upload Not Working
- Check uploads folder exists in backend
- Verify multer middleware is correct
- Check file size limits

### Token Expired
- Login again to get new token
- Token expires after 30 days (configurable)

---

## Next Steps

1. ✅ Add loading states
2. ✅ Add error handling
3. ✅ Add success messages
4. ✅ Add form validation
5. ✅ Add protected routes
6. ✅ Add logout functionality
7. ✅ Add user profile page

Ready to deploy? Check the DEPLOYMENT_GUIDE.md!
