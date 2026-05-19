import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Events } from './pages/events/events';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { NotFound } from './pages/not-found/not-found';
import { EditEvent } from './pages/edit-event/edit-event';
import { Reservation } from './pages/reservation/reservation';
import { userGuard } from './guards/user-guard';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'events', component: Events },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'event/reservation/:idEvent', component: Reservation,canActivate : [userGuard] },
  { path: 'event/create', component: EditEvent },
  { path: 'event/edit/:id', component: EditEvent },
  {
    path: 'event/:id',
    loadComponent: () => import('./pages/detail_event/detail_event').then((m) => m.Detail_event),
  },

  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
  { path: '**', component: NotFound },
];
