import {
  Component,
  signal,
  ElementRef,
  HostListener,
  inject,
  output,
  input,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../utils/types/user.type';
import { LogoComponent } from '../logo/logo.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [LogoComponent, RouterLink],
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
