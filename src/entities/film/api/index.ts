import { simpleFetch } from '../../../shared/api/apiService';
import { apiConfig } from '../../../shared/config';
import type { FilmResponse } from '../model/types';

// Fetches a single film by its ID.
export const getFilmById = (id: string | number, signal?: AbortSignal) => {
  return simpleFetch<FilmResponse>(`${apiConfig.films}/${id}`, signal);
};
