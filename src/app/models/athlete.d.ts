import { Event} from './event';

type Athlete = {
  idAthlete: number;
  athleteName: String;
  athleteFirstName: string;
  athleteBirthDate?: string | Date;
  events?: Event[];
  teams?: Team[];
  disciplines?: Discipline[];
  country?: Country;
  votes?: Vote[];
}
