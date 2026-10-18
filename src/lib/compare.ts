const CONTRACTIONS: Record<string, string> = {
  "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are', "he's": 'he is', "she's": 'she is',
  "it's": 'it is', "that's": 'that is', "there's": 'there is', "what's": 'what is', "let's": 'let us',
  "i've": 'i have', "you've": 'you have', "we've": 'we have', "they've": 'they have',
  "i'll": 'i will', "you'll": 'you will', "we'll": 'we will', "it'll": 'it will', "they'll": 'they will',
  "i'd": 'i would', "you'd": 'you would', "we'd": 'we would',
  "don't": 'do not', "doesn't": 'does not', "didn't": 'did not', "isn't": 'is not', "aren't": 'are not',
  "wasn't": 'was not', "weren't": 'were not', "hasn't": 'has not', "haven't": 'have not', "hadn't": 'had not',
  "can't": 'can not', cannot: 'can not', "won't": 'will not', "wouldn't": 'would not', "shouldn't": 'should not', "couldn't": 'could not',
};

// Speech recognizers and people write these both ways.
const COMPOUNDS: Record<string, string> = {
  fullstack: 'full stack', frontend: 'front end', backend: 'back end', github: 'git hub', javascript: 'java script',
  typescript: 'type script', email: 'e mail', okay: 'ok', 'o.k.': 'ok', videogames: 'video games', videogame: 'video game',
};

const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];

/** Lowercase words with contractions expanded, numbers spelled out and punctuation removed. */
export function tokens(text: string): string[] {
  const clean = text.normalize('NFD').replace(/[̀-ͯ]/g, '') // México → Mexico
    .toLowerCase().replace(/[’‘`]/g, "'").replace(/[^a-z0-9'\s-]/g, ' ').replace(/-/g, ' ');
  const out: string[] = [];
  for (const raw of clean.split(/\s+/)) {
    const word = raw.replace(/^'+|'+$/g, '');
    if (!word) continue;
    const expanded = CONTRACTIONS[word] ?? COMPOUNDS[word];
    if (expanded) { out.push(...expanded.split(' ')); continue; }
    if (/^\d+$/.test(word) && +word <= 20) { out.push(NUMBERS[+word]); continue; }
    out.push(word.replace(/'s$/, ''));
  }
  return out;
}

export interface DiffToken { text: string; status: 'ok' | 'missed' | 'extra' }

/** Word-level diff (longest common subsequence) between what should be said and what was said. */
export function diffWords(target: string, said: string): { tokens: DiffToken[]; score: number } {
  const a = tokens(target), b = tokens(said);
  const dp = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out: DiffToken[] = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { out.push({ text: a[i], status: 'ok' }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) out.push({ text: a[i++], status: 'missed' });
    else out.push({ text: b[j++], status: 'extra' });
  }
  while (i < a.length) out.push({ text: a[i++], status: 'missed' });
  while (j < b.length) out.push({ text: b[j++], status: 'extra' });
  const score = a.length ? dp[0][0] / Math.max(a.length, b.length * 0.85) : 0;
  return { tokens: out, score: Math.min(1, score) };
}

/** Compares against the target and its alternatives, returning the closest one. */
export function bestDiff(targets: string[], said: string) {
  let best = { ...diffWords(targets[0], said), target: targets[0] };
  for (const t of targets.slice(1)) {
    const d = diffWords(t, said);
    if (d.score > best.score) best = { ...d, target: t };
  }
  return best;
}

// Ways a recognizer may legitimately write a word that was pronounced correctly.
const ACCEPTED_SPELLINGS: Record<string, string[]> = {
  sql: ['sequel', 's q l', 'sequal'],
  json: ['jason', 'jayson', 'j son'],
  github: ['git hub', 'get hub'],
  async: ['a sync', 'asynch', 'a think'],
  linux: ['linnux'],
  cache: ['cash'],
  data: ['date a'],
  null: ['knoll'],
  width: ['with'],
  "hasn't": ['has not'],
};

/** True when any recognizer alternative contains the word (or an accepted spelling of it). */
export function heardWord(word: string, alternatives: string[]): boolean {
  const wanted = [tokens(word), ...(ACCEPTED_SPELLINGS[word.toLowerCase()] ?? []).map(tokens)];
  return alternatives.some(alt => {
    const heard = tokens(alt);
    return wanted.some(w => w.length > 0 && containsSequence(heard, w));
  });
}

function containsSequence(hay: string[], needle: string[]) {
  outer: for (let i = 0; i + needle.length <= hay.length; i++) {
    for (let k = 0; k < needle.length; k++) if (hay[i + k] !== needle[k]) continue outer;
    return true;
  }
  return false;
}

const stem = (w: string) => w.length > 5 ? w.replace(/(ing|ed|es|s)$/, '') : w.replace(/s$/, '');

/** Which expected keywords appear in an answer (with light stemming). */
export function keywordCoverage(keywords: string[], answer: string) {
  const said = new Set(tokens(answer).map(stem));
  const hits: string[] = [], misses: string[] = [];
  for (const k of keywords) (tokens(k).every(t => said.has(stem(t))) ? hits : misses).push(k);
  return { hits, misses, ratio: keywords.length ? hits.length / keywords.length : 1 };
}
