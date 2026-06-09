import { Component, inject, OnInit, signal } from '@angular/core';
import { RelationService } from '../../../services/relation-service';
import { RelationStatus } from '../../../enum/relationStatus';
import { SearchUser } from '../search-user/search-user';

@Component({
  selector: 'app-friends',
  imports: [SearchUser],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
})
export class Friends implements OnInit {
  relationService = inject(RelationService);

  friendList = this.relationService.friendList;
  filterFriendList = signal<FriendDTO[]>([]);
  requestReceived = signal<FriendDTO[]>([]);
  requestSend = signal<FriendDTO[]>([]);

  //Filtre dans la liste d'ami
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
    this.relationService.getRequestReceived().subscribe((list) => {
      this.requestReceived.set(list);
    });
    this.relationService.getRequestSend().subscribe((list) => {
      this.requestSend.set(list);
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

    this.relationService.removeRelation(friend.idAppUser).subscribe(() => {
      const updated = this.friendList().filter((f) => f.idAppUser !== friend.idAppUser);
      this.friendList.set(updated);
      this.filterFriendList.set(updated);
      this.selectedFriendToRemove.set(null);
    });
  }

  //Gestion des requêtes :
  accepteRequest(id: number) {
    this.relationService.acceptRequest(id, RelationStatus.ACCEPTED).subscribe(() => {
      const updated = this.requestReceived().filter((f) => f.idAppUser !== id);
      this.requestReceived.set(updated);

      this.relationService.getFriendList().subscribe((friends) => {
        this.friendList.set(friends);
        this.filterFriendList.set(friends);
      });
    });
  }
  refuseRequest(id: number) {
    this.relationService.removeRelation(id).subscribe(() => {
      const update = this.requestReceived().filter((f) => f.idAppUser !== id);
      this.requestReceived.set(update);
    });
  }
  cancelRequest(id: number) {
    this.relationService.removeRelation(id).subscribe(() => {
      const update = this.requestSend().filter((f) => f.idAppUser !== id);
      this.requestSend.set(update);
    });
  }

  searchQuery = signal('');
  searchResults = signal<AppUserLight[]>([]);

  search(query: string) {
    this.searchQuery.set(query);

    if (!query || query.trim().length === 0) {
      this.searchResults.set([]);
      return;
    }

    this.relationService.searchUsers(query).subscribe((result) => {
      this.searchResults.set(result.content);
    });
  }

  onRequestSent(user: AppUserLight) {
    this.requestSend.update(list => [...list, user]);
  }
}
