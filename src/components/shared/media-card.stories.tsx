import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CardGrid, MediaCard } from "./media-card";

const meta = {
  title: "Music Components/MediaCard",
  component: MediaCard,
  args: {
    href: "/albums/album-01",
    title: "Neon Afterglow",
    subtitle: "2024 · Nova Reyes",
    coverUrl: "/covers/albums/album-001.jpg",
    trackIds: ["track-001", "track-002", "track-003"],
  },
  decorators: [
    (Story) => (
      <div className="w-48">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Base card behind AlbumCard, ArtistCard and PlaylistCard. The title link covers the card (one tab stop) and the play button appears on hover, focus and touch devices.",
      },
    },
  },
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Album: Story = {};
export const Artist: Story = {
  args: {
    href: "/artists/artist-01",
    title: "Nova Reyes",
    subtitle: "Artist",
    coverUrl: "/covers/artists/artist-01.jpg",
    round: true,
  },
};
export const Grid: Story = {
  decorators: [
    (Story) => (
      <div className="w-[min(100vw-2rem,60rem)]">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <CardGrid>
      {[1, 2, 3, 4, 5].map((n) => (
        <MediaCard
          key={n}
          {...args}
          title={`Album ${n}`}
          coverUrl={`/covers/albums/album-0${n}.jpg`}
        />
      ))}
    </CardGrid>
  ),
};
