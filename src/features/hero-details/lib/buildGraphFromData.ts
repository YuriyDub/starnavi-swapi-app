import type { Film } from '../../../entities/film';
import type { Person } from '../../../entities/person';
import type { Starship } from '../../../entities/starship';
import type { Edge, Node } from 'reactflow';

/**
 * buildGraphFromData
 * Pure helper that builds React Flow nodes and edges from the given
 * person, films and starships collections. Extracted to allow unit testing
 * without performing network requests.
 */
export const buildGraphFromData = (
  person: Person | null,
  films: Film[],
  starships: Starship[],
): { nodes: Node[]; edges: Edge[] } => {
  if (!person) return { nodes: [] as Node[], edges: [] as Edge[] };

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const heroNodeId = `hero-${person.id}`;
  nodes.push({
    id: heroNodeId,
    type: 'hero',
    data: {
      name: person.name,
      birth_year: person.birth_year,
      gender: person.gender,
      height: person.height,
      mass: person.mass,
    },
    position: { x: 400, y: 50 },
  });

  const spacing = 250;
  const startX = 200;
  const starshipNodeMap = new Map<number, string>();

  films.forEach((film, fi) => {
    const fx = startX + fi * spacing;
    const filmNodeId = `film-${film.id}`;

    nodes.push({
      id: filmNodeId,
      type: 'film',
      data: {
        title: film.title,
        director: film.director,
        release_date: film.release_date,
        episode_id: film.episode_id,
      },
      position: { x: fx, y: 250 },
    });

    edges.push({
      id: `e-${heroNodeId}-${filmNodeId}`,
      source: heroNodeId,
      target: filmNodeId,
      sourceHandle: 'source',
      targetHandle: 'target',
      animated: true,
      style: { stroke: 'yellow' },
    });

    const shipIdsForThisFilm = film.starships.filter((s) => person.starships.includes(s));

    shipIdsForThisFilm.forEach((sid, si) => {
      let nodeId = starshipNodeMap.get(sid);
      if (!nodeId) {
        nodeId = `starship-${sid}`;
        starshipNodeMap.set(sid, nodeId);

        const offset = si * spacing;
        const shipInfo = starships.find((s) => s.id === sid);
        nodes.push({
          id: nodeId,
          type: 'starship',
          data: {
            id: sid,
            name: shipInfo?.name,
            model: shipInfo?.model,
            starship_class: shipInfo?.starship_class,
            manufacturer: shipInfo?.manufacturer,
          },
          position: { x: fx + offset, y: 420 },
        });
      }

      edges.push({
        id: `e-${filmNodeId}-${nodeId}`,
        source: filmNodeId,
        target: nodeId,
        sourceHandle: 'source',
        targetHandle: 'target',
        animated: true,
        style: { stroke: 'yellow' },
      });
    });
  });

  return { nodes, edges };
};
