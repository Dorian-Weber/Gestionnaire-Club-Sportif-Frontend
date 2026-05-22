import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  http = inject(HttpClient)
  apiUrl = 'http://localhost:8080/reservation'

  readonly hasReserved = signal<boolean>(false);

  getHasReserved(idEvent: number ) {
    return this.http.get<boolean>(`${this.apiUrl}/has-reserved?idEvent=${idEvent}`);
  }
}
