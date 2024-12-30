import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the authorization header
const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  // You can add more sophisticated error handling here, like showing a notification
  throw error; // Re-throw the error to be caught by the caller
};

export { api, setAuthHeader, handleApiError };
