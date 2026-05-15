import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
      http = inject(HttpClient);
      baseUrl = 'http://localhost:8080/seat';

      readonly seatDTO = signal<SeatDTO[]>([])

    getSeatFilter(id: number, userId: number, platform: string, level: string){
        return this.http.get<SeatDTO[]>(`${this.baseUrl}/reserved/${id}`, {
          params: {
            currentUserId: 1,
            platform: platform,
            level: level,
          }
        });
    }
}
