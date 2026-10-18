import { HttpClient } from '@angular/common/http';
import { effect, inject, Service, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { Classroom } from '../utils/interfaces/classroom';
import { tap } from 'rxjs';

@Service()
export class ClassroomService {
  private http = inject(HttpClient);
  private authSrv = inject(AuthService);

  private internal = signal<Classroom[]>([]);
  classrooms = this.internal.asReadonly();

  constructor() {
    effect(() => {
      const isAuthenticated = this.authSrv.isAuthenticated();
      if (isAuthenticated) {
        this.fetch();
      } else {
        this.internal.set([]);
      }
    });
  }

  fetch() {
    this.http.get<Classroom[]>('/api/classrooms').subscribe((classrooms) => {
      this.internal.set(classrooms);
    });
  }

  getById(id: string) {
    return this.classrooms().find((c) => c.id === id);
  }

  add(name: string, students: string[]) {
    return this.http
      .post<Classroom>('/api/classrooms', { name, students })
      .pipe(tap((c) => this.internal.update((list) => [...list, c])));
  }
}
