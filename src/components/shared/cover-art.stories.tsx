import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CoverArt } from "./cover-art";

const meta = {
  title: "Components/CoverArt",
  component: CoverArt,
  args: { sizes: "160px", className: "size-40 rounded-xl" },
  parameters: {
    docs: {
      description: {
        component:
          "Artwork with a branded fallback. The fallback shows when `src` is missing or fails to load, so layouts never break.",
      },
    },
  },
} satisfies Meta<typeof CoverArt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = {};
export const BrokenImage: Story = { args: { src: "/covers/does-not-exist.jpg" } };
