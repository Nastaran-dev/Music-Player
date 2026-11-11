import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  args: { placeholder: "Search songs, artists, albums", "aria-label": "Search" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: "Nova Reyes" } };
export const Disabled: Story = { args: { disabled: true } };
