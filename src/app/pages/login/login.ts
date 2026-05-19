import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterLink, Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formBuilder = inject(FormBuilder)
  httpClient = inject(HttpClient);

  formulaire = this.formBuilder.group({
    appUserEmail: ['',[Validators.required, Validators.email]],
    appUserPassword: ['',[Validators.required]]
  });

  onLogin() {
    if (this.formulaire.valid){
      this.httpClient.post(
        'http://localhost:8080/log-in',
        this.formulaire.value,
        { responseType: 'text' })
        .subscribe({
        next: (jwt) => {
          localStorage.setItem('jwt', jwt);
          alert("Connexion réussi")
        },
        error: (err) => {
          alert("Identifiant ou mot de passe incorrect")
      }
      })
    }
  }
}
