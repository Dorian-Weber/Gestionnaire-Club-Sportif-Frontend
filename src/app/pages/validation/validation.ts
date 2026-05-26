import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';

@Component({
  selector: 'app-validation',
  imports: [RouterLink, Button],
  templateUrl: './validation.html',
  styleUrl: './validation.css',
})
export class Validation {}
