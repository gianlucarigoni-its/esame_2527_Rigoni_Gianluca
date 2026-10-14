import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../utils/types/user.type';
import { ClassroomService } from '../../services/classroom.service';
import { Classroom } from '../../utils/types/classroom.type';
import { ListaClassiComponent } from '../../components/list-classroom/list-classroom.component';
import { CreateClassroomModalComponent } from '../../components/create-classroom-modal/create-classroom-modal.component';
import { UserService } from '../../services/user.service';

@Component({
  imports: [
    NavbarComponent,
    ListaClassiComponent,
    CreateClassroomModalComponent,
  ],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  protected authSrv = inject(AuthService);
  protected router = inject(Router);
  protected classroomSrv = inject(ClassroomService);
  protected userSrv = inject(UserService);

  students = signal<User[]>([]);
  user = this.authSrv.currentUser;
  classi = this.classroomSrv.classrooms;

  ngOnInit() {
    this.userSrv.getStudents().subscribe({
      next: (students) => this.students.set(students),
      error: (err) => console.error(err),
    });
  }

  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  logout() {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }

  onCreateClassroom(data: { name: string; studentIds: string[] }) {
    this.classroomSrv.add(data.name, data.studentIds).subscribe({
      next: (created) => {},
      error: (err) => console.error(err),
    });
  }
}
