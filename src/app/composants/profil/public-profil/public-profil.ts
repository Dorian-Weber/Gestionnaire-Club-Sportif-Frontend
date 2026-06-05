import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { DatePipe } from '@angular/common';
import { Button } from '../../button/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-public-profil',
  imports: [DatePipe, Button, ReactiveFormsModule],
  templateUrl: './public-profil.html',
  styleUrl: './public-profil.css',
})
export class PublicProfil implements OnInit {
  userService = inject(UserService);
  formBuilder = inject(FormBuilder);

  userPublicProfil = signal<UserPublicProfil | null>(null);
  newPseudo = signal<string>('');
  isEditing = signal(false);
  toastVisible = signal(false);

  submitted = false;

  formulaire = this.formBuilder.group({
    formPseudo: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9À-ÖØ-öø-ÿ_-]+$'),
      ],
    ],
  });

  ngOnInit() {
    this.userService.getMyPublicProfil().subscribe((data) => {
      this.userPublicProfil.set(data);
      this.newPseudo.set(data.appUserPseudo); // initialise l’input
    });
  }

  startEditPseudo() {
    this.isEditing.set(true);
  }
  stopEditPseudo() {
    this.isEditing.set(false);
  }

  changePseudo(pseudo: string) {
    this.newPseudo.set(pseudo);
  }

  validatePseudo() {
    this.submitted = true;
    if (this.formulaire.invalid) {
      this.formulaire.markAsTouched();
      return;
    }
    const formPseudo = this.formulaire.get('formPseudo')?.value as string;
    if (!formPseudo) {
      return;
    }
    this.changePseudo(formPseudo);
    this.userService.updatePseudo(this.newPseudo()).subscribe(() => {
      this.userPublicProfil();
      this.toastVisible.set(true);
      setTimeout(() => this.toastVisible.set(false), 2000);
    });
  }
}
