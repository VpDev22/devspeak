// Rule-based detector for the mistakes Spanish speakers make most often in English.
// It runs instantly and offline; the optional local AI (ai.ts) gives deeper feedback.

export interface Issue {
  id: string;
  /** The fragment of the learner's text that triggered the rule. */
  found: string;
  /** Suggested correction for that fragment. */
  fix: string;
  /** Short explanation in Spanish. */
  whyEs: string;
}

interface Rule {
  id: string;
  re: RegExp;
  fix: (m: RegExpExecArray) => string;
  whyEs: string;
  /** Only applies to typed text (e.g. capitalization), not to speech transcripts. */
  typedOnly?: boolean;
  /** Only applies to interview answers. */
  interviewOnly?: boolean;
}

const NUM = '(\\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty)';

const PROFESSION = '(developer|programmer|engineer|designer|student|teacher|manager|tester|architect|freelancer|consultant|analyst|intern)';
const PROF_ADJ = '(?:(?:full[- ]?stack|front[- ]?end|back[- ]?end|senior|junior|mid[- ]level|software|web|mobile|android|ios|php|javascript|java|python|react|good|great|new|qa)\\s+){0,3}';

const LIKE_VERBS = 'play|work|code|read|learn|travel|watch|go|hang out|program|write|build|study|cook|run|swim|listen|drive|walk|dance|sing|draw|design|test|debug|teach|help|solve|create|make|use|talk|speak|practice|try|fix|chat';
const TO_VERBS = 'learn|improve|study|build|fix|get|deploy|create|understand|talk|speak|save|find|solve|avoid|prevent|reduce|increase|keep|make|write|read|send|generate|implement|connect|protect|check|pay';

const DOUBLE_FINAL = new Set(['run', 'swim', 'get', 'put', 'sit', 'stop', 'shop', 'plan', 'debug', 'chat', 'begin']);
function ing(verb: string): string {
  const [v, ...rest] = verb.toLowerCase().split(' ');
  let out: string;
  if (DOUBLE_FINAL.has(v)) out = v + v.slice(-1) + 'ing';
  else if (v.endsWith('ie')) out = v.slice(0, -2) + 'ying';
  else if (v.endsWith('e') && !v.endsWith('ee')) out = v.slice(0, -1) + 'ing';
  else out = v + 'ing';
  return [out, ...rest].join(' ');
}

const PARTICIPLE: Record<string, string> = {
  report: 'reported', fix: 'fixed', make: 'made', use: 'used', see: 'seen', do: 'done', go: 'gone', write: 'written',
  build: 'built', send: 'sent', implement: 'implemented', deploy: 'deployed', finish: 'finished', crash: 'crashed',
  start: 'started', be: 'been', learn: 'learned', improve: 'improved', create: 'created', try: 'tried', test: 'tested',
  solve: 'solved', lead: 'led', take: 'taken', give: 'given', get: 'gotten', find: 'found', know: 'known',
};
const PAST: Record<string, string> = {
  fix: 'fixed', work: 'worked', make: 'made', go: 'went', do: 'did', build: 'built', write: 'wrote', send: 'sent',
  deploy: 'deployed', implement: 'implemented', play: 'played', finish: 'finished', start: 'started', have: 'had',
  is: 'was', are: 'were', meet: 'met', talk: 'talked', create: 'created', test: 'tested', learn: 'learned', see: 'saw',
  get: 'got', find: 'found',
};
function thirdPerson(v: string): string {
  const s = v.toLowerCase();
  if (s === 'have') return 'has';
  if (s === 'do' || s === 'go') return s + 'es';
  if (/(s|sh|ch|x|z)$/.test(s)) return s + 'es';
  if (/[^aeiou]y$/.test(s)) return s.slice(0, -1) + 'ies';
  return s + 's';
}
const article = (word: string) => (/^[aeio]|^u(?!s)/i.test(word) ? 'an' : 'a');

const PAST_MARKER = `(yesterday|last (?:week|month|year|night|sprint|friday|monday)|${NUM} (?:days|weeks|months|years) ago)`;
const PAST_VERBS = Object.keys(PAST).filter(v => !['have', 'is', 'are'].includes(v)).join('|');

