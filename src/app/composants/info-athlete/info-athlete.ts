import { Component, Input } from '@angular/core';
import { Event} from '../../models/event';
import { Athlete } from '../../models/athlete';

@Component({
  selector: 'app-info-athlete',
  imports: [],
  templateUrl: './info-athlete.html',
  styleUrl: './info-athlete.css',
})
export class InfoAthlete {
  @Input() event!: Event;
  @Input() athlete!: Athlete;
}
