import { useQuery } from '../../../shared/lib/useQuery';
import { getPersonById } from '../api';
import type { Person } from '../model/types';

// Custom hook to fetch a person by ID using useQuery.
export const usePersonQuery = (id: string) =>
  useQuery<Person>((signal) => getPersonById(id, signal));
