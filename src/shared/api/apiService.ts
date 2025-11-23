import { apiConfig } from '../config';

// A minimal fetch helper.
export async function simpleFetch<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${apiConfig.baseUrl}${endpoint}`, { signal });

  if (!response.ok) {
    const errorMsg = `API Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMsg);
  }

  return response.json();
}