const RULES: Rule[] = [
  {
    id: 'missing-article',
    re: new RegExp(`\\b(I am|I'm|I was|he is|she is|he's|she's)\\s+(${PROF_ADJ}${PROFESSION}s?)\\b`, 'gi'),
    fix: m => `${m[1]} ${article(m[2])} ${m[2]}`,
    whyEs: 'Las profesiones llevan "a" o "an": I am a developer, I am an engineer.',
  },
  {
    id: 'like-ing',
    re: new RegExp(`\\b(like|love|enjoy|hate|prefer)\\s+(${LIKE_VERBS})\\b`, 'gi'),
    fix: m => `${m[1]} ${ing(m[2])}`,
    whyEs: 'Después de like, love o enjoy, el verbo va con -ing: I like coding.',
  },
  {
    id: 'for-verb',
    re: new RegExp(`\\bfor\\s+(${TO_VERBS})\\b`, 'gi'),
    fix: m => `to ${m[1]}`,
    whyEs: '"Para + verbo" se dice to + verbo (to learn). "For" va con sustantivos (for work).',
  },
  {
    id: 'missing-subject',
    re: /(^|[.!?]\s+|\b(?:because|but|so|when|if|since)\s+)(is|was)\s+(very|so|really|too|not|easy|hard|difficult|fun|important|good|bad|random|necessary|possible|impossible|better|great|nice|cool|addictive|interesting|boring|expensive|cheap|fast|slow|my|a|an)\b/gi,
    fix: m => `${m[1]}it ${m[2]} ${m[3]}`,
    whyEs: 'En inglés el sujeto nunca se omite. "Es fácil" = It is easy.',
  },
  {
    id: 'a-lot-order',
    re: /\b(play(?:ed)?|like[ds]?|love[ds]?|use[ds]?|practice[ds]?|enjoy(?:ed)?|watch(?:ed)?|learn(?:ed)?|stud(?:y|ied))\s+a lot\s+(?!of\b|more\b|better\b|and\b|but\b|because\b|with\b|in\b|at\b|on\b|to\b|for\b|when\b|during\b|this\b|last\b|lately\b|recently\b|every\b|since\b|so\b)([a-z]+)/gi,
    fix: m => `${m[1]} ${m[2]}… a lot`,
    whyEs: '"A lot" va al final: verbo + cosa + a lot. I played Brawl Stars a lot.',
  },
  {
    id: 'present-perfect',
    re: new RegExp(`\\b(has|have|hasn't|haven't|has not|have not|I've|we've|it's never)\\s+(never\\s+|already\\s+|just\\s+|always\\s+)?(${Object.keys(PARTICIPLE).join('|')})\\b(?!\\s+to\\b)`, 'gi'),
    fix: m => `${m[1]} ${m[2] ?? ''}${PARTICIPLE[m[3].toLowerCase()]}`.replace(/\s+/g, ' '),
    whyEs: 'Present perfect = have/has + participio: has reported, have made.',
  },
  {
    id: 'past-marker',
    re: new RegExp(`\\b${PAST_MARKER}\\b[^.!?]*?\\b(I|we|he|she|they)\\s+(${PAST_VERBS}|have|is|are)\\b`, 'gi'),
    fix: m => `${m[3]} ${PAST[m[4].toLowerCase()]}`,
    whyEs: 'Si hablas del pasado (yesterday, last week…), el verbo va en pasado.',
  },
  {
    id: 'past-marker-after',
    re: new RegExp(`\\b(I|we)\\s+(${PAST_VERBS})\\b[^.!?]*?\\b${PAST_MARKER}`, 'gi'),
    fix: m => `${m[1]} ${PAST[m[2].toLowerCase()]}`,
    whyEs: 'Si hablas del pasado (yesterday, last week…), el verbo va en pasado.',
  },
  {
    id: 'third-person-s',
    re: /(?<!\b(?:make|makes|made|let|lets|help|helps|see|saw|watch|have|had|did|does|do|will|can|could|should|would|might|must|to)\s)\b(it|he|she|the (?:app|system|code|function|api|server|library|user|client|team|company|backend|frontend|database|script|test|bug|page))\s+(generate|send|work|run|use|need|make|create|return|show|crash|have|do|go|want|call|store|save|check|handle|support|take|load|fail)\b/gi,
    fix: m => `${m[1]} ${thirdPerson(m[2])}`,
    whyEs: 'Con he, she, it (o "the app") en presente, el verbo lleva -s: it generates, the app crashes.',
  },
  {
    id: 'no-negation',
    re: /\b(I|you|we|they|he|she|it)\s+no\s+(have|know|like|want|understand|work|can|need|use|think|speak|remember)\b/gi,
    fix: m => {
      const third = /^(he|she|it)$/i.test(m[1]);
      return m[2].toLowerCase() === 'can' ? `${m[1]} can't` : `${m[1]} ${third ? "doesn't" : "don't"} ${m[2]}`;
    },
    whyEs: 'Para negar se usa don\'t / doesn\'t + verbo, no "no".',
  },
  { id: 'explain-me', re: /\bexplain me\b/gi, fix: () => 'explain to me', whyEs: 'Se dice explain to me (o explain it to me).' },
  { id: 'depend-of', re: /\bdepends? of\b/gi, fix: m => m[0].replace(/of$/i, 'on'), whyEs: '"Depender de" = depend on.' },
  { id: 'make-question', re: /\bmake (a|some|one|any) questions?\b/gi, fix: m => m[0].replace(/^make/i, 'ask'), whyEs: '"Hacer una pregunta" = ask a question.' },
  {
    id: 'assist',
    re: /\bassist(?:ed)?\s+(?:to\s+)?(?:the\s+|a\s+)?(meeting|class|event|conference|call|interview)s?\b/gi,
    fix: m => `attend the ${m[1]}`,
    whyEs: '"Asistir a una reunión" = attend a meeting. Assist significa "ayudar".',
  },
  {
    id: 'since-duration',
    re: new RegExp(`\\bsince\\s+${NUM}\\s+(years|months|weeks|days)\\b`, 'gi'),
    fix: m => `for ${m[1]} ${m[2]}`,
    whyEs: 'Para duraciones se usa for (for 5 years). Since va con un punto de inicio (since 2020).',
  },
  {
    id: 'have-years-working',
    re: new RegExp(`\\bI have\\s+${NUM}\\s+years\\s+(working|programming|coding|developing)\\b`, 'gi'),
    fix: m => `I've been ${m[2]} for ${m[1]} years`,
    whyEs: 'Para algo que empezó y sigue: I\'ve been working for 5 years. (I have 5 years of experience también es correcto.)',
  },
  { id: 'people-is', re: /\bpeople (is|was)\b/gi, fix: m => `people ${m[1].toLowerCase() === 'is' ? 'are' : 'were'}`, whyEs: '"People" es plural: people are.' },
  { id: 'begging', re: /\b(at|in) the begging\b/gi, fix: () => 'at the beginning', whyEs: '"Begging" es mendigando 😅. Es beginning, con doble n.' },
  {
    id: 'uncountable',
    re: /\b(informations|advices|feedbacks|softwares|hardwares|equipments|knowledges)\b/gi,
    fix: m => m[1].replace(/s$/i, ''),
    whyEs: 'Estas palabras no tienen plural en inglés: information, advice, feedback, software.',
  },
  { id: 'more-better', re: /\bmore (better|worse|easier|faster|bigger|cheaper)\b/gi, fix: m => m[1], whyEs: 'Better, easier, faster ya son comparativos; no llevan "more".' },
  {
    id: 'lowercase-i',
    re: /(^|[\s(])i(?=[\s',.!?]|$)/g,
    fix: m => `${m[1]}I`,
    whyEs: '"I" (yo) siempre va en mayúscula.',
    typedOnly: true,
  },
  {
    id: 'undersell',
    re: /\b(it was|that was|it's|it is)\s+(very |really |so |pretty )?(easy|simple)\b/gi,
    fix: () => 'The goal was… / I was responsible for…',
    whyEs: 'En entrevista no digas que fue fácil: le resta valor a tu trabajo. Explica el objetivo y el resultado.',
    interviewOnly: true,
  },
];

export function findIssues(text: string, opts: { typed?: boolean; interview?: boolean } = {}): Issue[] {
  const issues: Issue[] = [];
  const seen = new Set<string>();
  for (const rule of RULES) {
    if (rule.typedOnly && !opts.typed) continue;
    if (rule.interviewOnly && !opts.interview) continue;
    rule.re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = rule.re.exec(text))) {
      const found = m[0].trim();
      const key = rule.id + found.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        issues.push({ id: rule.id, found, fix: rule.fix(m).trim(), whyEs: rule.whyEs });
      }
      if (m[0].length === 0) rule.re.lastIndex++;
    }
  }
  // the capital-I rule fires once per text, not per occurrence
  const lower = issues.filter(i => i.id === 'lowercase-i');
  return lower.length > 1 ? issues.filter(i => i.id !== 'lowercase-i').concat(lower[0]) : issues;
}

export interface SpeechStats { words: number; sentences: number; wpm: number | null }

export function speechStats(text: string, durationMs?: number): SpeechStats {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const wpm = durationMs && durationMs > 5000 ? Math.round(words / (durationMs / 60000)) : null;
  return { words, sentences, wpm };
}
