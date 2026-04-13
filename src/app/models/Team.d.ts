import {Event} from './Event';
import {Athlete} from './Athlete';

export interface Team {
  idTeam?: number;
  teamName: string;
  events?: Event[];
  Athlete: Athlete[];
}
