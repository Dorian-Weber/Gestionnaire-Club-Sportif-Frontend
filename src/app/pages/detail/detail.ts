import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';

@Component({
  selector: 'app-detail',
  imports: [RouterLink, Button],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {}
