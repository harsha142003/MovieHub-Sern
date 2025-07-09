import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // Enable sending cookies
});

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

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth services
export const authService = {
    // Registration flow
    sendRegistrationOtp: (data) => api.post('/auth/send-registration-otp', data),
    verifyRegistrationOtp: (data) => api.post('/auth/verify-registration-otp', data),

    // Login
    login: (credentials) => api.post('/auth/login', credentials),

    // OTP management
    resendOtp: (email) => api.post('/auth/resend-otp', { email }),

    // Token verification
    verifyToken: () => api.get('/auth/verify-token'),

    // Logout
    logout: () => {
        localStorage.removeItem('token');
    },
};

// User services
export const userService = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/users/profile', data),
};

export const apiService = {
    // Movies
    getMovies: () => api.get('/movies'),
    getMovie: (id) => api.get(`/movies/${id}`),
    createMovie: (data) => api.post('/movies', data),
    updateMovie: (id, data) => api.put(`/movies/${id}`, data),
    deleteMovie: (id) => api.delete(`/movies/${id}`),

    // Actors
    getActors: () => api.get('/actors'),
    getActor: (id) => api.get(`/actors/${id}`),
    createActor: (data) => api.post('/actors', data),
    updateActor: (id, data) => api.put(`/actors/${id}`, data),
    deleteActor: (id) => api.delete(`/actors/${id}`),

    // Services
    getService: (id) => api.get(`/services/${id}`),

    // Users
    getUsers: () => api.get('/users'),
    updateUser: (id, data) => api.put(`/users/${id}`, data),
    deleteUser: (id) => api.delete(`/users/${id}`),

    // Orders (removed)
    // createOrder: async (orderData) => { ... },
    // getOrders: async () => { ... },
    // getDashboardData: async () => { ... },
    // updateOrderStatus: async (orderId, status) => { ... },

    // Add verifyToken function
    verifyToken: async () => {
        try {
            const response = await api.get('/auth/verify-token');
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Example of adding a new function
    // register: (userData) => api.post('/auth/register', userData),
    // login: (credentials) => api.post('/auth/login', credentials),
    // createOrder: (orderData) => api.post('/api/orders', orderData),
};

export default api; 