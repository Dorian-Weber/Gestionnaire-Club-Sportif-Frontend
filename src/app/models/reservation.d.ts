import {Event} from './event';

type Reservation = {
  idReservation?: number;
  createdAt?: string | Date;
  statusPresence?: StatusPresence;
  event?: Event;
  user?: AppUser;
  seats?: Seat[];
}
