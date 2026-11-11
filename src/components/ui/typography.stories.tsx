import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Typography, type TypographyVariant } from "./typography";

const VARIANTS: TypographyVariant[] = [
  "display",
  "title",
  "heading",
  "subheading",
  "body",
  "small",
  "caption",
  "overline",
];

const meta = {
  title: "Components/Typography",
  component: Typography,
  args: { children: "Feel every beat", variant: "title" },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    tone: { control: "inline-radio", options: ["default", "muted"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Applies the type scale. Use `as` to change the HTML element for correct document structure without changing the look.",
      },
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Scale: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-4">
      {VARIANTS.map((variant) => (
        <Typography key={variant} variant={variant} as="div">
          {variant}: The quick brown fox jumps over the lazy dog
        </Typography>
      ))}
    </div>
  ),
};
