import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { TrackRow } from "./track-row";

const meta = {
  title: "Music Components/TrackRow",
  component: TrackRow,
  args: {
    index: 1,
    title: "Midnight Drive",
    artistName: "Nova Reyes",
    albumTitle: "Neon Afterglow",
    coverUrl: "/covers/albums/album-001.jpg",
    duration: 212,
    isExplicit: false,
    isAvailable: true,
    isCurrent: false,
    isPlaying: false,
    onPlay: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-[min(100vw-2rem,48rem)]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "One row in a track list. The play button is the main control and has a descriptive label. Hover or focus swaps the number for a play icon.",
      },
    },
  },
} satisfies Meta<typeof TrackRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Playing: Story = { args: { isCurrent: true, isPlaying: true } };
export const Paused: Story = { args: { isCurrent: true, isPlaying: false } };
export const Explicit: Story = {
  args: { title: "Late Bus Home", isExplicit: true },
};
export const Unavailable: Story = { args: { isAvailable: false } };
