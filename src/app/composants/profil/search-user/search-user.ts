import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { RelationService } from '../../../services/relation-service';

@Component({
  selector: 'app-search-user',
  imports: [],
  templateUrl: './search-user.html',
  styleUrl: './search-user.css',
})
export class SearchUser implements OnInit {
  @Output() requestSent = new EventEmitter<AppUserLight>();
  relationService = inject(RelationService);

  searchQuery = signal('');
  searchResults = signal<AppUserLight[]>([]);

  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => this.performSearch(query));
  }

  search(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input) return; // sécurité TS
    this.searchSubject.next(input.value);
  }

  // Appelé après debounce
  performSearch(query: string) {
    this.searchQuery.set(query);
    if (!query || query.trim().length === 0) {
      this.searchResults.set([]);
      return;
    }

    this.relationService.searchUsers(query).subscribe((result) => {
      this.searchResults.set(result.content);
    });
  }

  sendRequest(id: number) {
    const user = this.searchResults().find(
      (u) => u.idAppUser === id);

    this.relationService.sendRequest(id).subscribe(() => {
      // Retirer de la liste
      this.searchResults.update((list) =>
        list.filter((u) => u.idAppUser !== id));

      // Envoyer l’utilisateur au parent
      if (user) {
        this.requestSent.emit(user);
      }
    });
  }
}
