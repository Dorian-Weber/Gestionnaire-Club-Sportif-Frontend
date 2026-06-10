import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from '../../button/button';
import { VoteService } from '../../../services/vote-service';
import { list } from 'postcss';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-votes',
  imports: [Button, DatePipe],
  templateUrl: './votes.html',
  styleUrl: './votes.css',
})
export class Votes implements OnInit {
  voteService = inject(VoteService);

  pendingVote = this.voteService.pendingVote;
  completedVote = this.voteService.completedVote;

  selectedRating = signal<{ [eventId: number]: number }>({});
  selectedMvp = signal<{ [eventId: number]: number | null }>({});
  selectedTeam = signal<{ [eventId: number]: number | null }>({});

  updateRating(eventId: number, rating: number) {
    this.selectedRating.update((r) => ({ ...r, [eventId]: rating }));
  }

  updateMvp(eventId: number, athleteId: number | null) {
    this.selectedMvp.update((m) => ({ ...m, [eventId]: athleteId }));
  }

  updateTeam(eventId: number, teamId: number | null) {
    this.selectedTeam.update((t) => ({ ...t, [eventId]: teamId }));
  }

  ngOnInit() {
    this.voteService.getPendingVote().subscribe((list) => {
      this.pendingVote.set(list);
    });
    this.voteService.getCompletedVote().subscribe((list) => {
      this.completedVote.set(list);
    });
  }

  getMvpName(vote: VoteEventDTO): string {
    const mvpId = vote.voteDTO.userMvp;
    if (!mvpId) return 'Aucun MVP sélectionné';
    // 1. Chercher dans les athlètes individuels
    const athlete = vote.athletes.find((a) => a.idAthlete === mvpId);
    if (athlete) {
      return `${athlete.athleteName} ${athlete.athleteFirstName}`;
    }
    // 2. Chercher dans les équipes
    for (const team of vote.teams) {
      const teamAthlete = team.athletes.find((a) => a.idAthlete === mvpId);
      if (teamAthlete) {
        return `${teamAthlete.athleteName} ${teamAthlete.athleteFirstName}`;
      }
    }
    return 'Athlète introuvable';
  }
}
