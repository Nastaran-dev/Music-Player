
type Bezier = [number, number, number, number];

export const DURATION = {
  fast: 0.12,
  base: 0.2,
  slow: 0.36,
} as const;

export const EASE: Record<"standard" | "emphasized", Bezier> = {
  standard: [0.2, 0, 0, 1],
  emphasized: [0.3, 0, 0, 1],
};
