import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Music2 } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";

import { AppShell } from "./app-shell";
import { PageHeader } from "./page-header";

const meta = {
  title: "Layout/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true, navigation: { pathname: "/" } },
    docs: {
      description: {
        component:
          "The application frame: sidebar, sticky header, scrolling main column and the persistent bottom player. Resize the viewport to see the tablet and phone layouts.",
      },
    },
  },
  args: {
    children: (
      <>
        <PageHeader
          title="Good evening"
          description="Your music, playlists and recommendations in one place."
        />
        <EmptyState
          icon={Music2}
          title="Your music will appear here"
          description="Content arrives once the music catalog is connected."
        />
      </>
    ),
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
};
