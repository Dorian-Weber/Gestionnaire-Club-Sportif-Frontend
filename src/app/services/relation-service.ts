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

  friendList = signal<FriendDTO[]>([])

  getFriendList() {
    return this.http.get<FriendDTO[]>(`${this.apiUrl}/user`).pipe(
      tap((result) => {
        this.friendList.set(result)
        console.log(result)
        console.log(this.friendList())
      }),
    );
  }
}
