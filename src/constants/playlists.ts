
export const PLAYLIST_COVER_OPTIONS: readonly string[] = Array.from(
  { length: 12 },
  (_, i) => `/covers/playlists/playlist-${String(i + 1).padStart(2, "0")}.svg`,
);

export const PLAYLIST_TITLE_MAX = 60;
export const PLAYLIST_DESCRIPTION_MAX = 200;
