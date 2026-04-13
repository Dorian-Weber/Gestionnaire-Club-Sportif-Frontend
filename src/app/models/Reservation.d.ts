import { StatusPresence } from './StatusPresence';
import { AppUser } from './AppUser';
import {Event} from './Event';
import {Seat} from './Seat';

export interface Reservation {
  idReservation?: number;
  createdAt?: Date;
  statusPresence?: StatusPresence;
  event?: Event;
  user?: AppUser;
  seats?: Seat[];
}
