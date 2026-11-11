import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Heart, Pause, Play, Shuffle, SkipBack, SkipForward } from "lucide-react";

import { IconButton } from "./icon-button";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  args: { label: "Play", children: <Play aria-hidden="true" /> },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "destructive"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Icon-only button. `label` is required: it becomes the accessible name and the tooltip. Use `pressed` for toggles such as like, shuffle and mute.",
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const PrimaryPlay: Story = {
  args: { variant: "primary", size: "lg" },
};
export const Loading: Story = { args: { loading: true } };
export const Toggle: Story = {
  args: {
    label: "Like",
    pressed: true,
    variant: "secondary",
    children: <Heart aria-hidden="true" />,
  },
};

export const PlayerControls: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton label="Shuffle">
        <Shuffle aria-hidden="true" />
      </IconButton>
      <IconButton label="Previous track">
        <SkipBack aria-hidden="true" />
      </IconButton>
      <IconButton label="Pause" variant="primary" size="lg">
        <Pause aria-hidden="true" />
      </IconButton>
      <IconButton label="Next track">
        <SkipForward aria-hidden="true" />
      </IconButton>
    </div>
  ),
};
