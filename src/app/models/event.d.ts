export type Event = {
  idEvent: number;
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
