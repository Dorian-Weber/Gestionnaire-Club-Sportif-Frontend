import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SportService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:8080/sport';

  readonly fieldSport = signal<SportField[]>([]);

  getSportField() {
    return this.http
      .get<SportField[]>(`${this.apiUrl}/field`)
    .pipe(tap((result) => {this.fieldSport.set(result)}));
  }
}
