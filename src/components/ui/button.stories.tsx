import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Play } from "lucide-react";

import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Play now", variant: "primary", size: "md" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "destructive"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Pill-shaped action button. Use `loading` for async actions (sets `aria-busy`) and `asChild` to style links. For icon-only buttons use `IconButton`.",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete playlist" },
};
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = {
  args: { loading: true, children: "Saving" },
};

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Play aria-hidden="true" /> Play album
    </Button>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};
