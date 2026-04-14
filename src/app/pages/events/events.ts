import { Component, inject } from '@angular/core';
import { Button } from '../../composants/button/button';
import { Card } from '../../composants/card/card';
import { EventService } from '../../services/eventService';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-events',
  imports: [Button, Card],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  private eventService = inject(EventService);

  events = toSignal(this.eventService.getEvents(), { initialValue: [] });
}
