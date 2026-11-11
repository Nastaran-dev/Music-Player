import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  args: { size: "md" },
  argTypes: {
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Shows an image and falls back to initials when the image fails to load. Always give the image meaningful `alt` text.",
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/does-not-exist.jpg" alt="Nova Reyes" />
      <AvatarFallback>NR</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>V</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};
