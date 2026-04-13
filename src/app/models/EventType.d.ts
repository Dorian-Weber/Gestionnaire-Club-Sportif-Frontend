import {Event} from './Event';

export interface EventType {
  idEventType? : number;
  eventTypeName : string;
  events? : Event
}
