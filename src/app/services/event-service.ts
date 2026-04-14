import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:8080/event';

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/list`);
  }

  getEventById(id: number) {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }
}
