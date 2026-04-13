import { Level } from './Level';
import { Reservation } from './Reservation';

export interface Seat {
  idSeat?: number;
  seatNumber:string;
  level?: Level;
  reservation?: Reservation;
}
