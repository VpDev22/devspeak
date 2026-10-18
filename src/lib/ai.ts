import type { MLCEngine, InitProgressReport } from '@mlc-ai/web-llm';

// Optional feedback from a small language model that runs entirely in the browser (WebGPU).
// The library and the model are only downloaded when the learner asks for it.

export const AI_MODELS = [
  { id: 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC', label: 'Fast · Qwen 1.5B', size: '~1 GB' },
  { id: 'Qwen2.5-3B-Instruct-q4f16_1-MLC', label: 'Better · Qwen 3B', size: '~2 GB' },
  { id: 'Llama-3.2-3B-Instruct-q4f16_1-MLC', label: 'Better · Llama 3B', size: '~2 GB' },
] as const;
export type AIModelId = (typeof AI_MODELS)[number]['id'];

export const hasWebGPU = () => typeof navigator !== 'undefined' && 'gpu' in navigator;

let engine: MLCEngine | null = null;
let loadedModel: string | null = null;
let loading: Promise<void> | null = null;

export const loadedAIModel = () => loadedModel;

export async function loadAI(model: AIModelId, onProgress: (r: InitProgressReport) => void) {
  if (engine && loadedModel === model) return;
  if (loading) await loading;
  loading = (async () => {
    const webllm = await import('@mlc-ai/web-llm');
    if (engine) await engine.unload();
    engine = await webllm.CreateMLCEngine(model, { initProgressCallback: onProgress });
    loadedModel = model;
  })();
  try { await loading; } finally { loading = null; }
}

const SYSTEM_PROMPT = `You are a friendly English tutor for Spanish-speaking software developers preparing for remote job interviews. The student's level is around A2-B1.

Your ONLY job is to fix the student's English. Strict rules:
- NEVER change facts. Keep every name of a person, city, town, country, company, school, technology, number and date EXACTLY as the student wrote it, even if it is small or unknown to you.
- Do not add information the student did not say.
- "Corrected" is the student's own answer rewritten in correct, natural English (first person). It is NOT a comment about the student.
- Write nothing after the Tip.

Reply in exactly this format (markdown):

**Corrected:** <the student's answer, corrected>

**Errores:**
- "<wrong part>" → "<fix>": <very short reason in Spanish>
(at most 3 bullets; if there are no real mistakes write "- Ninguno, ¡bien hecho!")

**Tip:** <one short tip in Spanish to sound more natural or professional>`;

// One worked example: small models follow a demonstrated format far better than a described one.
// It deliberately contains no names or places, because small models tend to copy them into their answer.
const EXAMPLE_USER = `Interview question: "What do you do in your current job?"

Student's answer: "i am backend developer, i make APIs and fix bugs since 2 years. i like a lot my job"`;
const EXAMPLE_ASSISTANT = `**Corrected:** I'm a backend developer. I've been building APIs and fixing bugs for two years. I really like my job.

**Errores:**
- "i am backend developer" → "I'm a backend developer": las profesiones llevan "a".
- "since 2 years" → "for two years": para duraciones se usa "for", no "since".
- "i like a lot my job" → "I really like my job": "a lot" no va antes del objeto.

**Tip:** Para software usa "build" en vez de "make": suena más profesional.`;

/** Removes anything a small model may append after the Tip (e.g. an invented "Final Answer" section). */
function trimExtras(text: string): string {
  const tip = text.search(/\*\*Tip:?\*\*/i);
  if (tip === -1) return text;
  const after = text.slice(tip);
  const end = after.search(/\n\s*\n/);
  return end === -1 ? text : text.slice(0, tip + end).trimEnd();
}

/** Streams feedback for a learner's answer. Calls onToken with the text so far. */
export async function aiFeedback(context: string, answer: string, onToken: (textSoFar: string) => void): Promise<string> {
  if (!engine) throw new Error('The AI model is not loaded yet.');
  const stream = await engine.chat.completions.create({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: EXAMPLE_USER },
      { role: 'assistant', content: EXAMPLE_ASSISTANT },
      { role: 'user', content: `${context}\n\nStudent's answer: "${answer}"` },
    ],
    temperature: 0.1,
    max_tokens: 400,
    stream: true,
  });
  let text = '';
  for await (const chunk of stream) {
    text += chunk.choices[0]?.delta?.content ?? '';
    onToken(trimExtras(text));
  }
  return trimExtras(text);
}

const plain = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const NOT_NAMES = new Set(['i', 'im', 'the', 'my', 'a', 'an', 'and', 'but', 'so', 'because', 'when', 'in', 'on', 'at', 'it', 'we', 'he', 'she', 'they', 'you', 'this', 'that', 'yes', 'no', 'hi', 'hello', 'thanks', 'english']);

/**
 * Proper nouns from the learner's answer (capitalized words that don't start a sentence)
 * that are missing from the AI's reply — a sign the model "corrected" a fact.
 */
export function changedFacts(answer: string, reply: string): string[] {
  const out = new Set<string>();
  const names = properNouns(answer);
  // 1) every name must survive in the corrected answer
  const corrected = plain(reply.match(/\*\*Corrected:?\*\*([\s\S]*?)(\*\*Errores|$)/i)?.[1] ?? reply);
  for (const n of names) if (!corrected.includes(plain(n))) out.add(n);
  // 2) no suggested fix may drop a name ("Guamuchil" → "Culiacan")
  for (const [, wrong, right] of reply.matchAll(/"([^"]+)"\s*→\s*"([^"]+)"/g)) {
    for (const n of names) if (plain(wrong).includes(plain(n)) && !plain(right).includes(plain(n))) out.add(n);
  }
  return [...out];
}

function properNouns(text: string): string[] {
  const found: string[] = [];
  const re = /(^|[.!?]\s+|\s)([A-ZÁÉÍÓÚÑ][\p{L}'-]+)/gu;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const startsSentence = m[1] === '' || /[.!?]/.test(m[1]);
    const word = m[2].replace(/'s$/, '');
    if (!startsSentence && !NOT_NAMES.has(plain(word).replace(/'/g, ''))) found.push(word);
  }
  return found;
}

const normalize = (s: string) => plain(s).replace(/[^a-z0-9'\s]/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Drops "wrong → fix" bullets the model made up: the quoted mistake is not in the learner's answer,
 * the fix is identical, or the fix removes one of the learner's names.
 */
export function cleanReply(answer: string, reply: string): { text: string; removed: number } {
  const said = normalize(answer);
  const names = properNouns(answer);
  let removed = 0;
  const lines = reply.split('\n').filter(line => {
    const m = line.match(/^\s*[-*]\s*"([^"]+)"\s*→\s*"([^"]+)"/);
    if (!m) return true;
    const [, wrong, right] = m;
    const invented = !said.includes(normalize(wrong));
    const noChange = normalize(wrong) === normalize(right);
    const dropsName = names.some(n => plain(wrong).includes(plain(n)) && !plain(right).includes(plain(n)));
    if (invented || noChange || dropsName) { removed++; return false; }
    return true;
  });
  let text = lines.join('\n');
  // if every bullet was dropped, say so instead of leaving an empty section
  const errores = text.split(/\*\*Tip/i)[0].split(/\*\*Errores:?\*\*/i)[1] ?? '';
  if (removed && !/^\s*[-*]\s+/m.test(errores)) {
    text = text.replace(/(\*\*Errores:?\*\*)/i, '$1\n- Ninguno confiable. Revisa la revisión automática de arriba.');
  }
  return { text, removed };
}
