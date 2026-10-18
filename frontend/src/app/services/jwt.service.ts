import { Service } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../utils/interfaces/user';

@Service()
export class JwtService {
  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  removeToken() {
    localStorage.removeItem('authToken');
  }

  decodeToken(token: string): User | null {
    try {
      return jwtDecode<User>(token);
    } catch (err) {
      return null;
    }
  }
}
