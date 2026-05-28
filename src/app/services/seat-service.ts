import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  http = inject(HttpClient);
  baseUrl = `${environment.serverUrl}/seat`;


  getSeatFilter(id: number, platform: string, level: string) {
    return this.http.get<SeatDTO[]>(`${this.baseUrl}/reserved/${id}`, {
      params: {
        platform: platform,
        level: level,
      },
    });
  }
}
