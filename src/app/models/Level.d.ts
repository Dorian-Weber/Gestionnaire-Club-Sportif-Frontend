import { Seat } from './Seat';
import { Platform } from './Platform';

export interface Level {
  idLevel?: number;
  levelName: string;
  seats?: Seat[];
  platform?: Platform;
}
