import { capitalize } from '../../../shared/lib';
import { useCardEffect } from '../../../shared/lib';
import { Image } from '../../../shared/ui';
import type { Person } from '..';
import type { FC } from 'react';

interface HeroCardProps {
  person: Person;
  onClick?: (person: Person) => void;
}

// HeroCard component to display a person's details
export const PersonCard: FC<HeroCardProps> = ({ person, onClick }) => {
  const cardEffectProps = useCardEffect();

  const handleClick = () => {
    if (onClick) {
      onClick(person);
    }
  };

  return (
    <div
      className={'flex flex-col perspective-midrange relative hover:z-50 cursor-pointer'}
      onClick={handleClick}>
      <div
        className="group relative aspect-3/5 rounded-md shadow-2xl shadow-black bg-gray-600 p-4 text-yellow-200 transition-transform ease-out cursor-pointer hover:transform-[rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)]"
        {...cardEffectProps}>
        <Image
          src={`https://starwars-visualguide.com/assets/img/characters/${person.name}.jpg`}
          alt={person.name}
          className="w-full object-cover object-top rounded-b-full aspect-square"
        />

        <div className="grow flex flex-col justify-between">
          <h3 className="text-3xl font-bold mb-2">{person.name}</h3>

          <p className="flex rounded-sm border border-current mb-3 px-1 py-px text-[9px] uppercase">
            {capitalize(person.gender)}
            <span className="-my-px mx-1 inline-block w-4 border-l border-r border-current bg-[repeating-linear-gradient(-45deg,currentColor,currentColor_1px,transparent_1px,transparent_2px)]" />{' '}
            born in {person.birth_year}
          </p>

          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
            <div className="col-span-2 sm:col-span-1">
              <span className="font-semibold text-gray-300">Height:</span> {person.height} cm
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="font-semibold text-gray-300">Mass:</span> {person.mass} kg
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="font-semibold text-gray-300">Hair:</span>{' '}
              {capitalize(person.hair_color)}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="font-semibold text-gray-300">Eyes:</span>{' '}
              {capitalize(person.eye_color)}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="font-semibold text-gray-300">Skin:</span>{' '}
              {capitalize(person.skin_color)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
