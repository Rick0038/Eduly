import axios from 'axios';
import { APP_API_URL } from '../constant';

const client = axios.create({
  baseURL: APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const role = localStorage.getItem('role');
    if (role) {
      const params = config.params || {};
      params.role = role;
      config.params = params;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
