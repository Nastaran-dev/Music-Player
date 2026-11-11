import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          "Shows on hover and keyboard focus. Never put essential information only in a tooltip.",
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover or focus me</Button>
      </TooltipTrigger>
      <TooltipContent>Add to queue</TooltipContent>
    </Tooltip>
  ),
};
