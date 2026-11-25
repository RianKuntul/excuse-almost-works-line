// The Excuse That Almost Works — entry program (v2).
//
// Writes the single line a gamer texts the boss to skip work on
// GTA 6 launch week to /output/entry.txt: one line, 1-140 characters,
// at most 20 words, reading like a text sent in a hurry.
//
// Runner: Node 22 (`node main.ts`). Uses only erasable TypeScript syntax
// so Node's built-in type stripping runs it as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse. Angle: a leaking boiler and the emergency plumber —
// a boring, specific household disaster that traps the sender at
// home for the whole day, with no wild story and no setup. The v1
// angle (dead phone, missed alarm, late bus) only bought a late
// start; this one buys the full day, which is what launch week
// actually needs, and "can't leave the house today" is the kind of
// flat, verifiable-sounding detail a tired manager almost believes.
const ENTRY_LINE: string =
  "sorry, the boiler's leaking all over the kitchen floor, waiting on the emergency plumber, can't leave the house today";

const MIN_CHARS = 1;
const MAX_CHARS = 140;
const MAX_WORDS = 20;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath: string = join(outDir, "entry.txt");

  // Read-back gate: refuse anything outside 1-140 characters, more
  // than 20 words, or anything that is only whitespace or spans more
  // than one line.
  const length: number = [...ENTRY_LINE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry line is ${length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  const words: number = ENTRY_LINE.trim().split(/\s+/).length;
  if (words > MAX_WORDS) {
    throw new Error(`entry line is ${words} words, must be at most ${MAX_WORDS}`);
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (ENTRY_LINE.includes("\n")) {
    throw new Error("entry line must be a single line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  console.log(`wrote ${length} characters (${words} words) to ${outPath}`);
}

main();
