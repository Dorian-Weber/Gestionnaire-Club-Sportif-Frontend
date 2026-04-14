import {Event} from './Event';
import { Team } from './Team';
import {Discipline} from './Discipline';
import {Country} from './Country';
import { Vote } from './Vote';

export interface Athlete {
  idAthlete?: number;
  athleteName: String;
  athleteFirstName: string;
  athleteBirthDate?: string | Date;
  events?: Event[];
  teams?: Team[];
  disciplines?: Discipline[];
  country?: Country;
  votes?: Vote[];
}
