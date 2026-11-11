import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Skeleton } from "./skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          "Decorative placeholder (`aria-hidden`). Wrap the loading region with `aria-busy` so assistive tech knows content is loading.",
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { className: "h-4 w-48" } };

export const TrackRowLoading: Story = {
  render: () => (
    <div aria-busy="true" className="flex w-80 items-center gap-3">
      <Skeleton className="size-12 rounded-md" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ),
};
