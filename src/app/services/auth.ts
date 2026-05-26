import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';

type JwtInfo = {sub: string, role: string};

@Injectable({
  providedIn: 'root',
})
export class Auth {
  redirectUrl: string | null = null;
  router = inject(Router);

  readonly jwtInfo = signal<JwtInfo | null>(null);
  httpClient = inject(HttpClient);

  constructor() {
    this.decodeJwt();
  }

  login(credentials: { email: string; password: string }) {
    return this.httpClient
      .post('http://localhost:8080/log-in', credentials, { responseType: 'text' })
      .pipe(
        tap((jwt) => {
          localStorage.setItem('jwt', jwt);

          const jwtParts = jwt.split('.');
          const bodyBase64 = jwtParts[1];
          const bodyJson = atob(bodyBase64);
          const body = JSON.parse(bodyJson);

          this.jwtInfo.set(body);
        }),
      );
  }

  decodeJwt() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const jwtParts = jwt.split('.');
      const bodyBase64 = jwtParts[1];
      const bodyJson = atob(bodyBase64);
      const body = JSON.parse(bodyJson);

      this.jwtInfo.set(body);
    }
  }

  register(payload: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/sign-in', payload);
  }
}
