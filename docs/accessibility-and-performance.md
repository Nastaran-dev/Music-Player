# Accessibility and performance notes

What was checked in Phase 6 and what is still manual.

## Color contrast (WCAG 2.2 AA)

Every text/background pair used by the tokens in `src/styles/tokens.css` was
measured in both themes (normal text needs 4.5:1, UI components 3:1).
All pairs pass, including muted text on every surface, primary/accent/destructive
buttons, the soft status badges and the focus ring.

Re-check this whenever you change a color token.

## Built in

- Skip link, landmarks (header, nav, main, aside), one `<h1>` per page
- Visible focus rings on every control; icon-only buttons always have an accessible name
- Toggle controls use `aria-pressed`; the current page uses `aria-current="page"`
- Dialogs and drawers (Radix) trap focus, close on Escape and return focus
- Live regions: "Now playing" announcements and playback errors
- Keyboard shortcuts that stay out of the way while typing or on controls using the same key
- `prefers-reduced-motion`: CSS animations are shortened globally and Motion removes movement
- Reordering uses menu actions (Move up / Move down), not drag and drop

## Manual checks worth doing before release

- Screen reader pass (VoiceOver or NVDA) on Home, a playlist page and the expanded player
- Keyboard-only pass: Tab through the sidebar, track rows, the player bar and dialogs
- Zoom to 200% and test a phone-width window
- Lighthouse (Accessibility + Performance) on `npm run build && npm run start`

## Performance choices

- Server Components by default; client code only where interaction needs it
- One shared audio element; audio is never preloaded (`preload="metadata"` for the current song only)
- Code splitting: the expanded player (lyrics, queue) and the playlist form (react-hook-form, zod)
  are downloaded the first time they are opened
- Track menus create their "Add to playlist" dialog only on first use
- Selectors use `useShallow` so components re-render only for the state they read
- Artwork has fixed aspect ratios (no layout shift), SVG covers skip the image optimizer
- Not done on purpose: blanket `React.memo`. Add it only after profiling shows a hot spot.
  (The player bar re-renders about 4 times a second while playing, which is cheap.)
