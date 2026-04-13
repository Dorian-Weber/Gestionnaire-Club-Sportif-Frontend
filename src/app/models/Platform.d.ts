import { Level } from './Level';

export interface Platform {
  idPlatform?: number;
  platformName: string;
  levels?: Level[];
}
