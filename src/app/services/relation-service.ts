import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';
import { RelationStatus} from '../enum/relationStatus';
import { Page } from '../dto/page';

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
  removeRelation(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //Gère les différents types de demande d'amitié
  getRequestReceived() {
    return this.http.get<FriendDTO[]>(`${this.apiUrl}/user/request-received`).pipe(
      tap((result) => {
        this.requestReceived.set(result);
      }),
    );
  }
  getRequestSend() {
    return this.http.get<FriendDTO[]>(`${this.apiUrl}/user/request-send`).pipe(
      tap((result) => {
        this.requestSend.set(result);
        console.log('result :' + result);
      }),
    );
  }

  searchUsers(query: string, page = 0, size = 10) {
    return this.http.get<Page<AppUserLight>>(`${this.apiUrl}/search`, {
      params: { query, page, size },
    });
  }

  //Gestion des Requêtes
  acceptRequest(id: number, relationStatus: RelationStatus) {
    return this.http.patch(`${this.apiUrl}/request/${id}`, { relationStatus });
  }

  sendRequest(id: number) {
    return this.http.post(`${this.apiUrl}/request`, {
      secondId: id
    });
  }
}
