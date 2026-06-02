import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { UserVisibility } from '../../../enum/userVisibility'
import { UserInfoDTO } from '../../../dto/userInfoDTO';
import { Button } from '../../button/button';

@Component({
  selector: 'app-information',
  imports: [Button],
  templateUrl: './information.html',
  styleUrl: './information.css',
})
export class Information implements OnInit {
  userService = inject(UserService);

  userInfo = signal<UserInfoDTO | null>(null);
  currentVisibility = signal<UserVisibility | null>(null);
  selectedVisibility = signal<UserVisibility | null>(null);

  protected readonly UserVisibility = UserVisibility;
  toastVisible = signal(false);

  ngOnInit() {
    this.userService.getUserInfo().subscribe((data) => {
      this.userInfo.set(data);
      this.currentVisibility.set(data.appUserVisibility);
      this.selectedVisibility.set(data.appUserVisibility);
    });
  }

  selectVisibility(v: UserVisibility) {
    this.selectedVisibility.set(v);
  }

  validateVisibility() {
    this.userService.updateVisibility(this.selectedVisibility()).subscribe(() => {
      this.currentVisibility.set(this.selectedVisibility());
      this.toastVisible.set(true);
      setTimeout(() => this.toastVisible.set(false), 2000);
    });
  }
}
