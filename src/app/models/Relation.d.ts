import { AppUser } from './AppUser';

export interface Relation {
  key?: number
  firstUser: AppUser;
  secondUser: AppUser;
  relationStatus?: string;
}
