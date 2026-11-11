import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fn } from "storybook/test";

import { EmptyState } from "@/components/ui/empty-state";
import { ListMusic } from "lucide-react";

import { ExpandedPlayerContent } from "./expanded-player-content";
import { LyricsPanel } from "./lyrics-panel";

const meta = {
  title: "Music Components/ExpandedPlayer",
  component: ExpandedPlayerContent,
  args: {
    track: {
      title: "Midnight Drive",
      artist: "Nova Reyes",
      coverUrl: "/covers/albums/album-001.jpg",
    },
    status: "playing",
    currentTime: 60,
    duration: 212,
    volume: 0.7,
    muted: false,
    shuffle: false,
    repeat: "off",
    liked: true,
    onTogglePlay: fn(),
    onNext: fn(),
    onPrevious: fn(),
    onSeek: fn(),
    onVolumeChange: fn(),
    onToggleMute: fn(),
    onToggleShuffle: fn(),
    onCycleRepeat: fn(),
    onToggleLike: fn(),
    onClose: fn(),
    lyrics: <LyricsPanel trackId="track-001" currentTime={60} />,
    queue: (
      <EmptyState icon={ListMusic} title="Your queue is empty" description="Add songs to see them here." />
    ),
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <div className="h-screen w-screen">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full-screen now playing layout: large artwork and controls beside Lyrics / Queue tabs. On phones it stacks vertically.",
      },
    },
  },
} satisfies Meta<typeof ExpandedPlayerContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Paused: Story = { args: { status: "paused" } };
export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
};
