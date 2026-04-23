import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sport} from '../models/sport';

@Injectable({
  providedIn: 'root',
})
export class SportService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:8080/sport';

  getSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(`${this.apiUrl}/list`);
  }
}
