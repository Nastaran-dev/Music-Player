import type { LyricLine, Lyrics } from "@/types/music";


const timed = (rows: ReadonlyArray<readonly [number, string]>): LyricLine[] =>
  rows.map(([time, text]) => ({ time, text }));

const plain = (rows: readonly string[]): LyricLine[] =>
  rows.map((text) => ({ time: null, text }));

export const lyricsByTrackId: Readonly<Record<string, Lyrics>> = {
  "track-001": {
    trackId: "track-001",
    lines: timed([
      [10, "Streetlights smear across the glass"],
      [17, "Radio low while the minutes pass"],
      [24, "No map, no plan, just the open road"],
      [31, "Carrying all the things we couldn't hold"],
      [42, "Midnight drive, windows down"],
      [49, "Neon fading as we leave the town"],
      [56, "Say my name like you mean it now"],
      [63, "We're running on a silver cloud"],
      [78, "Every red light is a little pause"],
      [85, "Every green one says forget the cause"],
      [92, "Hold the wheel, I'll hold the sky"],
      [99, "We've got all night, so why say goodbye"],
      [118, "Midnight drive, windows down"],
      [125, "Neon fading as we leave the town"],
      [132, "Say my name like you mean it now"],
      [139, "We're running on a silver cloud"],
      [160, "And when the morning finds the sea"],
      [168, "We'll still be here, just you and me"],
      [178, "Midnight drive, windows down"],
      [188, "Let it carry us somewhere new"],
    ]),
  },
  "track-019": {
    trackId: "track-019",
    lines: timed([
      [14, "Honey on your words, smoke in the air"],
      [22, "Candles on the table and nobody there"],
      [30, "I keep the lights low so the night stays kind"],
      [38, "You're a slow song playing on my mind"],
      [52, "Pour it out slow, let it take its time"],
      [60, "Gold in the glass and your hand in mine"],
      [68, "Honey and smoke, honey and smoke"],
      [76, "Everything sweet is a little bit broke"],
      [96, "Tell me a secret, I'll keep it true"],
      [104, "Dancing in the kitchen, just us two"],
      [112, "The record skips but we don't mind"],
      [120, "Leave it playing, leave it behind"],
      [140, "Honey and smoke, honey and smoke"],
      [148, "Everything sweet is a little bit broke"],
      [170, "Stay till the last note fades to gold"],
      [180, "Some things get better as they grow old"],
    ]),
  },
  "track-007": {
    trackId: "track-007",
    lines: plain([
      "Weeds push through the cracks in the pavement",
      "Somebody planted hope between the lines",
      "Rooftop tomatoes and a speaker on the stairs",
      "We grow something loud out of everything we find",
      "",
      "Concrete gardens, bloom anyway",
      "Concrete gardens, we're here to stay",
      "Water the dream with the rain on the roof",
      "Every block's a seed if you listen for proof",
      "",
      "Neighbors on the stoop trading stories for bread",
      "Murals getting taller than the things we said",
      "Nothing here was given, everything was made",
      "Concrete gardens, bloom anyway",
    ]),
  },
};
