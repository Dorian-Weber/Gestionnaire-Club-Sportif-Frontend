import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Events } from './pages/events/events';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Detail } from './pages/detail/detail';

export const routes: Routes = [
  {path :'', component : Home},
  {path :'events', component : Events},
  {path:'login', component : Login},
  {path:'register', component : Register},
  {path:'detail', component : Detail},
];
