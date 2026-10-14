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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [LogoComponent],
})
export class NavbarComponent {
  user = input.required<User | null>();

  toLogin = output<void>();
  toRegister = output<void>();
  toProfile = output<void>();
  toLogout = output<void>();
  toHome = output<void>();

  isMenuOpen = signal(false);

  private elementRef = inject(ElementRef);

  toggleMenu() {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}
