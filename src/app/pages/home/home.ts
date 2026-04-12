import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';
import { Tag } from '../../composants/tag/tag';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Button, Tag],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
