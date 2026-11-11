"use client";

import { useKeyboardShortcuts } from "../hooks/use-keyboard-shortcuts";
import { ShortcutsDialog } from "./shortcuts-dialog";

export function KeyboardShortcuts() {
  useKeyboardShortcuts();
  return <ShortcutsDialog />;
}
