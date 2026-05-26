import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:8080/reservation';

  readonly hasReserved = signal<boolean>(false);

  getCanReserve(eventId: number) {
    return this.http.get<CanReserveDTO>(`${this.apiUrl}/can-reserve/${eventId}`);
  }

  createReservation(dto: CreateReservation) {
    return this.http.post<ReservationConfirmation>(`${this.apiUrl}`, dto);
  }
}
