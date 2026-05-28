import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  http = inject(HttpClient);
  apiUrl = `${environment.serverUrl}/reservation`;


  getCanReserve(eventId: number) {
    return this.http.get<CanReserveDTO>(`${this.apiUrl}/can-reserve/${eventId}`);
  }

  createReservation(dto: CreateReservation) {
    return this.http.post<ReservationConfirmation>(`${this.apiUrl}`, dto);
  }
}
