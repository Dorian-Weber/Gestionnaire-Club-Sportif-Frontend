import { Event } from './event';


type Vote = {
  VoteKey?: number;
  users?: AppUser;
  event?: Event;
  athlete: Athlete;
  voteValue : number;
}
