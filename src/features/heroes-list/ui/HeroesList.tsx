import { useCallback, type FC } from 'react';
import { useNavigate } from 'react-router';
import { PersonCard } from '../../../entities/person/ui/HeroCard';
import { routesConfig } from '../../../shared/config';
import { usePeoplesQuery } from '../../../shared/lib';
import { useIntersectionObserver } from '../../../shared/lib';
import { ErrorMessage } from '../../../shared/ui';
import type { Person } from '../../../entities/person';

export const HeroesList: FC = () => {
  const { data, loading, error, loadNextPage, hasNextPage } = usePeoplesQuery();
  const navigate = useNavigate();

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !loading) {
      loadNextPage();
    }
  }, [hasNextPage, loading, loadNextPage]);

  const observerTriggerRef = useIntersectionObserver({
    onIntersect: handleIntersect,
    options: { threshold: 1.0 },
  });

  const handlePersonCardClick = (person: Person) => {
    navigate(`${routesConfig.heroes}/${person.id}`);
  };

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="bg-gray-900">
      <div className="grid gap-4 p-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 ">
        {data.map((person) => (
          <PersonCard key={person.id} person={person} onClick={handlePersonCardClick} />
        ))}
        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-700 rounded-md aspect-3/5 shadow-2xl shadow-black"
            />
          ))}
      </div>
      <div className="mt-12 flex flex-col items-center">
        <div ref={observerTriggerRef} style={{ height: '20px' }} />
      </div>
    </div>
  );
};
