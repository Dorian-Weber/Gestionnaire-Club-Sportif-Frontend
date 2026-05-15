import { Component, inject, signal } from '@angular/core';
import { Button } from '../../composants/button/button';
import { Seat } from '../../composants/seat/seat';
import { Tag } from '../../composants/tag/tag';
import {ActivatedRoute} from '@angular/router';
import { SeatService } from '../../services/seat-service';

@Component({
  selector: 'app-reservation',
  imports: [Button, Seat, Tag],
  templateUrl: './reservation.html',
  styleUrl: './reservation.css',
})
export class Reservation {
  // On récupère l'id de l'événement pour lequel on fait la réservation
  route = inject(ActivatedRoute);
  eventId = Number(this.route.snapshot.paramMap.get('idEvent'));
  availableSeats = signal<SeatDTO[]>([])
  seatService = inject(SeatService);

  // On crée les signaux pour les différentes étapes ainsi que pour chaque choix utilisateur
  currentStep = signal(0);

  selectedSeatCount = signal<number | null>(null);
  selectedPlatform = signal<string | null>(null);
  selectedLevel = signal<string | null>(null);
  selectedSeats = signal<number[]>([]);

  //Passe d'une étape a l'autre
  nextStep(step: number) {
    this.currentStep.update((s) => (s = step));
  }

  // Permet de changer le bouton toggle d'actif à inactif
  selectSeatCount(count: number) {
    this.selectedSeatCount.set(count);
  }
  selectPlatform(tribune: string) {
    this.selectedPlatform.set(tribune);
  }
  selectLevel(level: string) {
    this.selectedLevel.set(level);
  }
  selectSeat(seatId: number) {
    const current = this.selectedSeats();
    const max = this.selectedSeatCount();

    if (current.includes(seatId)) {
      this.selectedSeats.set(current.filter((id) => id !== seatId));
      return;
    }
    if (max) {
      if (current.length >= max) {
        return;
      }
    }
    this.selectedSeats.set([...current, seatId]);
  }

  // Bloque le bouton continué

  canContinueStep3() {
    return this.selectedSeats().length === this.selectedSeatCount();
  }

  // reset des infos sélectionnait si retourne en arrière
  resetFromStep(step: number) {
    if (step <= 0) {
      this.selectedSeatCount.set(null);
    }
    if (step <= 1) {
      this.selectedPlatform.set(null);
    }
    if (step <= 2) {
      this.selectedLevel.set(null);
    }
    if (step <= 3) {
      this.selectedSeats.set([]);
    }
  }

  loadSeats() {
    const eventId = this.eventId;
    const userId = 1
    const platform = this.selectedPlatform() ?? '';
    const level = this.selectedLevel() ?? '';

    this.seatService.getSeatFilter(eventId, userId, platform, level)
      .subscribe(seats => {
        this.availableSeats.set(seats)});
  }


}
