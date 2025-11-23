import type { BaseResource, PaginatedResponse } from '../../../shared/api';

// Person entity interface
export interface Person extends BaseResource {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: number;
  films: number[];
  species: number[];
  starships: number[];
  vehicles: number[];
}

// Response for /people/
export type PeopleListResponse = PaginatedResponse<Person>;

// Response for /people/:id/
export type PersonResponse = Person;
