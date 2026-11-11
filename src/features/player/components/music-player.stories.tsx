import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { MusicPlayer } from "./music-player";

const track = { title: "Midnight Drive", artist: "Nova Reyes" };

const meta = {
  title: "Music Components/MusicPlayer",
  component: MusicPlayer,
  args: {
    track,
    status: "playing",
    currentTime: 83,
    duration: 215,
    volume: 0.7,
    muted: false,
    shuffle: false,
    repeat: "off",
    liked: false,
    onTogglePlay: fn(),
    onNext: fn(),
    onPrevious: fn(),
    onSeek: fn(),
    onVolumeChange: fn(),
    onToggleMute: fn(),
    onToggleShuffle: fn(),
    onCycleRepeat: fn(),
    onToggleLike: fn(),
    onOpenQueue: fn(),
  },
  argTypes: {
    status: {
      control: "select",
      options: ["idle", "loading", "playing", "paused", "error"],
    },
    repeat: { control: "inline-radio", options: ["off", "one", "all"] },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Presentational player bar. State comes in as props and intent goes out as callbacks, so it works with any audio engine. Controls without a handler (or with no track) are disabled instead of faked.",
      },
    },
  },
} satisfies Meta<typeof MusicPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playing: Story = {};
export const Paused: Story = { args: { status: "paused" } };
export const Loading: Story = { args: { status: "loading", currentTime: 0 } };
export const Liked: Story = {
  args: { liked: true, shuffle: true, repeat: "all" },
};
export const Muted: Story = { args: { muted: true } };
export const Unavailable: Story = {
  args: {
    status: "error",
    currentTime: 0,
    errorMessage: "This track is unavailable.",
  },
};
export const NothingPlaying: Story = {
  args: { track: null, status: "idle", currentTime: 0, duration: 0 },
};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
};
