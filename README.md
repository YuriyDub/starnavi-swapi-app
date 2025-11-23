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

Configurable request delay

- For rate-limiting or demonstration, the hook currently uses a small delay between
  individual film and starship requests. The helper `waitMs` (in `useHeroDetails.ts`) is used
  with a default 300ms delay. To change the delay, edit the `waitMs` usage or extract the
  delay value into a configuration variable.

```

```
