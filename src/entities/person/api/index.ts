import { simpleFetch } from "../../../shared/api/apiService";
import { apiConfig } from "../../../shared/config";
import type { PeopleListResponse, PersonResponse } from "../model/types";

// Fetches the list of all people.
export const getPeople = (page?: number, signal?: AbortSignal) => {
  return simpleFetch<PeopleListResponse>(`${apiConfig.people}?page=${page}`, signal);
};

// Fetches a single person by its ID.
export const getPersonById = (id: string, signal?: AbortSignal) => {
  return simpleFetch<PersonResponse>(`${apiConfig.people}/${id}`, signal);
};
