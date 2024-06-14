import axios from 'axios';
import { APP_API_URL } from '../constant';
import { getUserInfoFromLocalStorage } from './userInfo';

const client = axios.create({
  baseURL: APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config) => {
    const user = getUserInfoFromLocalStorage();
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
      const params = config.params || {};
      params.role = user.role;
      config.params = params;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
