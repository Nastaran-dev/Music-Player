"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { useUiStore } from "@/stores/ui-store";

import { SHORTCUTS } from "../keyboard";

export function ShortcutsDialog() {
  const open = useUiStore((s) => s.shortcutsOpen);
  const setOpen = useUiStore((s) => s.setShortcutsOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>
            Shortcuts are paused while you type in a field or use a control that needs the same key.
          </DialogDescription>
        </DialogHeader>
        <ul className="grid gap-2">
          {SHORTCUTS.map(({ keys, description }) => (
            <li key={description} className="flex items-center justify-between gap-4 text-small">
              <span>{description}</span>
              <span className="flex gap-1">
                {keys.map((key) => (
                  <Kbd key={key}>{key}</Kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
