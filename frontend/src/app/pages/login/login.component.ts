import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError, of, Subject, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../utils/interfaces/user';
import { LogoComponent } from '../../components/logo/logo.component';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  protected fb = inject(FormBuilder);
  protected authSrv = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  loginForm = this.fb.group({
    username: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required] }],
  });

  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.loginForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.errorMessage.set(null));
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authSrv
        .login(username!, password!)
        .pipe(
          catchError((response) => {
            this.errorMessage.set('Credenziali non valide, riprova');
            return throwError(() => response);
          }),
        )
        .subscribe(() => {
          const dest =
            this.activatedRoute.snapshot.queryParams['dest'] || '/home';
          this.router.navigate([dest]);
        });
    }
  }
}
