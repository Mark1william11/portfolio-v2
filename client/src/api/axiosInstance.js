import axios from 'axios';

// Determine the base URL based on the environment
const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://portfolio-v2-two-sigma-90.vercel.app' // Your live Vercel URL
  : 'http://localhost:8080';                     // Your local development URL

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;