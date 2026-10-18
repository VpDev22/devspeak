import type { MLCEngine, InitProgressReport } from '@mlc-ai/web-llm';

// Optional feedback from a small language model that runs entirely in the browser (WebGPU).
// The library and the model are only downloaded when the learner asks for it.

export const AI_MODELS = [
  { id: 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC', label: 'Fast', size: '~1 GB' },
  { id: 'Llama-3.2-3B-Instruct-q4f16_1-MLC', label: 'Better', size: '~2 GB' },
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
Reply in exactly this format (markdown):

**Corrected:** <the student's text rewritten in natural, correct English, keeping their ideas and their level>

**Errores:**
- <mistake> → <fix>: <very short reason in Spanish>
(at most 3 bullets; if there are no real mistakes write "- Ninguno, ¡bien hecho!")

**Tip:** <one short tip in Spanish to sound more natural or professional>

Never invent experience the student did not mention. Keep the whole reply under 170 words.`;

/** Streams feedback for a learner's answer. Calls onToken with the text so far. */
export async function aiFeedback(context: string, answer: string, onToken: (textSoFar: string) => void): Promise<string> {
  if (!engine) throw new Error('The AI model is not loaded yet.');
  const stream = await engine.chat.completions.create({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `${context}\n\nStudent's answer: "${answer}"` },
    ],
    temperature: 0.3,
    max_tokens: 400,
    stream: true,
  });
  let text = '';
  for await (const chunk of stream) {
    text += chunk.choices[0]?.delta?.content ?? '';
    onToken(text);
  }
  return text;
}
