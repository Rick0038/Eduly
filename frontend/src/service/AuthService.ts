import { httpService } from './HTTPService';
import { ROLE } from '../constant';
import { UserInfo } from '../model';
import { getUserInfoFromLocalStorage } from '../util/userInfo';

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
  get user() {
    return getUserInfoFromLocalStorage();
  }

  get isTutor() {
    return this.user?.role === ROLE.TUTOR;
  }

  get isStudent() {
    return this.user?.role === ROLE.STUDENT;
  }

  get isAdmin() {
    return this.user?.role === ROLE.ADMIN;
  }

  isLoggedIn() {
    return localStorage.getItem('user') ? true : false;
  }

  logout() {
    return localStorage.removeItem('user');
  }

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
}

const authService = new AuthService();
export { AuthService, authService };
