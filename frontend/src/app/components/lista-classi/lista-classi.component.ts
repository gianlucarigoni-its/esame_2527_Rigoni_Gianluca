import { Component, computed, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../utils/types/user.type';
import { Classroom } from '../../utils/types/classroom.type';
import { CardClassroomComponent } from '../card-classroom/card-classroom.component';

@Component({
  selector: 'app-lista-classi',
  imports: [CardClassroomComponent],
  templateUrl: './lista-classi.component.html',
  styleUrl: './lista-classi.component.css',
})
export class ListaClassiComponent {
  private router = inject(Router);

  user = input.required<User>();
  classrooms = input.required<Classroom[]>();

  createClassroom = output<void>();

  isTeacher = computed(() => this.user().role === 'teacher');

  onCreateClassroom(): void {
    this.createClassroom.emit();
  }

  onSelected(classroom: Classroom): void {
    this.router.navigate(['/classrooms', classroom.id]);
  }
}
