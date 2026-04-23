import { Component, Input } from '@angular/core';
import { Event} from '../../models/event';
import { Team } from '../../models/team';
import { Athlete } from '../../models/athlete';


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
