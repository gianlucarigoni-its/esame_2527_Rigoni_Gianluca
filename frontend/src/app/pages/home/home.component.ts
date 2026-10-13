import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [NavbarComponent],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  protected authSrv = inject(AuthService);

  ngOnInit() {
    this.authSrv.fetchUser();
    console.log('HOME | role: ' + this.authSrv.currentUser()?.role);
  }
}
