import axios from 'axios';
import Cookies from 'js-cookie';

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


// Function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
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
