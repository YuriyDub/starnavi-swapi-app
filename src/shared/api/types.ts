// Generic interface for base resource fields.
export interface BaseResource {
  id: number;
  url: string;
  created: string;
  edited: string;
}

//  Generic interface for paginated API list responses.
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
