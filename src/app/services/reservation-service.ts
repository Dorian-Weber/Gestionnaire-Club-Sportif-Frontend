import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  http = inject(HttpClient);
  apiUrl = `${environment.serverUrl}/reservation`;

  myReservations = signal<ReservationQRCodeDTO[]>([])

  getCanReserve(eventId: number) {
    return this.http.get<CanReserveDTO>(`${this.apiUrl}/can-reserve/${eventId}`);
  }

  createReservation(dto: CreateReservation) {
    return this.http.post<ReservationConfirmation>(`${this.apiUrl}`, dto);
  }


  getMyReservations(){
    return this.http.get<ReservationQRCodeDTO[]>(`${this.apiUrl}/my-reservations`).pipe(
      tap((res) => {
        this.myReservations.set(res)
      })
    )
  }
}
