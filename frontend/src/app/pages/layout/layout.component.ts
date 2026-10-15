import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  imports: [RouterOutlet, NavbarComponent],
  selector: 'app-layout',
  styleUrl: './layout.component.css',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}
