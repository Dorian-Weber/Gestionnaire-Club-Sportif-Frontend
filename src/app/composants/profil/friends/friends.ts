import { Component, inject, OnInit, signal } from '@angular/core';
import { RelationService } from '../../../services/relation-service';

@Component({
  selector: 'app-friends',
  imports: [],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
})
export class Friends implements OnInit {
  relationService = inject(RelationService);

  friendList = this.relationService.friendList;
  filterFriendList = signal<FriendDTO[]>([]);

  filterFriends(event: Event) {
    const input = event.target as HTMLInputElement;
    const q = input.value.toLowerCase();

    this.filterFriendList.set(
      this.friendList().filter((f) => f.appUserPseudo.toLowerCase().includes(q)),
    );
  }

  ngOnInit() {
    this.relationService.getFriendList().subscribe((list) => {
      this.friendList.set(list);
      this.filterFriendList.set(list);
    });
  }

  //Confirmation de suppréssion
  selectedFriendToRemove = signal<FriendDTO | null>(null);

  openRemoveConfirmation(friend: FriendDTO) {
    this.selectedFriendToRemove.set(friend);
  }
  cancelRemove() {
    this.selectedFriendToRemove.set(null);
  }

  confirmRemove() {
    const friend = this.selectedFriendToRemove();
    if (!friend) return;

    this.relationService.removeFriend(friend.idAppUser).subscribe(() => {
      const updated = this.friendList().filter((f) =>
        f.idAppUser !== friend.idAppUser);
      this.friendList.set(updated);
      this.filterFriendList.set(updated);
      console.log(updated);
      console.log(this.selectedFriendToRemove())
      this.selectedFriendToRemove.set(null);
      console.log(this.selectedFriendToRemove())
    });
  }
}
