import { Component, input } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { User } from '../../utils/types/user.type';
import { OnInit } from '@angular/core';

@Component({
  imports: [LogoComponent],
  selector: 'app-navbar',
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user = input<User | null>();

  ngOnInit() {
    console.log('NAVBAR | role: ' + this.user()?.role);
  }
}
