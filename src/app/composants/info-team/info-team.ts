import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-info-team',
  imports: [],
  templateUrl: './info-team.html',
  styleUrl: './info-team.css',
})
export class InfoTeam {
  @Input() eventFull!: EventFull;
  @Input() teamDTO!: TeamDTO;
  @Input() athleteDTO!: AthleteDTO;
}
