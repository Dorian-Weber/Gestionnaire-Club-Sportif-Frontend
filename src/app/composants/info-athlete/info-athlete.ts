import { Component, Input } from '@angular/core';
import { Event} from '../../models/Event';
import { Athlete } from '../../models/Athlete';

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
