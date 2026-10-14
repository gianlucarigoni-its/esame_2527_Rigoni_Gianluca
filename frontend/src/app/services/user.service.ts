import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../utils/types/user.type';

@Injectable({ providedIn: 'root' })
export class UserService {
  protected http = inject(HttpClient);

  getStudents() {
    return this.http.get<User[]>('/api/users', {
      params: { type: 'student' },
    });
  }
}
