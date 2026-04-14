import {AccountType} from './AccountType';
import {Relation} from './Relation';
import { Vote } from './Vote';
import { Reservation } from './Reservation';

export interface AppUser {
  idAppUser?: number;
  appUserName: string;
  appUserFirstName: string;
  appUserPseudo: string;
  appUserEmail?: string;
  appUserPassword?: string;
  appUserPhone?: string;
  createDate?: string | Date;
  lastModifiedDate?: string | Date;
  accountType?: AccountType;
  relationUser?: Relation[];
  relationSecondUser?: Relation[];
  votes?: Vote[];
  reservations?: Reservation[];
}
