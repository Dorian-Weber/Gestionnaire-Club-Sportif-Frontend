import { Component, Input } from '@angular/core';
import { Event} from '../../models/Event';
import { Team } from '../../models/Team';
import { Athlete } from '../../models/Athlete';

@Component({
  selector: 'app-info-team',
  imports: [],
  templateUrl: './info-team.html',
  styleUrl: './info-team.css',
})
export class InfoTeam {
  @Input() event!: Event;
  @Input() team!: Team;
  @Input() athlete!: Athlete;
}
