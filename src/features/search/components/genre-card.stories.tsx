import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { genres } from "@/mocks/genres";

import { GenreCard } from "./genre-card";

const meta = {
  title: "Music Components/GenreCard",
  component: GenreCard,
  args: { genre: genres[0]! },
  decorators: [
    (Story) => (
      <div className="w-56">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GenreCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pop: Story = {};
export const Electronic: Story = { args: { genre: genres[1]! } };
export const Jazz: Story = { args: { genre: genres[4]! } };
