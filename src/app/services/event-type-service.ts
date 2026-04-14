import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventType } from '../models/EventType';

@Injectable({
  providedIn: 'root',
})
export class EventTypeService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:8080/event-type';

  getEventTypes(): Observable<EventType[]> {
    return this.http.get<EventType[]>(`${this.apiUrl}/list`);
  }
}
