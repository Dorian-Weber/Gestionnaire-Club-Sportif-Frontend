import { Component, EventEmitter, inject, OnInit, signal } from '@angular/core';
import { Button } from '../../composants/button/button';
import { Card } from '../../composants/card/card';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-events',
  imports: [Button, Card, ReactiveFormsModule, FormsModule],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events implements OnInit {
  // Injection
  httpClient = inject(HttpClient);
  formBuilder = inject(FormBuilder);

  // Création des signaux
  fieldSport = signal<SportField[]>([]);
  fieldEventType = signal<EventTypeField[]>([]);
  eventMedium = signal<EventMedium[]>([]);

  //Création de formulaire
  formulaire = this.formBuilder.group({
    sportName: [],
    eventTypeName: [],
    search: ['' as string | null],
    dateMin : ['']
  });

  // Envoi de la requête de filtre
  onSearch() {
    const sportName = this.formulaire.value.sportName;
    const eventTypeName = this.formulaire.value.eventTypeName;
    const search = this.formulaire.value.search;
    const dateMin = this.formulaire.value.dateMin;
    const params: any = {};

    if (sportName) params.sportName = sportName;
    if (eventTypeName) params.eventTypeName = eventTypeName;
    if (search && search.trim() !== '') params.search = search.trim();
    if (dateMin) params.dateMin = dateMin;

    this.httpClient
      .get<EventMedium[]>('http://localhost:8080/event/list-event/search', { params })
      .subscribe((data) => this.eventMedium.set(data));
    console.log('PARAMS envoyés :', params);
  }

  openDatePicker() {
    const input = document.getElementById('dateMinInput') as HTMLInputElement;
    if (input) {
      input.showPicker(); // ouvre le calendrier natif
    }
  }



  //donnée charger au lancement de la page
  ngOnInit() {
    this.httpClient
      .get<SportField[]>('http://localhost:8080/sport/field')
      .subscribe((fieldSport) => this.fieldSport.set(fieldSport));

    this.httpClient
      .get<EventTypeField[]>('http://localhost:8080/event-type/field')
      .subscribe((fieldEventType) => this.fieldEventType.set(fieldEventType));

    this.httpClient
      .get<EventMedium[]>('http://localhost:8080/event/list-event')
      .subscribe((eventMedium) => this.eventMedium.set(eventMedium));
  }
}
