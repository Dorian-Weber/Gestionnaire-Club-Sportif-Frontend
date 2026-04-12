import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';
import { Tag } from '../../composants/tag/tag';

@Component({
  selector: 'app-detail',
  imports: [RouterLink, Button, Tag],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {}
