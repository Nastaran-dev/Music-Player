<<<<<<< HEAD
# VYBE

A premium music streaming web app (frontend only, mock data) built with Next.js, React, TypeScript, Tailwind CSS v4 and Storybook.

> **Status: Phases 1–6 complete.** Phase 7 is tests (Vitest, Playwright) and final delivery checks.

## Requirements

- Node.js 20.9+ (22 recommended, see `.nvmrc`)
- npm

## Getting started

```bash
git init            # needed once, so Husky can install its git hooks
npm install         # creates package-lock.json on first run
npm run dev         # http://localhost:3000
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run typecheck` | TypeScript (strict) check |
| `npm run format` / `format:check` | Prettier |
| `npm run storybook` | Storybook at http://localhost:6006 |
| `npm run build-storybook` | Static Storybook build |

## Playing music

The catalog is fictional (40 tracks, no audio included). A track plays only when you link an audio file to it:

1. Find the track ID in [`docs/track-ids.md`](docs/track-ids.md).
2. Put the file in `public/audio/`.
3. Add one line in `src/mocks/audio-sources.ts`.
4. Open Home or Discover and click the track.

Tracks without a file show a **No audio** badge and report "unavailable" when clicked.

## What works today

- Playback with a single global audio engine (play, pause, seek, volume, shuffle, repeat, next/previous)
- Search with suggestions, history, result categories and genre browsing
- Library (playlists, saved albums, followed artists, liked songs) with filter, sort and grid/list views
- Likes, saved albums and followed artists (saved in your browser)
- Your own playlists: create, edit, change cover, add and remove songs, reorder (track menu: Move up / Move down), delete
- Queue panel: play next, add to queue, remove, reorder, clear
- Album, artist and playlist pages
- Expanded "now playing" view (click the song in the player bar): large artwork, controls, Lyrics and Queue tabs; full-screen on phones
- Lyrics for a few demo tracks (`track-001`, `track-019` timed; `track-007` plain; the rest show "unavailable")
- Recently played (songs, albums, playlists and history), saved locally
- Keyboard shortcuts (press `?` for the list): Space, ← → (seek), ↑ ↓ (volume), N, P, M

All user data lives in `localStorage` (no backend). Reordering uses menu actions instead of drag and drop, which keeps it fully keyboard accessible.

## Polish (Phase 6)

- Motion: page entrance, play/pause icon swap, expanded player slide-up, artwork transitions, card hover zoom (all respect reduced motion)
- Error handling: page-level error boundary, in-app "not found", toast when a song cannot be played, storage that never throws
- Media keys and lock-screen controls through the Media Session API
- Code splitting for the expanded player and the playlist form
- Contrast audit of every token pair and accessibility notes: [`docs/accessibility-and-performance.md`](docs/accessibility-and-performance.md)

## Adding your own music

1. Copy audio files into **`public/audio/`**.
2. Link them in **`src/mocks/audio-sources.ts`** (the only file you edit):

```ts
export const audioSources = {
  "track-001": audioFile("my-first-song.mp3"),
};
```

Tracks without an entry are treated as **unavailable**. Use only royalty-free, public-domain or your own music.

## Project structure

```
src/
├── app/            Next.js App Router (layout, routes, globals.css)
├── components/     ui (primitives), shared, layout (shell, sidebar, header, mobile nav), providers
├── features/       player, music-library, playlists, search, albums, artists, queue, favorites, recommendations
├── constants/      brand, motion tokens (JS), audio config
├── hooks/  lib/  services/  stores/  types/  utils/
├── mocks/          mock datasets + audio-sources.ts
└── styles/         tokens.css (design tokens) + theme.css (Tailwind mapping)
```

## Design system

- Tokens: `src/styles/tokens.css` (dark default + light), mapped to Tailwind in `src/styles/theme.css`.
- Fonts: Sora (display) and Inter (UI), self-hosted via Fontsource.
- Components are documented in Storybook (`npm run storybook`).
- shadcn/ui is configured (`components.json`), so `npx shadcn@latest add <component>` works. Existing components in `src/components/ui` were customized, so avoid overwriting them.
=======
# Music-Player
>>>>>>> 30852129ce90d50beb15868d7e8952b34d9edff9
