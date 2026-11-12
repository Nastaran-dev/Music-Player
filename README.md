🎧 MELO — Feel Every Beat.

<p align="center">
  A premium music streaming experience built for music lovers.
  <br />
  Discover music, build your own playlists, and enjoy every moment.
</p>

<p align="center">
  <a href="https://melody-flow-psi.vercel.app/">
    <img src="https://img.shields.io/badge/✦_LIVE_DEMO-Explore_VYBE-9333EA?style=for-the-badge&logoColor=white" alt="Live Demo" />
  </a>
  &nbsp;
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Storybook-Documented-FF4785?style=flat-square&logo=storybook" alt="Storybook" />
</p>

---

✨ About VYBE

MELO Is a frontend-only music streaming web application designed to deliver a polished, immersive, and responsive listening experience.

Inspired by modern music platforms, MELO combines a carefully crafted design system with a feature-rich music player, interactive library, playlist management, and seamless navigation.

Built with clean architecture, reusable components, accessibility in mind, and a strong focus on user experience.

> No backend or authentication required — all user data is stored locally in the browser, with mock catalog data powering the experience.

 🖥️ Preview

<img width="1919" height="867" alt="Screenshot 2026-11-12 130150" src="https://github.com/user-attachments/assets/94e4eb86-d856-46ff-b4c8-c1a6c8ad8f20" />



 🚀 Features

 🎵 Music Experience
- Global audio engine with play, pause, seek, and volume controls.
- Shuffle and repeat playback modes.
- Next and previous track navigation.
- Playback queue with add, remove, reorder, and clear actions.
- Media Session API integration for hardware media keys and lock-screen controls.
- Expanded Now Playing experience with large artwork and dedicated controls.

 🔎 Discover & Explore
- Smart search with suggestions and search history.
- Search results organized by categories.
- Genre-based music browsing.
- Dedicated album, artist, and playlist pages.

 📚 Personal Music Library
- Liked songs and saved albums.
- Followed artists.
- Recently played tracks, albums, and playlists.
- Library filtering, sorting, and grid/list views.
- Persistent browser storage using localStorage.

 🎼 Playlist Management
- Create and delete custom playlists.
- Edit playlist details and covers.
- Add and remove tracks.
- Reorder songs using accessible menu actions.

🎤 Lyrics & Now Playing
- Dedicated lyrics and queue tabs.
- Timed lyrics for selected demo tracks.
- Full-screen expanded player experience on mobile.
- Graceful unavailable states for tracks without audio or lyrics.

 ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Space` | Play / Pause |
| `←` `→` | Seek backward / forward |
| `↑` `↓` | Volume up / down |
| `N` | Next track |
| `P` | Previous track |
| `M` | Mute / Unmute |
| `?` | Show shortcuts |

 🎨 Design & Experience

- Premium dark-first interface with light theme support.
- Custom design tokens and consistent visual language.
- Sora and Inter typography.
- Smooth transitions and micro-interactions.
- Responsive layouts for desktop, tablet, and mobile.
- Reduced-motion support.
- Accessibility-focused interaction patterns.
- Storybook documentation for reusable UI components.

 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js | Application framework |
| React | UI development |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Storybook | Component documentation |
| ESLint | Code quality |
| Prettier | Code formatting |
| Husky | Git hooks |
| Vitest | Unit and component testing |
| Playwright | End-to-end testing |


 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Automatically fix lint issues |
| `npm run typecheck` | Run strict TypeScript checks |
| `npm run format` | Format source files |
| `npm run format:check` | Check formatting |
| `npm run storybook` | Launch Storybook |
| `npm run build-storybook` | Build Storybook |
| `npm run test` | Run Vitest tests |

 🎧 Adding Your Own Music

MELO ships with a fictional catalog of 40 tracks and does not include audio files.

Tracks without a registered audio source are automatically marked as unavailable.

Important: Only use music that you own or have permission to distribute, including royalty-free or public-domain audio.

🏗️ Project Structure

```text
src/
├── app/             # Next.js App Router
├── components/      # UI primitives, shared components & layout
├── features/        # Feature-based application modules
│   ├── player/
│   ├── music-library/
│   ├── playlists/
│   ├── search/
│   ├── albums/
│   ├── artists/
│   ├── queue/
│   ├── favorites/
│   └── recommendations/
├── constants/       # Brand, motion & audio configuration
├── hooks/           # Custom React hooks
├── lib/             # Shared libraries
├── services/        # Application services
├── stores/          # State management
├── types/           # TypeScript definitions
├── utils/           # Utility functions
├── mocks/           # Mock datasets & audio sources
└── styles/          # Design tokens & theme configuration
```

⚡ Performance & Accessibility

- Lazy loading for heavy UI components.
- Code splitting for the expanded player and playlist form.
- Reduced-motion preferences respected throughout the interface.
- Accessible keyboard navigation.
- Contrast auditing for design tokens.
- Storage utilities designed to handle browser storage failures safely.
- Page-level error boundaries and graceful fallback states.


 🧪 Testing & Development

The project includes a dedicated development workflow with:

- Vitest for unit and component testing.
- Playwright for browser-based end-to-end testing.
- Storybook for isolated component development.
- Husky for Git hook automation.
- ESLint and Prettier for code consistency.

 💜 Acknowledgements

Built with passion for music, thoughtful design, and modern frontend engineering.

---

<p align="center">
  <strong>MELO — Your Music. Your Mood. Your VYBE.</strong>
  <br />
  <sub>Made with ♥ and a lot of good music.</sub>
</p>
