import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';
import { SmallCard } from '../../composants/small-card/small-card';
import { EventService } from '../../services/event-service';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Button, SmallCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  eventService = inject(EventService);
  authService = inject(Auth);

  nextEvent = this.eventService.nextEvent;

  ngOnInit(): void {
    this.eventService.getNextEvent().subscribe();
  }

}
