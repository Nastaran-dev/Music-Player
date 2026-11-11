import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const GROUPS: Record<string, string[]> = {
  Surfaces: ["background", "surface-1", "surface-2", "surface-3", "card", "popover"],
  Brand: ["primary", "primary-hover", "accent", "brand-violet", "brand-cyan"],
  Text: ["foreground", "muted-foreground", "primary-foreground", "accent-foreground"],
  Status: [
    "destructive",
    "subtle-primary",
    "subtle-accent",
    "subtle-success",
    "subtle-warning",
    "subtle-destructive",
  ],
  Lines: ["border", "input", "ring"],
};

function Swatch({ token }: { token: string }) {
  return (
    <div className="flex w-36 flex-col gap-2">
      <div
        className="h-16 rounded-lg border border-border"
        style={{ background: `var(--${token})` }}
      />
      <code className="text-caption text-muted-foreground">--{token}</code>
    </div>
  );
}

function Palette() {
  return (
    <div className="flex flex-col gap-8 p-6">
      {Object.entries(GROUPS).map(([group, tokens]) => (
        <section key={group} className="flex flex-col gap-3">
          <h3 className="font-display text-subheading font-semibold">{group}</h3>
          <div className="flex flex-wrap gap-4">
            {tokens.map((token) => (
              <Swatch key={token} token={token} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundations/Colors",
  component: Palette,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Semantic color tokens defined in `src/styles/tokens.css`. Switch the theme in the toolbar to compare dark and light values.",
      },
    },
  },
} satisfies Meta<typeof Palette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palettes: Story = {};
