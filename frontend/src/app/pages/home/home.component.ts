import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateClassroomModalComponent } from '../../components/create-classroom-modal/create-classroom-modal.component';
import { ListClassroomComponent } from '../../components/list-classroom/list-classroom.component';
import { AuthService } from '../../services/auth.service';
import { ClassroomService } from '../../services/classroom.service';

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
