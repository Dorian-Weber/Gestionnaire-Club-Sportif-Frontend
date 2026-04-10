import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Gest-Club-Sport-Frontend');

  // 👉 Signal pour ouvrir / fermer le menu mobile
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
}
