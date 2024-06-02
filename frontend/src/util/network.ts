import axios from 'axios';
import { APP_API_URL } from '../constant';

const client = axios.create({
  baseURL: APP_API_URL, // set base url
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(config => {
  const token = localStorage.getItem('eduly_id_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default client;
