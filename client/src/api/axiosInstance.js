import axios from 'axios';

// Create a new Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // The address of your backend server
});

export default axiosInstance;