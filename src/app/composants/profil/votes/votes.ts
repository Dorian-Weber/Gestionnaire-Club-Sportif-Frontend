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

  pendingVote = signal<VoteEventDTO[]>([]);
  completedVote = signal<VoteEventDTO[]>([]);

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

  submitVote(eventId: number) {
    const payload = {
      eventId,
      rating: this.selectedRating()[eventId],
      mvpAthleteId: this.selectedMvp()[eventId],
    };

    this.voteService.submitVote(payload).subscribe(() => {
      // Retirer de pending
      const updatedPending = this.pendingVote().filter((v) => v.voteDTO.eventId !== eventId);
      this.pendingVote.set(updatedPending);
      // Ajouter dans completed
      const voted = this.pendingVote().find((v) => v.voteDTO.eventId === eventId);
      if (voted) {
        this.completedVote.update((list) => [...list, voted]);
      }
      // Recharger depuis API
      this.voteService.getCompletedVote().subscribe((list) => {
        this.completedVote.set(list);
      });
    });
  }

  getMvpName(vote: VoteEventDTO): string {
    const mvpId = vote.voteDTO.userMvp;
    if (!mvpId) return 'Aucun MVP sélectionné';
    // Chercher dans les athlètes individuels
    const athlete = vote.athletes.find((a) => a.idAthlete === mvpId);
    if (athlete) {
      return `${athlete.athleteName} ${athlete.athleteFirstName}`;
    }
    // Chercher dans les équipes
    for (const team of vote.teams) {
      const teamAthlete = team.athletes.find((a) => a.idAthlete === mvpId);
      if (teamAthlete) {
        return `${teamAthlete.athleteName} ${teamAthlete.athleteFirstName}`;
      }
    }
    return 'Athlète introuvable';
  }
}
