import { Component, computed, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../utils/types/user.type';
import { ClassroomService } from '../../services/classroom.service';
import { Classroom } from '../../utils/types/classroom.type';
import { ListClassroomComponent } from '../../components/list-classroom/list-classroom.component';
import { CreateClassroomModalComponent } from '../../components/create-classroom-modal/create-classroom-modal.component';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  imports: [ListClassroomComponent],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  protected authSrv = inject(AuthService);
  protected router = inject(Router);
  protected classroomSrv = inject(ClassroomService);

  private modalService = inject(NgbModal);

  user = this.authSrv.currentUser;
  classrooms = this.classroomSrv.classrooms;

  isTeacher = computed(() => {
    return this.user()?.role === 'teacher';
  });

  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  openCreateModal() {
    this.modalService.open(CreateClassroomModalComponent, { centered: true });
  }
}
