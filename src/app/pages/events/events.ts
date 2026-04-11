import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';

@Component({
  selector: 'app-events',
  imports: [RouterLink, Button],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {}
