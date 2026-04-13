import {Event} from './Event';
import {Discipline} from './Discipline';

export interface Sport {
  idSport?: number;
  sportName: string;
  discipline?: Discipline[];
  events?: Event[];
}
