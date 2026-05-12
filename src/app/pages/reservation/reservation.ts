import { Component, signal } from '@angular/core';
import { Button } from '../../composants/button/button';
import { Seat } from '../../composants/seat/seat';

@Component({
  selector: 'app-reservation',
  imports: [Button, Seat],
  templateUrl: './reservation.html',
  styleUrl: './reservation.css',
})
export class Reservation {
  currentStep = signal(0);

  selectedSeatCount = signal<number | null>(null);
  selectedTribune = signal<string | null>(null);
  selectedLevel = signal<string | null>(null);
  selectedSeats = signal<number[]>([]);

  //Passe d'une étape a l'autre
  nextStep(step: number) {
    this.currentStep.update((s) => s = step);
  }

  // Permet de changer le bouton toggle d'actif à inactif
  selectSeatCount(count: number) {
    this.selectedSeatCount.set(count);
  }
  selectTribune(tribune: string) {
    this.selectedTribune.set(tribune);
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
  canContinueStep0() {
    return this.selectedSeatCount() !== null;
  }

  canContinueStep1() {
    return this.selectedTribune() !== null;
  }

  canContinueStep2() {
    return this.selectedLevel() !== null;
  }

  canContinueStep3() {
    return this.selectedSeats().length === this.selectedSeatCount();
  }
}
