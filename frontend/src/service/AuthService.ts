import { UserInfo } from '../model';
import { httpService } from './HTTPService';

export interface LoginInfo {
  email: string;
  password: string;
  role: string;
}

export interface RegisterInfo {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: string;
}

class AuthService {
  async login(loginInfo: LoginInfo): Promise<UserInfo> {
    const response = await httpService.post<UserInfo>(
      '/auth/v1/login',
      loginInfo
    );
    return response;
  }

  async register(registerInfo: RegisterInfo) {
    const response = await httpService.post('/auth/v1/register', registerInfo);
    return response;
  }

  isLoggedIn() {
    return localStorage.getItem('user') ? true : false;
  }

  logout() {
    localStorage.removeItem('user');
  }
}

const authService = new AuthService();
export { AuthService, authService };
