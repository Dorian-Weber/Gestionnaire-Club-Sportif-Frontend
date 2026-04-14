import { Component, inject } from '@angular/core';
import { Button } from '../../composants/button/button';
import { Card } from '../../composants/card/card';
import { EventService } from '../../services/event-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventTypeService } from '../../services/event-type-service';
import { SportService } from '../../services/sport-service';

@Component({
  selector: 'app-events',
  imports: [Button, Card],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  // Injection des services
  private eventService = inject(EventService);
  private eventTypeService = inject(EventTypeService);
  private sportService = inject(SportService);

  // Création des signaux
  events = toSignal(this.eventService.getEvents(), { initialValue: [] });
  eventTypes = toSignal(this.eventTypeService.getEventTypes(), { initialValue: [] });
  sports = toSignal(this.sportService.getSports(), { initialValue: [] });
}
