import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Button } from './composants/button/button';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Button],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Gest-Club-Sport-Frontend');
  authService = inject(Auth)

  // Signal pour ouvrir / fermer le menu mobile
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  ngOnInit() {}

  logOut() {
    this.authService.jwtInfo.set(null)
  }

}
