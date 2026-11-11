import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchX } from "lucide-react";

import { Button } from "./button";
import { EmptyState } from "./empty-state";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  args: {
    icon: SearchX,
    title: "No results for “neon”",
    description: "Check the spelling or try a different artist, album or song.",
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithAction: Story = {
  args: { action: <Button variant="outline">Clear search</Button> },
};
