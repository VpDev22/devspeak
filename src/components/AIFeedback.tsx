import { useState } from 'react';
import { AI_MODELS, aiFeedback, changedFacts, cleanReply, hasWebGPU, loadAI, loadedAIModel, type AIModelId } from '../lib/ai';
import { updateProgress, useProgress } from '../lib/storage';
import { MiniMarkdown } from './ui';

type Status = 'idle' | 'loading' | 'thinking' | 'done' | 'error';

/** Optional, on-device AI feedback. Nothing is downloaded until the learner presses the button. */
export function AIFeedback({ context, answer }: { context: string; answer: string }) {
  const progress = useProgress();
  const model = (progress.aiModel as AIModelId | undefined) ?? AI_MODELS[0].id;
  const [status, setStatus] = useState<Status>('idle');
  const [loadText, setLoadText] = useState('');
  const [loadPct, setLoadPct] = useState(0);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [removed, setRemoved] = useState(0);
  const [usedModel, setUsedModel] = useState('');

  if (!hasWebGPU()) {
    return <p className="note">✨ La retroalimentación con IA local necesita WebGPU (Chrome o Edge recientes en computadora). La revisión automática de arriba sí funciona aquí.</p>;
  }

  const run = async () => {
    if (!answer.trim()) return;
    setError(''); setResult(''); setRemoved(0);
    try {
      if (loadedAIModel() !== model) {
        setStatus('loading');
        await loadAI(model, r => { setLoadPct(r.progress); setLoadText(r.text); });
      }
      setStatus('thinking');
      setUsedModel(AI_MODELS.find(m => m.id === model)?.label ?? model);
      const raw = await aiFeedback(context, answer, setResult);
      const cleaned = cleanReply(answer, raw);
      setResult(cleaned.text);
      setRemoved(cleaned.removed);
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setStatus('error');
    }
  };

  const busy = status === 'loading' || status === 'thinking';
  return (
    <div className="ai">
      <div className="row wrap">
        <button type="button" className="btn accent" onClick={run} disabled={busy || !answer.trim()}>
          {status === 'thinking' ? 'Thinking…' : status === 'loading' ? 'Loading model…' : '✨ AI feedback'}
        </button>
        <label className="muted small">
          Model:{' '}
          <select value={model} disabled={busy} onChange={e => updateProgress(p => { p.aiModel = e.target.value; }, false)}>
            {AI_MODELS.map(m => <option key={m.id} value={m.id}>{m.label} ({m.size})</option>)}
          </select>
        </label>
      </div>
      {status === 'idle' && !loadedAIModel() && (
        <p className="muted small">Corre en tu computadora, sin cuentas ni costo. La primera vez descarga el modelo ({AI_MODELS.find(m => m.id === model)?.size}); después queda guardado en el navegador.</p>
      )}
      {status === 'loading' && (
        <div className="loading">
          <div className="bar"><i style={{ width: `${Math.round(loadPct * 100)}%` }} /></div>
          <p className="muted small">{loadText}</p>
        </div>
      )}
      {result && <MiniMarkdown text={result} />}
      {status === 'done' && changedFacts(answer, result).length > 0 && (
        <p className="note warn">
          ⚠️ La IA cambió o quitó: <b>{changedFacts(answer, result).join(', ')}</b>. Es un error de la IA: tus datos (nombres, lugares, empresas) no se corrigen. Ignora esa parte.
        </p>
      )}
      {status === 'done' && removed > 0 && <p className="muted small">🧹 Se ocultaron {removed} corrección{removed > 1 ? 'es' : ''} que la IA inventó (citaban texto que no escribiste o cambiaban tus datos).</p>}
      {status === 'done' && <p className="muted small">Respondió: <b>{usedModel}</b>. La IA local es pequeña y a veces se equivoca; si algo no te cuadra, confía en la revisión automática de arriba.</p>}
      {error && <p className="note warn">No se pudo usar la IA local: {error}</p>}
    </div>
  );
}
