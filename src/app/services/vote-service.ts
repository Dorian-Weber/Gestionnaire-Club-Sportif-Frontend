import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  http = inject(HttpClient);
  apiUrl = `${environment.serverUrl}/vote`;

  readonly pendingVote = signal<VoteEventDTO[]>([]);
  readonly completedVote = signal<VoteEventDTO[]>([]);

  getPendingVote() {
    return this.http.get<VoteEventDTO[]>(`${this.apiUrl}/pending`).pipe(
      tap((result) => {
        this.pendingVote.set(result);
      }),
    );
  }
  getCompletedVote() {
    return this.http.get<VoteEventDTO[]>(`${this.apiUrl}/completed`).pipe(
      tap((result) => {
        this.completedVote.set(result);
      }),
    );
  }

  submitVote(payload: VoteSubmitDTO) {
    return this.http.post(`${this.apiUrl}`, payload);
  }
}
