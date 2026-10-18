export type Level = 'A2' | 'B1' | 'B2';

export type InterviewCategory = 'intro' | 'behavioral' | 'technical' | 'remote' | 'closing';

export interface InterviewQuestion {
  id: string;
  category: InterviewCategory;
  level: Level;
  /** The question exactly as an interviewer would say it. */
  question: string;
  /** Short tip in Spanish on how to approach the answer. */
  tipEs: string;
  /** Words/ideas a good answer usually mentions (lowercase). Used to score coverage. */
  keywords: string[];
  /** A natural, realistic model answer (first person, full-stack developer, 5 years exp). */
  modelAnswer: string;
  /** Reusable phrases ("snippets") the learner should memorize for this question. */
  phrases: string[];
}

export interface LadderExercise {
  /** What the learner should say, described in Spanish. */
  promptEs: string;
  /** The ideal English sentence. */
  target: string;
  /** Other acceptable English sentences. */
  alternatives?: string[];
}

export interface LadderStep {
  id: string;
  /** 1..N, ordered from easiest to hardest. */
  order: number;
  title: string;
  /** Short explanation of the grammar pattern in Spanish (2-4 sentences). */
  explanationEs: string;
  /** The pattern, e.g. "I am a + profession". */
  pattern: string;
  /** Typical mistake a Spanish speaker makes and its correction. */
  commonMistake: { wrong: string; right: string; whyEs: string };
  exercises: LadderExercise[];
}

export type PronCategory = 'tech' | 'interview' | 'tricky-sounds' | 'everyday';

export interface PronunciationWord {
  word: string;
  /** IPA, General American, with slashes, e.g. "/ɪˈnɪʃəlaɪz/". */
  ipa: string;
  /** Approximation for a Spanish speaker, stressed syllable in CAPS, e.g. "i-NI-sha-laiz". */
  approxEs: string;
  /** One short tip in Spanish about the difficult sound. */
  tipEs: string;
  /** Short example sentence using the word in a developer context. */
  example: string;
  category: PronCategory;
}

export type RemoteKind = 'standup' | 'pull-request' | 'slack' | 'meeting' | 'email' | 'code-review';

export interface RemoteScenario {
  id: string;
  kind: RemoteKind;
  title: string;
  /** The situation, in Spanish. */
  situationEs: string;
  /** Template with blanks written as {placeholder}. */
  template: string;
  /** A complete filled-in example. */
  example: string;
  /** Useful phrases for this situation. */
  phrases: string[];
  /** Whether this is mostly spoken (practice with mic) or written (practice by typing). */
  mode: 'spoken' | 'written';
}
