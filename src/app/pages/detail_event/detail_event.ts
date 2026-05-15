import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';
import { Tag } from '../../composants/tag/tag';
import { EventService } from '../../services/event-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { InfoAthlete } from '../../composants/info-athlete/info-athlete';
import { InfoTeam } from '../../composants/info-team/info-team';

@Component({
  selector: 'app-detail_event',
  imports: [RouterLink, Button, Tag, DatePipe, InfoAthlete, InfoTeam],
  templateUrl: './detail_event.html',
  styleUrl: './detail_event.css',
})
export class Detail_event {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);
  private router = inject(Router);

  eventFull:Signal<EventFull | null> = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));

        return this.eventService.getEventFull(id)
          .pipe(
          catchError(() => {
            this.router.navigate(['/not-found']);
            return of(null)
          })
        );
      }),
    ),
    { initialValue: null },
  );

  goToReservation(){
    this.router.navigate(['/event/reservation', this.eventFull()?.eventMedium.idEvent]);
  }
}
