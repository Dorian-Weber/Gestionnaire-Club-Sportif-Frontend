import { Component } from '@angular/core';
import { Button } from '../../composants/button/button';
import { NgClass } from '@angular/common';
import { Information } from '../../composants/profil/information/information';
import { PublicProfil } from '../../composants/profil/public-profil/public-profil';
import { Friends } from '../../composants/profil/friends/friends';
import { MyReservations } from '../../composants/profil/my-reservations/my-reservations';

@Component({
  selector: 'app-profil',
  imports: [Button, NgClass, Information, PublicProfil, Friends, MyReservations],
  templateUrl: './profil.html',
  styleUrl: './profil.css',
})
export class Profil {
  activeTab: string = 'info';

  setTab(tab: string) {
    this.activeTab = tab;
  }

  isActive(tab: string): boolean {
    return this.activeTab === tab;
  }
}
