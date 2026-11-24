// The Robot Vacuum's Best Excuse — writes one funny one-line excuse to /output/entry.txt.
// Node 22 stdlib only, deterministic, no network, no clock, no randomness.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE = "That spot dodged me. I have the lidar footage. It moved.";

function validate(text) {
  if (typeof text !== "string") throw new Error("excuse must be a string");
  if (text.length < 1 || text.length > 140) {
    throw new Error(`excuse must be 1-140 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) throw new Error("excuse must not be only whitespace");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  for (const ch of text) {
    if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
      throw new Error("excuse must not contain control characters");
    }
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
validate(EXCUSE);
writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
