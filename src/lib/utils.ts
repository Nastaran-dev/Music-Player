import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";


const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "title",
            "heading",
            "subheading",
            "body",
            "small",
            "caption",
          ],
        },
      ],
      shadow: [{ shadow: ["elevation-1", "elevation-2", "elevation-3", "glow"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
