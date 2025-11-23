import { describe, it, expect } from 'vitest';
import { buildGraphFromData } from './buildGraphFromData';
import type { Film } from '../../../entities/film';
import type { Person } from '../../../entities/person';
import type { Starship } from '../../../entities/starship';

// Minimal mock shapes for Person, Film and Starship used by the helper
const mockPerson = {
  id: 1,
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  gender: 'male',
  height: '172',
  mass: '77',
  films: [10, 11],
  starships: [100, 200],
};

const mockFilms = [
  {
    id: 10,
    title: 'A New Hope',
    director: 'George Lucas',
    release_date: '1977-05-25',
    episode_id: 4,
    starships: [100],
  },
  {
    id: 11,
    title: 'The Empire Strikes Back',
    director: 'Irvin Kershner',
    release_date: '1980-05-21',
    episode_id: 5,
    starships: [200],
  },
];

const mockStarships = [
  {
    id: 100,
    name: 'X-wing',
    model: 'T-65 X-wing',
    starship_class: 'Starfighter',
    manufacturer: 'Incom Corporation',
  },
  {
    id: 200,
    name: 'Millennium Falcon',
    model: 'YT-1300',
    starship_class: 'Light freighter',
    manufacturer: 'Corellian Engineering Corporation',
  },
];

describe('buildGraphFromData', () => {
  it('builds nodes and edges for hero, films and starships without performing network requests', () => {
    const { nodes, edges } = buildGraphFromData(
      mockPerson as Person,
      mockFilms as Film[],
      mockStarships as Starship[],
    );

    // Expect hero node + 2 film nodes + 2 starship nodes = 5 nodes
    expect(nodes.length).toBe(5);

    // Check hero node data
    const heroNode = nodes.find((n) => n.id === 'hero-1');
    expect(heroNode).toBeDefined();
    expect(heroNode?.data).toEqual({
      name: 'Luke Skywalker',
      birth_year: '19BBY',
      gender: 'male',
      height: '172',
      mass: '77',
    });

    // Check film node data
    const filmNode10 = nodes.find((n) => n.id === 'film-10');
    expect(filmNode10).toBeDefined();
    expect(filmNode10?.data).toEqual({
      title: 'A New Hope',
      director: 'George Lucas',
      release_date: '1977-05-25',
      episode_id: 4,
    });

    const filmNode11 = nodes.find((n) => n.id === 'film-11');
    expect(filmNode11).toBeDefined();
    expect(filmNode11?.data).toEqual({
      title: 'The Empire Strikes Back',
      director: 'Irvin Kershner',
      release_date: '1980-05-21',
      episode_id: 5,
    });

    // Check starship node data
    const starshipNode100 = nodes.find((n) => n.id === 'starship-100');
    expect(starshipNode100).toBeDefined();
    expect(starshipNode100?.data).toEqual({
      id: 100,
      name: 'X-wing',
      model: 'T-65 X-wing',
      starship_class: 'Starfighter',
      manufacturer: 'Incom Corporation',
    });

    const starshipNode200 = nodes.find((n) => n.id === 'starship-200');
    expect(starshipNode200).toBeDefined();
    expect(starshipNode200?.data).toEqual({
      id: 200,
      name: 'Millennium Falcon',
      model: 'YT-1300',
      starship_class: 'Light freighter',
      manufacturer: 'Corellian Engineering Corporation',
    });

    // Edges: hero->2 films, film->starship (2) => 4 edges
    expect(edges.length).toBe(4);

    // Check one of the film->starship edges exists
    expect(edges.some((e) => e.source === 'film-10' && e.target === 'starship-100')).toBe(true);
  });
});
