import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-register',
  imports: [RouterLink, Button, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  formBuilder = inject(FormBuilder);
  authService = inject(Auth);
  router = inject(Router);

  submitted = false;

  formulaire = this.formBuilder.group(
    {
      appUserName: ['',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)
        ]
      ],
      appUserFirstName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)
        ],
      ],
      appUserPseudo: [
        '',
        [
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z0-9À-ÖØ-öø-ÿ_-]+$'),
        ],
      ],
      appUserPhone: ['',
        [
          Validators.required,
          Validators.pattern('^\\+?[0-9]{10,15}$')
        ]
      ],
      appUserEmail: ['',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ],
      appUserPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
          ),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
          ),
        ],
      ],
    },
    {
      validators: this.passwordMatchValidator,
    },
  );

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('appUserPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;

    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    if (this.formulaire.invalid) {
      this.formulaire.markAsTouched();
      return;
    }

    const payload = {
      appUserName: this.formulaire.value.appUserName,
      appUserFirstName: this.formulaire.value.appUserFirstName,
      appUserPseudo: this.formulaire.value.appUserPseudo,
      appUserPhone: this.formulaire.value.appUserPhone,
      appUserEmail: this.formulaire.value.appUserEmail,
      appUserPassword: this.formulaire.value.appUserPassword,
    };
    this.authService.register(payload).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error) => console.log(error),
    });
  }
}
