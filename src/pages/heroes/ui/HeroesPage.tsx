import { type FC } from 'react';
import { HeroesList } from '../../../features/heroes-list/ui/HeroesList';

export const HeroesPage: FC = () => {
  return (
    <div>
      <h1 className="w-full text-center text-5xl font-bold uppercase pt-10">Heroes</h1>
      <main className="md:w-4/5 mx-auto">
        <HeroesList />
      </main>
    </div>
  );
};
