import { Component } from '@angular/core';
import { Button } from '../../composants/button/button';
import { NgClass } from '@angular/common';
import { Information } from '../../composants/profil/information/information';

@Component({
  selector: 'app-profil',
  imports: [Button, NgClass, Information],
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
