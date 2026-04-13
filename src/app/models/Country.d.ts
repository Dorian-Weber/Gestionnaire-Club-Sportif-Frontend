import { Athlete } from './Athlete';

export interface Country {
  idCountry?: number;
  countryName: string;
  athletes?: Athlete[];
}
