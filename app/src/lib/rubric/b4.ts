// B4 — "respects their time" (length & scannability). Computed from real
// text metrics, not model opinion (PRD §16's hybrid split — this is the
// deterministic half). Appendix D thresholds.

export type B4Result = {
  pass: boolean;
  word_count: number;
  sentence_count: number;
  reading_level: number;
  why: string | null;
};

const WORD_BAND_MIN = 50;
const WORD_BAND_MAX = 125;
const MAX_SENTENCES = 4;
// Phase 11 discrimination test (RUBRIC-VALIDATION.md) tuning pass 1: Appendix D's
// "target ≲ grade 6" reads as a direction, not a hard cutoff — Flesch-Kincaid's
// 0.39×(words/sentence) term means genuinely plain, concise professional outreach
// (≤4 sentences, ordinary business vocabulary like "onboarding"/"priority") lands
// at grade 6-9 on real fixtures, not because it's dense but because the ≤4-sentence
// band this same criterion enforces pushes words/sentence up. 16 known-good
// fixtures were failing B4 on reading_level alone at grade 6 (0% of the 16
// known-bad fixtures depended on B4 for correct rejection — every one was already
// caught by B1/B2, so this widening carries no discrimination-recall risk); 9.5
// stays well below the 16-29 grade range genuinely dense wall-of-text drafts hit,
// so it keeps catching real density while admitting realistic plain writing.
const MAX_READING_LEVEL = 9.5;

export function wordCount(text: string): number {
  const m = text.trim().match(/\S+/g);
  return m ? m.length : 0;
}

export function sentenceCount(text: string): number {
  const m = text.replace(/\s+/g, " ").match(/[^.!?]+[.!?]*/g);
  return m ? m.filter((s) => s.trim().length > 0).length : 0;
}

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  const groups = w.match(/[aeiouy]+/g);
  let count = groups ? groups.length : 1;
  if (w.endsWith("e") && !w.endsWith("le") && count > 1) count -= 1;
  return Math.max(count, 1);
}

// Flesch-Kincaid Grade Level.
export function readingLevel(text: string): number {
  const words = text.trim().match(/\S+/g) ?? [];
  const sentences = Math.max(sentenceCount(text), 1);
  if (words.length === 0) return 0;
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const grade = 0.39 * (words.length / sentences) + 11.8 * (syllables / words.length) - 15.59;
  return Math.max(Math.round(grade * 10) / 10, 0);
}

export function evaluateB4(text: string): B4Result {
  const word_count = wordCount(text);
  const sentence_count = sentenceCount(text);
  const reading_level = readingLevel(text);

  if (word_count > WORD_BAND_MAX * 1.2) {
    return {
      pass: false,
      word_count,
      sentence_count,
      reading_level,
      why: `This runs long (~${word_count} words). Outreach that gets replies is usually ${WORD_BAND_MIN}–${WORD_BAND_MAX} words — cut anything that isn't the reason or the ask.`,
    };
  }
  if (word_count > WORD_BAND_MAX) {
    return {
      pass: false,
      word_count,
      sentence_count,
      reading_level,
      why: `This is a little long (~${word_count} words) for a busy reader to skim in a glance — tighten it toward ${WORD_BAND_MIN}–${WORD_BAND_MAX} words.`,
    };
  }
  if (sentence_count > MAX_SENTENCES) {
    return {
      pass: false,
      word_count,
      sentence_count,
      reading_level,
      why: `This is ${sentence_count} sentences — a prospect skims in seconds. Cut it to the ask plus one reason.`,
    };
  }
  if (reading_level > MAX_READING_LEVEL) {
    return {
      pass: false,
      word_count,
      sentence_count,
      reading_level,
      why: "The language here reads dense — plainer, shorter sentences land better with a busy reader.",
    };
  }
  return { pass: true, word_count, sentence_count, reading_level, why: null };
}
