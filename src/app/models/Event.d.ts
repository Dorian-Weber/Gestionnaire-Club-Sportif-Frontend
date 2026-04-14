import {EventType} from './EventType';
import {Sport} from './Sport';
import {Team} from './Team';
import {Athlete} from './Athlete';
import {Vote} from './Vote';
import {Reservation} from './Reservation';

export interface Event {
  idEvent?: number;
  eventName: string;
  eventDescription?: string;
  eventDate: Date;
  eventType?: EventType;
  sport?: Sport;
  teams?: Team[];
  athletes?: Athlete[];
  votes?: Vote[];
  reservations?: Reservation[];
}
