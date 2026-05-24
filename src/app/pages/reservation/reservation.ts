import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from '../../composants/button/button';
import { Seat } from '../../composants/seat/seat';
import { Tag } from '../../composants/tag/tag';
import {ActivatedRoute, RouterLink } from '@angular/router';
import { SeatService } from '../../services/seat-service';
import { EventService } from '../../services/event-service';
import { DatePipe } from '@angular/common';
import { ReservationService } from '../../services/reservation-service';

@Component({
  selector: 'app-reservation',
  imports: [Button, Seat, Tag, DatePipe, RouterLink],
  templateUrl: './reservation.html',
  styleUrl: './reservation.css',
})
export class Reservation implements OnInit {
  // On récupère l'id de l'événement pour lequel on fait la réservation
  route = inject(ActivatedRoute);
  eventId = Number(this.route.snapshot.paramMap.get('idEvent'));
  seatService = inject(SeatService);
  eventService = inject(EventService);
  reservationService = inject(ReservationService);

  availableSeats = signal<SeatDTO[]>([]);
  eventLight = signal<EventLight | null>(null);

  // bloque la réservation si déjà réserver
  canReserve = signal<CanReserveDTO | null>(null);


  ngOnInit() {
    this.eventService.getEventLight(this.eventId).subscribe((e) => {
      this.eventLight.set(e);
    });
    this.reservationService.getCanReserve(this.eventId).subscribe((res) => {
      this.canReserve.set(res);
      console.log(res);
    });
  }

  // On crée les signaux pour les différentes étapes ainsi que pour chaque choix utilisateur
  currentStep = signal(0);

  selectedSeatCount = signal<number | null>(null);
  selectedPlatform = signal<string | null>(null);
  selectedLevel = signal<string | null>(null);
  selectedSeats = signal<number[]>([]);

  //Passe d'une étape a l'autre
  nextStep(step: number) {
    this.currentStep.update((s) => (s = step));

    setTimeout(() => {
      document.getElementById(`step-${step}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
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
    if (
      this.selectedSeatCount() != null &&
      this.selectedPlatform() != null &&
      this.selectedLevel() != null
    ) {
      return this.selectedSeats().length === this.selectedSeatCount();
    }
    return false;
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

  // Charge les sièges pour la tribune et le niveau sélectionné
  loadSeats() {
    const eventId = this.eventId;
    const platform = this.selectedPlatform() ?? '';
    const level = this.selectedLevel() ?? '';

    this.seatService.getSeatFilter(eventId, platform, level).subscribe((seats) => {
      this.availableSeats.set(seats);
    });
  }
  // récupère le nom des sièges sélectionné pour l'affichage
  getSeatName(id: number) {
    return this.availableSeats().find((seat) => seat.idSeat === id)?.seatNumber ?? '';
  }
}
