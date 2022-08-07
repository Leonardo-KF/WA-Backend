import { Film } from "../entities/film.entity";

export interface SaveFilms {
  save: (films: Film[]) => Promise<void>;
}
