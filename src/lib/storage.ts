import { useSyncExternalStore } from 'react';

// All progress lives in the learner's browser. No accounts, no server.

export interface SavedAnswer {
  answer: string;
  score: number;
  /** Epoch milliseconds. */
  at: number;
  spoken: boolean;
}

/** How many past answers we keep per interview question. */
export const MAX_SAVED_ANSWERS = 10;

export interface Progress {
  interview: Record<string, { attempts: number; best: number; lastAnswer?: string; history?: SavedAnswer[] }>;
  ladder: Record<string, number[]>;
  pron: Record<string, { tries: number; hits: number }>;
  remote: Record<string, boolean>;
  /** 'YYYY-MM-DD' → number of practice actions that day. */
  activity: Record<string, number>;
  aiModel?: string;
}

const KEY = 'devspeak:v1';
const EMPTY: Progress = { interview: {}, ladder: {}, pron: {}, remote: {}, activity: {} };

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

let state: Progress = load();
const listeners = new Set<() => void>();

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode or full storage: keep in memory */ }
  listeners.forEach(l => l());
}

export const today = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in local time

/** Applies a change to progress. Pass `practiced: true` to count it as today's activity. */
export function updateProgress(fn: (draft: Progress) => void, practiced = true) {
  const draft: Progress = structuredClone(state);
  fn(draft);
  if (practiced) draft.activity[today()] = (draft.activity[today()] ?? 0) + 1;
  state = draft;
  persist();
}

export function replaceProgress(next: Progress) {
  state = { ...EMPTY, ...next };
  persist();
}

export function resetProgress() {
  state = EMPTY;
  persist();
}

export const getProgress = () => state;

export function useProgress(): Progress {
  return useSyncExternalStore(
    cb => { listeners.add(cb); return () => listeners.delete(cb); },
    () => state,
  );
}

/** Consecutive days with practice, counting today or yesterday as the latest day. */
export function streak(p: Progress): number {
  const day = new Date();
  if (!p.activity[day.toLocaleDateString('en-CA')]) day.setDate(day.getDate() - 1);
  let n = 0;
  while (p.activity[day.toLocaleDateString('en-CA')]) { n++; day.setDate(day.getDate() - 1); }
  return n;
}
