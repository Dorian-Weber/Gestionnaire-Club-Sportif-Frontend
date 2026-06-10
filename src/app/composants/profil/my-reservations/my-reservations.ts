import { Component, inject, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-reservations',
  imports: [DatePipe],
  templateUrl: './my-reservations.html',
  styleUrl: './my-reservations.css',
})
export class MyReservations implements OnInit {
  reservationService = inject(ReservationService);

  myReservations = this.reservationService.myReservations;

  ngOnInit() {
    this.reservationService.getMyReservations().subscribe((list) => {
      this.myReservations.set(list);
    });
  }
}
