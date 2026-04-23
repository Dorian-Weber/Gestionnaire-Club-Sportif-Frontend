import { Event } from './event';


type Team = {
  idTeam?: number;
  teamName: string;
  events?: Event[];
  athletes: Athlete[];
}
