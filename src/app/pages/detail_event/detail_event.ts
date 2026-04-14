import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Button } from '../../composants/button/button';
import { Tag } from '../../composants/tag/tag';
import { EventService } from '../../services/event-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { InfoAthlete } from '../../composants/info-athlete/info-athlete';

@Component({
  selector: 'app-detail_event',
  imports: [RouterLink, Button, Tag, DatePipe, InfoAthlete],
  templateUrl: './detail_event.html',
  styleUrl: './detail_event.css',
})
export class Detail_event {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);

  event = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.eventService.getEventById(id);
      }),
    ),
    { initialValue: null },
  );
}
