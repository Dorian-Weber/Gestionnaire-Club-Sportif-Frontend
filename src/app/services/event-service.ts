import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Event} from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:8080/event';

  readonly nextEvent = signal<EventLight[]>([])

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/list`);
  }

  getEventById(id: number) {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  getNextEvent() {
    return this.http
      .get<EventLight[]>(`${this.apiUrl}/next`)
      .pipe(tap((result) => {this.nextEvent.set(result)}));
  }
}
