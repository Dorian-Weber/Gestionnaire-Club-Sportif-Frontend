import { Component, inject, Input, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profil-public-popup',
  imports: [DatePipe],
  templateUrl: './profil-public-popup.html',
  styleUrl: './profil-public-popup.css',
})
export class ProfilPublicPopup {
  userService = inject(UserService);
  // ID de l'utilisateur dont on veut afficher le profil
  @Input() userId!: number;
  // Fonction passée par le parent pour fermer le popup
  @Input() onClose!: () => void;
  // Le profil récupéré depuis le backend
  profile = signal<UserPublicProfil | null>(null);

  ngOnInit() {
    if (!this.userId) return;

    this.userService.getPublicProfil(this.userId).subscribe((data) => {
      this.profile.set(data);
    });
  }

  // Fonction appelée quand on clique sur la croix ou en dehors du popup
  close() {
    if (this.onClose) {
      this.onClose();
    }
  }
}
