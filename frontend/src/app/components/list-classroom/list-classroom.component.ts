import { Component, computed, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../utils/types/user.type';
import { Classroom } from '../../utils/types/classroom.type';
import { CardClassroomComponent } from '../card-classroom/card-classroom.component';

@Component({
  selector: 'app-list-classroom',
  imports: [CardClassroomComponent],
  templateUrl: './list-classroom.component.html',
  styleUrl: './list-classroom.component.css',
})
export class ListaClassiComponent {
  private router = inject(Router);

  user = input.required<User>();
  classrooms = input.required<Classroom[]>();

  openMoal = output<void>();

  isTeacher = computed(() => this.user().role === 'teacher');

  onSelected(classroom: Classroom): void {
    this.router.navigate(['/classrooms', classroom.id]);
  }
}
