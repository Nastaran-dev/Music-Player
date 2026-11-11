import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const RADII = ["sm", "md", "lg", "xl", "2xl", "3xl"] as const;
const SHADOWS = ["elevation-1", "elevation-2", "elevation-3", "glow"] as const;

function Surfaces() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <section className="flex flex-col gap-3">
        <h3 className="font-display text-subheading font-semibold">Radius</h3>
        <div className="flex flex-wrap gap-4">
          {RADII.map((radius) => (
            <div key={radius} className="flex flex-col items-center gap-2">
              <div
                className="size-20 border border-border bg-surface-2"
                style={{ borderRadius: `var(--radius-${radius})` }}
              />
              <code className="text-caption text-muted-foreground">{radius}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="font-display text-subheading font-semibold">Elevation</h3>
        <div className="flex flex-wrap gap-6">
          {SHADOWS.map((shadow) => (
            <div key={shadow} className="flex flex-col items-center gap-3">
              <div
                className="size-24 rounded-xl bg-surface-2"
                style={{ boxShadow: `var(--${shadow === "glow" ? "glow-primary" : shadow})` }}
              />
              <code className="text-caption text-muted-foreground">{shadow}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: "Foundations/Radius and elevation",
  component: Surfaces,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Surfaces>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
