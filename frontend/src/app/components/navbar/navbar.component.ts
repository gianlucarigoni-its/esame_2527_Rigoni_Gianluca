import {
  Component,
  signal,
  ElementRef,
  HostListener,
  inject,
  output,
  input,
  computed,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../utils/interfaces/user';
import { LogoComponent } from '../logo/logo.component';
import { Router, RouterLink } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [LogoComponent, RouterLink, AvatarComponent],
})
export class NavbarComponent {
  protected authSrv = inject(AuthService);
  protected router = inject(Router);

  user = this.authSrv.currentUser;

  isMenuOpen = signal(false);

  private elementRef = inject(ElementRef);

  toggleMenu() {
    this.isMenuOpen.update((open) => !open);
  }

  getRole = computed(() =>
    this.user()?.role === 'student' ? 'Studente' : 'Docente',
  );

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  logout() {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}
