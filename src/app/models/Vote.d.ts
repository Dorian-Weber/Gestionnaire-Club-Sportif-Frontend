import { Athlete } from './Athlete';
import {AppUser} from './AppUser';
import {Event} from './Event';

export interface Vote {
  VoteKey?: number;
  users?: AppUser;
  event?: Event;
  athlete: Athlete;
  voteValue : number;
}
