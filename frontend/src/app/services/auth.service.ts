import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { Role } from '../utils/enum/role';
import { User } from '../utils/interfaces/user';
import { JwtService } from './jwt.service';

@Service()
export class AuthService {
  protected http = inject(HttpClient);
  protected jwtSrv = inject(JwtService);

  protected _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();

  isAuthenticated = computed(() => {
    return !!this.currentUser();
  });

  constructor() {
    this.fetchUser();
  }

  fetchUser() {
    const token = this.jwtSrv.getToken();
    if (!token) return this._currentUser.set(null);
    const user = this.jwtSrv.decodeToken(token);
    return this._currentUser.set(user);
  }

  login(username: string, password: string) {
    return this.http
      .post<{ user: User; token: string }>('/api/login', { username, password })
      .pipe(
        tap((res) => this.jwtSrv.setToken(res.token)),
        map((res) => res.user),
        tap((user) => this._currentUser.set(user)),
      );
  }

  register(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    role: Role | string,
    picture: string,
  ) {
    return this.http.post<{ user: User }>('/api/register', {
      username,
      password,
      firstName,
      lastName,
      role,
      picture,
    });
  }

  logout() {
    this.jwtSrv.removeToken();
    this._currentUser.set(null);
  }
}
