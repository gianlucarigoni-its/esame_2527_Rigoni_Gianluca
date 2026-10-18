import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Assignment } from '../utils/interfaces/assignment';

@Service()
export class AssignmentService {
  private http = inject(HttpClient);

  private internal = signal<Assignment[]>([]);
  assignments = this.internal.asReadonly();

  getAssignments(classroomId: string) {
    this.clear();
    return this.http
      .get<Assignment[]>(`/api/classrooms/${classroomId}/assignments`)
      .pipe(tap((assignments) => this.internal.set(assignments)));
  }

  add(classroomId: string, title: string) {
    return this.http
      .post<Assignment>(`/api/classrooms/${classroomId}/assignments`, { title })
      .pipe(tap((a) => this.internal.update((list) => [...list, a])));
  }

  complete(classroomId: string, assignmentId: string) {
    return this.http
      .patch<Assignment>(
        `/api/classrooms/${classroomId}/assignments/${assignmentId}`,
        {},
      )
      .pipe(
        tap((updated) => {
          this.internal.update((list) =>
            list.map((a) => (a.id === updated.id ? updated : a)),
          );
        }),
      );
  }

  clear() {
    this.internal.set([]);
  }
}
