import { useState, useCallback, useEffect } from 'react';
import { getPeople } from '../api';
import type { Person } from '../model/types';

// Custom hook to fetch and manage a paginated list of people.
export const usePeoplesQuery = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPage = useCallback(async (pageToFetch: number) => {
    // Set the correct loading state
    setLoading(true);
    setError(null);

    try {
      // Call the API for the specific page
      const data = await getPeople(pageToFetch);

      // Append the new results to the existing list
      setPeople((prevPeople) => [...prevPeople, ...data.results]);

      // Check if there is a 'next' URL and extract the page number
      if (data.next) {
        const url = new URL(data.next);
        const nextPageNum = url.searchParams.get('page');
        setNextPage(nextPageNum ? Number(nextPageNum) : null);
      } else {
        setNextPage(null);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      // Clear the correct loading state
      setLoading(false);
    }
  }, []);

  // Fetch the first page on mount
  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  // Public function to be called by the UI to load more
  const loadNextPage = useCallback(() => {
    if (!nextPage || loading) {
      return;
    }
    fetchPage(nextPage);
  }, [nextPage, loading, fetchPage]);

  return {
    data: people,
    loading: loading,
    error,
    loadNextPage,
    hasNextPage: nextPage !== null,
  };
};
