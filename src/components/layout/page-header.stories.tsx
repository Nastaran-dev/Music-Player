import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ui/button";

import { PageHeader } from "./page-header";

const meta = {
  title: "Layout/PageHeader",
  component: PageHeader,
  args: {
    title: "Your Library",
    description: "Saved albums, followed artists and playlists.",
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithActions: Story = {
  args: { actions: <Button variant="outline">Sort</Button> },
};
