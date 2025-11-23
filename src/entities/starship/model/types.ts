import type { BaseResource } from "../../../shared/api";

export interface Starship extends BaseResource {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  films: number[];
  pilots: number[];
}

// Response for /starships/:id/
export type StarshipResponse = Starship;
