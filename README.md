# Starnavi SWAPI App

Lightweight React + TypeScript demo app that visualizes a Star Wars person (hero)
and related entities (films and starships) as an interactive graph using React Flow.

This repository is organized using a Feature-Sliced Design (FSD)-like layout:

- `src/entities` — domain entities (person, film, starship) and their UI nodes
- `src/features` — feature-level orchestration (hero details view, graph)
- `src/shared` — shared UI, hooks and utilities (e.g., `BaseNode`, `useCardEffect`)

Key ideas and goals

- Clean, well-typed TypeScript code with clear naming (no ambiguous abbreviations).
- Reusable UI building blocks (`BaseNode`) and small pure helpers for testability.
- Unit tests must not perform real network requests.
- Simple, maintainable code following SOLID / DRY / KISS principles.

Tech stack

- React 19 + TypeScript
- React Flow for graph rendering
- TailwindCSS for styling
- Vitest + @testing-library for unit tests

Quick start

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

Linting

```bash
npm run lint
```

Testing

- Run tests in watch mode:

```bash
npm run test
```

- Run tests once (CI-friendly):

```bash
npm run test:run
```

Important: Tests must never perform real network requests.

- The repository contains a pure helper `buildGraphFromData(person, films, starships)`
  (in `src/features/hero-details/lib/useHeroDetails.ts`) that builds React Flow `nodes` and
  `edges`. Unit tests should import and exercise this helper directly rather than
  invoking hooks that perform fetching.

Where to look next

- `src/features/hero-details/lib/useHeroDetails.ts` — orchestrates fetching and builds
  graph nodes/edges. To avoid network calls in tests, use the exported `buildGraphFromData`.
- `src/features/hero-details/ui/GraphView.tsx` — React Flow wrapper and node registrations.
- `src/entities/*/ui/*` — node components (HeroNode, FilmNode, StarshipNode) using `BaseNode`.
- `src/shared/ui/BaseNode.tsx` — shared card wrapper used by nodes.

Hooks

- `useHeroDetails(id?: string)` — `src/features/hero-details/lib/useHeroDetails.ts`

  - Purpose: orchestrates fetching a `Person` and related `Film` and `Starship` entities,
    then builds React Flow `nodes` and `edges` for the graph view.
  - Returns: `{ nodes: Node[], edges: Edge[], loading: boolean, error: Error | null, person: Person | null }`.
  - Notes: The module also exports a pure helper `buildGraphFromData(person, films, starships)`
    which constructs the `nodes`/`edges` from already-fetched data — use this helper in
    unit tests to avoid network calls.

- `usePersonQuery(id: string)` — `src/entities/person/lib/usePersonQuery.tsx`

  - Purpose: thin hook wrapper around the shared `useQuery` to fetch a `Person` by id.
  - Returns: `{ data: Person | null, loading: boolean, error: Error | null }`.
  - Testing: Mock `useQuery` or `getPersonById` when testing components/hooks that use this.

- `useQuery<T>(fetcher)` — `src/shared/lib/useQuery.tsx`

  - Purpose: small generic hook for data fetching with `AbortController` support.
  - Returns: `{ data: T | null, loading: boolean, error: Error | null }`.
  - Testing: Keep network calls isolated; for unit tests, stub the `fetcher` function.

- `useCardEffect()` — `src/shared/hooks/useCardEffect.tsx` (or `src/shared/lib`)

  - Purpose: exposes pointer event handlers to create the card tilt/shine effect used
    by `BaseNode` and other card-like components.
  - Returns: `{ onMouseEnter, onMouseMove, onMouseLeave }` handlers to spread on the card root.
  - Testing: Render components with the handlers and fire events using `@testing-library/react`.

- `useIntersectionObserver` and other small hooks — `src/shared/hooks` (or `src/shared/lib`)
  - Purpose: reusable utilities (e.g., lazy-loading images, intersection detection for animations).
  - Testing: Use `jsdom` helpers or mock the observer.

Testing guidelines for hooks

- Prefer testing pure helpers (like `buildGraphFromData`) directly. These tests are reliable
  and do not require network mocking.
- For hooks that perform network I/O, mock the underlying network functions (for example,
  `getFilmById`, `getStarshipById`, `getPersonById`, or the `useQuery` fetcher) so tests do not
  perform real requests.
- Use `vitest` + `@testing-library/react` for hook/component tests. Example:

```ts
// Example: test buildGraphFromData without network
import { buildGraphFromData } from './useHeroDetails';
// assert nodes/edges shape with small mocked data
```

Configurable request delay

- For rate-limiting or demonstration, the hook currently uses a small delay between
  individual film and starship requests. The helper `waitMs` (in `useHeroDetails.ts`) is used
  with a default 300ms delay. To change the delay, edit the `waitMs` usage or extract the
  delay value into a configuration variable.

```

```
