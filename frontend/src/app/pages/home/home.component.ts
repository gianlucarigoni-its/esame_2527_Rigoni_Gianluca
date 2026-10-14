import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../utils/types/user.type';
import { ListaClassiComponent } from '../../components/lista-classi/lista-classi.component';
import { ClassroomService } from '../../services/classroom.service';
import { Classroom } from '../../utils/types/classroom.type';

@Component({
  imports: [NavbarComponent, ListaClassiComponent],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  protected authSrv = inject(AuthService);
  protected router = inject(Router);
  protected classroomSrv = inject(ClassroomService);

  user = this.authSrv.currentUser;
  classi = this.classroomSrv.classrooms;

  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  logout() {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }
}
