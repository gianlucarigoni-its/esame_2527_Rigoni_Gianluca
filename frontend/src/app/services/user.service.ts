import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { User } from '../utils/interfaces/user';

@Service()
export class UserService {
  protected http = inject(HttpClient);

  getStudents() {
    return this.http.get<User[]>('/api/users', {
      params: { type: 'student' },
    });
  }
}
