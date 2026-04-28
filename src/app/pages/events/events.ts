import { Component, EventEmitter, inject, OnInit, signal } from '@angular/core';
import { Button } from '../../composants/button/button';
import { Card } from '../../composants/card/card';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-events',
  imports: [Button, Card],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events implements OnInit {
  httpClient = inject(HttpClient);

  fieldSport = signal<SportField[]>([])
  fieldEventType =  signal<EventTypeField[]>([])
  eventMedium = signal<EventMedium[]>([])

  ngOnInit()  {
    this.httpClient.get<SportField[]>('http://localhost:8080/sport/field')
      .subscribe(fieldSport => this.fieldSport.set(fieldSport));

    this.httpClient.get<EventTypeField[]>('http://localhost:8080/event-type/field')
      .subscribe(fieldEventType => this.fieldEventType.set(fieldEventType));

    this.httpClient.get<EventMedium[]>('http://localhost:8080/event/list-event')
      .subscribe(eventMedium => this.eventMedium.set(eventMedium));
  }
}
