import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RelationService {
  http = inject(HttpClient);
  apiUrl = `${environment.serverUrl}/relation`;

  friendList = signal<FriendDTO[]>([]);
  requestReceived = signal<FriendDTO[]>([]);
  requestSend = signal<FriendDTO[]>([]);

  getFriendList() {
    return this.http.get<FriendDTO[]>(`${this.apiUrl}/user`).pipe(
      tap((result) => {
        this.friendList.set(result);
      }),
    );
  }
  removeFriend(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getRequestReceived() {
    return this.http.get<FriendDTO[]>(`${this.apiUrl}/user/request-received`).pipe(
      tap((result) => {
        this.requestReceived.set(result)
      })
    );
  }

  getRequestSend() {
    return this.http.get<FriendDTO[]>(`${this.apiUrl}/user/request-send`).pipe(
      tap((result) => {
        this.requestSend.set(result);
        console.log('result :' + result)
      }),
    );
  }
}
