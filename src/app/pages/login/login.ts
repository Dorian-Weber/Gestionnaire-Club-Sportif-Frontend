import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formBuilder = inject(FormBuilder)
  authService = inject(Auth)

  submitted = false;

  formulaire = this.formBuilder.group({
    appUserEmail: ['',[Validators.required, Validators.email]],
    appUserPassword: ['',[Validators.required]]
  });

  onLogin() {
    this.submitted = true;
    if (this.formulaire.invalid){
      return
    }
    if (this.formulaire.valid){
      this.authService
        .login(this.formulaire.value as {email: string, password: string})
        .subscribe({
        next: (jwt) => {
          const redirect = this.authService.redirectUrl ?? '/';
          this.authService.redirectUrl = null;
          this.authService.router.navigate([redirect]);
        },
        error: (err) => {
          alert("Identifiant ou mot de passe incorrect")
      }
      })
    }
  }
}
