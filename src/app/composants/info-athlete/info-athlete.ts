import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-athlete',
  imports: [],
  templateUrl: './info-athlete.html',
  styleUrl: './info-athlete.css',
})
export class InfoAthlete {
  @Input() eventFull!: EventFull;
  @Input() athleteDTO!: AthleteDTO;
}
