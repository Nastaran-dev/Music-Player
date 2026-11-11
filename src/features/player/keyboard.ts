export type ShortcutAction =
  | "togglePlay"
  | "seekForward"
  | "seekBackward"
  | "volumeUp"
  | "volumeDown"
  | "next"
  | "previous"
  | "toggleMute"
  | "showHelp";

export const SHORTCUTS: ReadonlyArray<{
  keys: readonly string[];
  description: string;
}> = [
  { keys: ["Space"], description: "Play or pause" },
  { keys: ["→"], description: "Seek forward 5 seconds" },
  { keys: ["←"], description: "Seek backward 5 seconds" },
  { keys: ["↑"], description: "Volume up" },
  { keys: ["↓"], description: "Volume down" },
  { keys: ["N"], description: "Next track" },
  { keys: ["P"], description: "Previous track" },
  { keys: ["M"], description: "Mute or unmute" },
  { keys: ["?"], description: "Show keyboard shortcuts" },
];

interface ElementLike {
  tagName?: string;
  isContentEditable?: boolean;
  closest?: (selector: string) => unknown;
}

const TYPING_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);
const ACTIVATABLE =
  'button, a[href], summary, [role="button"], [role="tab"], [role="menuitem"], [role="checkbox"], [role="radio"], [role="switch"], [role="option"]';
const ARROW_WIDGETS =
  '[role="slider"], [role="tablist"], [role="menu"], [role="listbox"], [role="radiogroup"]';

function asElement(target: EventTarget | null): ElementLike | null {
  return target !== null && typeof target === "object"
    ? (target as ElementLike)
    : null;
}

export function isTypingTarget(target: EventTarget | null): boolean {
  const el = asElement(target);
  if (!el) return false;
  return (
    Boolean(el.isContentEditable) ||
    TYPING_TAGS.has((el.tagName ?? "").toUpperCase())
  );
}

interface ShortcutEvent {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  target: EventTarget | null;
}

export function getShortcutAction(event: ShortcutEvent): ShortcutAction | null {
  if (event.ctrlKey || event.metaKey || event.altKey) return null;
  if (isTypingTarget(event.target)) return null;

  const el = asElement(event.target);
  const matches = (selector: string) => Boolean(el?.closest?.(selector));

  switch (event.key) {
    case " ":
      return matches(ACTIVATABLE) ? null : "togglePlay";
    case "ArrowRight":
      return matches(ARROW_WIDGETS) ? null : "seekForward";
    case "ArrowLeft":
      return matches(ARROW_WIDGETS) ? null : "seekBackward";
    case "ArrowUp":
      return matches(ARROW_WIDGETS) ? null : "volumeUp";
    case "ArrowDown":
      return matches(ARROW_WIDGETS) ? null : "volumeDown";
    case "n":
    case "N":
      return "next";
    case "p":
    case "P":
      return "previous";
    case "m":
    case "M":
      return "toggleMute";
    case "?":
      return "showHelp";
    default:
      return null;
  }
}
