import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Slider } from "./slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  args: {
    "aria-label": "Volume",
    defaultValue: [60],
    max: 100,
    step: 1,
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Single-thumb slider. Arrow keys change the value, Home/End jump to the ends. The thumb is hidden until hover or focus to keep the player quiet.",
      },
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
