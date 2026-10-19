import { Client } from './../../client/model/Client';
import { Game } from './../../game/model/Game';

export interface Prestamo {
  id: number;
  game: Game;
  client: Client;
  startDate: string;
  endDate: string;
}
