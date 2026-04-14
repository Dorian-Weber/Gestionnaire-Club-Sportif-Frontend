import { Component, Input } from '@angular/core';
import { Button } from '../button/button';
import { RouterLink } from '@angular/router';
import { Tag } from '../tag/tag';
import { Event } from '../../models/Event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [Button, RouterLink, Tag, DatePipe],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() event!: Event;
}
