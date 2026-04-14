import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';
import { SmallCard } from '../../composants/small-card/small-card';
import { EventService } from '../../services/event-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Button, SmallCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private eventService = inject(EventService);

  events = toSignal(this.eventService.getEvents(), { initialValue: [] });
}
