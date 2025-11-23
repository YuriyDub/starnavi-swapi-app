import { simpleFetch } from "../../../shared/api/apiService";
import { apiConfig } from "../../../shared/config";
import type { StarshipResponse } from "../model/types";

// Fetches a single starship by its ID.
export const getStarshipById = (id: string | number, signal?: AbortSignal) => {
  return simpleFetch<StarshipResponse>(`${apiConfig.starships}/${id}`, signal);
};
