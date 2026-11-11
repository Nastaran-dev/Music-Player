import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Kbd } from "./kbd";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  args: { children: "Space" },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Combination: Story = {
  render: () => (
    <span className="flex items-center gap-1">
      <Kbd>Shift</Kbd>
      <Kbd>?</Kbd>
    </span>
  ),
};
