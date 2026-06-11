import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserInfoDTO } from '../dto/userInfoDTO';
import { UserVisibility } from '../enum/userVisibility';
import { Page } from '../dto/page';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  apiUrl = `${environment.serverUrl}/appUser`;

  getUserInfo() {
    return this.http.get<UserInfoDTO>(`${this.apiUrl}/info`);
  }

  updateVisibility(visibility: UserVisibility | null) {
    return this.http.patch(`${this.apiUrl}/info`, { visibility });
  }

  getMyPublicProfil() {
    return this.http.get<UserPublicProfil>(`${this.apiUrl}/public`)
  }

  getPublicProfil(id: number) {
    return this.http.get<UserPublicProfil>(`${this.apiUrl}/public/${id}`)
  }

  updatePseudo(appUserPseudo: String ) {
    return this.http.patch(`${this.apiUrl}/pseudo`, { appUserPseudo });
  }
}
