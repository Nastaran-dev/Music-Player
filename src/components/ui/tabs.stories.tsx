import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          "Accessible tabs: arrow keys move between tabs, Tab moves into the panel. Used by Library and Search results.",
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="songs" className="w-96">
      <TabsList aria-label="Result types">
        <TabsTrigger value="songs">Songs</TabsTrigger>
        <TabsTrigger value="artists">Artists</TabsTrigger>
        <TabsTrigger value="albums">Albums</TabsTrigger>
      </TabsList>
      <TabsContent value="songs">Songs panel</TabsContent>
      <TabsContent value="artists">Artists panel</TabsContent>
      <TabsContent value="albums">Albums panel</TabsContent>
    </Tabs>
  ),
};
