import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { EventType} from '../models/eventType';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventTypeService {
  http = inject(HttpClient);
  apiUrl = `${environment.serverUrl}/event-type`;

  readonly fieldEventType = signal<EventTypeField[]>([]);

  getEventTypeField() {
    return this.http.get<EventTypeField[]>(`${this.apiUrl}/field`).pipe(
      tap((result) => {
        this.fieldEventType.set(result);
      }),
    );
  }
}
