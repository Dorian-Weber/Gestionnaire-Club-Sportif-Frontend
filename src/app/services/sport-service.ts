import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class SportService {
  http = inject(HttpClient);
  apiUrl = `${environment.serverUrl}/sport`;

  readonly fieldSport = signal<SportField[]>([]);

  getSportField() {
    return this.http.get<SportField[]>(`${this.apiUrl}/field`).pipe(
      tap((result) => {
        this.fieldSport.set(result);
      }),
    );
  }
}
