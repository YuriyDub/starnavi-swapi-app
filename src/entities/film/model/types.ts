import type { BaseResource } from '../../../shared/api';

// Film entity interface
export interface Film extends BaseResource {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: number[];
  planets: number[];
  species: number[];
  starships: number[];
  vehicles: number[];
}

// Response for /films/:id/
export type FilmResponse = Film;
