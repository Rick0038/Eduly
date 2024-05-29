import axios from 'axios';
import { APP_API_URL } from '../constant';

const edulyApiClient = axios.create({
  baseURL: APP_API_URL, // set base url
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem('eduly_id_token');
edulyApiClient.defaults.headers.common.Authorization = `Bearer ${token}`;

export default edulyApiClient;
