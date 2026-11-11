import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "New release", variant: "primary" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "neutral",
        "primary",
        "accent",
        "success",
        "warning",
        "destructive",
        "outline",
      ],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Available</Badge>
      <Badge variant="warning">Low quality</Badge>
      <Badge variant="destructive">Unavailable</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};
