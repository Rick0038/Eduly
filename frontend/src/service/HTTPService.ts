import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { APP_API_URL } from '../constant';

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
  }

  private handleRequest(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
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
export { httpService, HTTPService };
