import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tag } from '../tag/tag';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-small-card',
  imports: [RouterLink, Tag, DatePipe],
  templateUrl: './small-card.html',
  styleUrl: './small-card.css',
})
export class SmallCard {
  @Input() event!: EventLight;
}
