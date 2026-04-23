import { Event } from './event';

type Sport = {
  idSport?: number;
  sportName: string;
  discipline?: Discipline[];
  events?: Event[];
}
