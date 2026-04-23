import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';
import { SmallCard } from '../../composants/small-card/small-card';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../../services/event-service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Button, SmallCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  httpClient = inject(HttpClient);


  nextEvent = signal<EventLight[]>([])

  ngOnInit() {
    this.httpClient.get<EventLight[]>('http://localhost:8080/event/next')
      .subscribe(nextEvent => this.nextEvent.set(nextEvent))
  }
}
