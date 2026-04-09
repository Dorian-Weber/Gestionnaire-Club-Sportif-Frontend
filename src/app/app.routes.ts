import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Events } from './pages/events/events';

export const routes: Routes = [
  {path :'', component : Home},
  {path :'events', component : Events}
];
