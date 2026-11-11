import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fn } from "storybook/test";

import { LyricsPanel } from "./lyrics-panel";

const meta = {
  title: "Music Components/LyricsPanel",
  component: LyricsPanel,
  args: { trackId: "track-001", currentTime: 60, onSeek: fn() },
  decorators: [
    (Story) => (
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <div className="h-96 w-[min(100vw-2rem,32rem)]">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Lyrics with loading and unavailable states. Timed lyrics highlight the current line and can be clicked to seek; plain lyrics are simply scrollable. The demo timestamps follow the catalog duration, not a real recording.",
      },
    },
  },
} satisfies Meta<typeof LyricsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Synchronized: Story = {};
export const PlainText: Story = { args: { trackId: "track-007" } };
export const Unavailable: Story = { args: { trackId: "track-002" } };
export const NothingPlaying: Story = { args: { trackId: null } };
