import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { PlayerControls } from "./player-controls";

const meta = {
  title: "Music Components/PlayerControls",
  component: PlayerControls,
  args: {
    status: "paused",
    hasTrack: true,
    shuffle: false,
    repeat: "off",
    onTogglePlay: fn(),
    onNext: fn(),
    onPrevious: fn(),
    onToggleShuffle: fn(),
    onCycleRepeat: fn(),
  },
  argTypes: {
    status: { control: "select", options: ["idle", "loading", "playing", "paused", "error"] },
    repeat: { control: "inline-radio", options: ["off", "one", "all"] },
  },
} satisfies Meta<typeof PlayerControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paused: Story = {};
export const Playing: Story = { args: { status: "playing" } };
export const Loading: Story = { args: { status: "loading" } };
export const ShuffleAndRepeat: Story = { args: { shuffle: true, repeat: "all" } };
export const Disabled: Story = { args: { hasTrack: false, status: "idle" } };
