import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Button } from './composants/button/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Button],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Gest-Club-Sport-Frontend');

  // Signal pour ouvrir / fermer le menu mobile
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

}
