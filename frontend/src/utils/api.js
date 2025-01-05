import axios from 'axios';
import Cookies from 'js-cookie';
import useAuthStore from '../store/authStore';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the session cookie
api.interceptors.request.use(
  (config) => {
    const sessionId = Cookies.get('sessionId');
    if (sessionId) {
      config.headers.Cookie = `sessionId=${sessionId}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to handle navigation
const handleNavigation = (navigate, userRole) => {
    if (userRole === 'main' || userRole === 'sub') {
        navigate('/admin/login');
    } else {
        navigate('/login');
    }
};


// Function to handle API errors
const handleApiError = (error, navigate) => {
    console.error('API Error:', error);
    const logout = useAuthStore.getState().logout;
    const userRole = useAuthStore.getState().userRole;
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
            // Handle unauthorized error (e.g., session expired)
            logout();
            handleNavigation(navigate, userRole);
            return 'Session expired, please log in again.';
        }
        return error.response.data.message || 'An error occurred';
    } else if (error.request) {
        // The request was made but no response was received
        return 'No response from server';
    } else {
        // Something happened in setting up the request that triggered an Error
        return error.message || 'An error occurred';
    }
};

export { api, handleApiError };
