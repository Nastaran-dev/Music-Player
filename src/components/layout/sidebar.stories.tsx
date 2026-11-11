import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { useUiStore } from "@/stores/ui-store";

import { Sidebar } from "./sidebar";

const meta = {
  title: "Layout/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <div className="flex h-screen">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true, navigation: { pathname: "/library" } },
    docs: {
      description: {
        component:
          "Desktop and tablet navigation. Full width from `lg`, always compact between `md` and `lg`, and collapsible by the user (persisted). Phones use MobileNav.",
      },
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  beforeEach: () => {
    useUiStore.setState({ sidebarCollapsed: false });
  },
};

export const Collapsed: Story = {
  beforeEach: () => {
    useUiStore.setState({ sidebarCollapsed: true });
    return () => useUiStore.setState({ sidebarCollapsed: false });
  },
};
