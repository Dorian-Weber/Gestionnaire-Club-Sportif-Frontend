import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';

@Component({
  selector: 'app-register',
  imports: [RouterLink, Button],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {}
