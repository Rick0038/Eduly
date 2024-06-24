import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { APP_API_URL } from '../constant';
import { getUserInfoFromLocalStorage } from '../util/userInfo';

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
    const user = getUserInfoFromLocalStorage();
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
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
export { HTTPService, httpService };
