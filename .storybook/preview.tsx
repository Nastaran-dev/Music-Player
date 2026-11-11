import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByClassName } from "@storybook/addon-themes";

import { TooltipProvider } from "@/components/ui/tooltip";

import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disabled: true },
    a11y: { test: "todo" },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          "Components",
          "Music Components",
          "Layout",
          "Patterns",
          "Pages",
        ],
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: { dark: "dark", light: "light" },
      defaultTheme: "dark",
    }),
    (Story) => (
      <TooltipProvider delayDuration={200}>
        <Story />
      </TooltipProvider>
    ),
  ],
  tags: ["autodocs"],
};

export default preview;
