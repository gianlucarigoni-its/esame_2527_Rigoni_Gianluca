import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

function matchPasswords(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  protected fb = inject(FormBuilder);
  protected authSrv = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  registerForm = this.fb.group(
    {
      username: ['', { validators: [Validators.required, Validators.email] }],
      password: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
          ],
        },
      ],
      confirmPassword: ['', { validators: [Validators.required] }],
      firstName: ['', { validators: [Validators.required] }],
      lastName: ['', { validators: [Validators.required] }],
      role: ['', { validators: [Validators.required] }],
      picture: ['', { validators: [Validators.required] }],
    },
    {
      validators: [matchPasswords],
    },
  );

  errorMessage = signal<string | null>(null);
  success = signal(false);
  loading = signal(false);

  ngOnInit() {
    this.registerForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.errorMessage.set(null));
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const { username, password, firstName, lastName, role, picture } =
      this.registerForm.value;

    this.authSrv
      .register(username!, password!, firstName!, lastName!, role!, picture!)
      .subscribe({
        next: () => {
          this.success.set(true);
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: (response) => {
          this.errorMessage.set(
            response.error?.message ?? 'Errore di connessione',
          );
          this.loading.set(false);
        },
      });
  }
}
