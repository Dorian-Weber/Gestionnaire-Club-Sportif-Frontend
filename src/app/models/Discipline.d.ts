import { Sport } from './Sport';
import { Athlete } from './Athlete';

export interface Discipline {
  idDiscipline?: number;
  disciplineName: string;
  eventRecord?: string;
  worldRecord?: string;
  sport?: Sport;
  athletes?: Athlete[];
}
