import axios, { AxiosRequestConfig } from 'axios';
import { APP_API_URL } from '../constant';

const client = axios.create({
  baseURL: APP_API_URL, // set base url
  headers: {
    'Content-Type': 'application/json',
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = async (options: AxiosRequestConfig<any>) => {

  const token = '' // todo: get from cookie or local storage!!!!
  client.defaults.headers.common.Authorization = `Bearer ${token}`;

  return client(options)

};

export default request;