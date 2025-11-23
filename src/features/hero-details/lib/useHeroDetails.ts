import { useEffect, useMemo, useState } from 'react';
import { getFilmById } from '../../../entities/film';
import { getStarshipById } from '../../../entities/starship';
import { usePersonQuery } from '../../../shared/lib';
import { buildGraphFromData } from './buildGraphFromData';
import type { Film } from '../../../entities/film';
import type { Person } from '../../../entities/person';
import type { Starship } from '../../../entities/starship';
import type { Node, Edge } from 'reactflow';

type UseHeroDetailsResult = {
  nodes: Node[];
  edges: Edge[];
  loading: boolean;
  error: Error | null;
  person: Person | null;
};

export const useHeroDetails = (id?: string): UseHeroDetailsResult => {
  const { data: person, loading: personLoading, error: personError } = usePersonQuery(id ?? '');
  // Extra data fetched for the selected person
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loadingExtraData, setLoadingExtraData] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  useEffect(() => {
    if (!person) return;

    const abortController = new AbortController();
    const { signal } = abortController;

    // Fetch films and then only the starships that are both in the films and belong to the person
    const loadExtraData = async () => {
      setLoadingExtraData(true);
      setFetchError(null);

      try {
        const filmPromises = person.films.map((fid: number) => getFilmById(fid, signal));
        const filmsRes = await Promise.all(filmPromises);
        if (signal.aborted) return;
        setFilms(filmsRes);

        // Collect unique starship ids that appear in the person's films and belong to the person
        const starshipIdsSet = new Set<number>();
        for (const film of filmsRes) {
          for (const sid of film.starships) {
            if (person.starships.includes(sid)) starshipIdsSet.add(sid);
          }
        }

        const starshipIds = Array.from(starshipIdsSet);
        const starshipPromises = starshipIds.map((sid) => getStarshipById(sid, signal));
        const starshipsRes = await Promise.all(starshipPromises);
        if (signal.aborted) return;
        setStarships(starshipsRes);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') setFetchError(err);
      } finally {
        if (!signal.aborted) setLoadingExtraData(false);
      }
    };

    loadExtraData();

    return () => abortController.abort();
  }, [person]);

  // Build nodes and edges for React Flow using person + fetched film/starship data
  const { nodes, edges } = useMemo(
    () => buildGraphFromData(person, films, starships),
    [person, films, starships],
  );

  return {
    nodes,
    edges,
    loading: personLoading || loadingExtraData,
    error: personError ?? fetchError,
    person,
  };
};

export default useHeroDetails;
