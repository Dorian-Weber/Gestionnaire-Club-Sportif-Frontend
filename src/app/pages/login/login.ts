import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';

@Component({
  selector: 'app-login',
  imports: [RouterLink, Button],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected readonly RouterLink = RouterLink;
}
