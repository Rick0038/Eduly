import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { APP_API_URL } from '../constant';
import {
  clearUserInfoFromLocalStorage,
  getUserInfoFromLocalStorage,
} from '../util/userInfo';

class HTTPService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: APP_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      this.handleRequest.bind(this),
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      this.handleResponseError.bind(this)
    );
  }

  private handleRequest(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    const user = getUserInfoFromLocalStorage();
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  }

  private handleResponseError(error: AxiosError): Promise<never> {
    if (error.response && error.response.status === 401) {
      clearUserInfoFromLocalStorage();
      const pageRedirect = window.location.pathname;
      window.location.href = `/login?redirect=${pageRedirect}`;
    }
    return Promise.reject(error);
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get<T>(url, config).then((response) => response.data);
  }

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.client
      .post<T>(url, data, config)
      .then((response) => response.data);
  }

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.client
      .put<T>(url, data, config)
      .then((response) => response.data);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete<T>(url, config).then((response) => response.data);
  }
}

const httpService = new HTTPService();
export { HTTPService, httpService };
