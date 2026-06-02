import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-public-profil',
  imports: [DatePipe],
  templateUrl: './public-profil.html',
  styleUrl: './public-profil.css',
})
export class PublicProfil implements OnInit {
  userService = inject(UserService);

  userPublicProfil = signal<UserPublicProfil | null>(null);

  ngOnInit() {
    this.userService.getMyPublicProfil().subscribe((data) => {
      this.userPublicProfil.set(data);
    });
  }
}
