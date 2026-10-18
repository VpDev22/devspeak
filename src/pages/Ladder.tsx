import { useState } from 'react';
import { LADDER_STEPS } from '../data/ladder';
import { bestDiff } from '../lib/compare';
import { findIssues } from '../lib/feedback';
import { href } from '../lib/router';
import { updateProgress, useProgress } from '../lib/storage';
import { Bar, Card, IssueList, ListenButton, Score, SpeakBox, WordDiff } from '../components/ui';

const PASS = 0.85;
const steps = [...LADDER_STEPS].sort((a, b) => a.order - b.order);

export function LadderList() {
  const progress = useProgress();
  return (
    <>
      <header className="page-head">
        <h1>Sentence ladder 🪜</h1>
        <p className="lead">De frases de 3 palabras a respuestas completas de entrevista, un patrón a la vez. Cada escalón ataca un error típico de hispanohablantes.</p>
      </header>
      <div className="ladder">
        {steps.map(s => {
          const done = progress.ladder[s.id]?.length ?? 0;
          return (
            <a key={s.id} className="step" href={href('ladder', s.id)}>
              <span className={`num${done >= s.exercises.length ? ' done' : ''}`}>{done >= s.exercises.length ? '✓' : s.order}</span>
              <div className="grow">
                <div className="q">{s.title}</div>
                <div className="muted small mono">{s.pattern}</div>
                <Bar value={done / s.exercises.length} />
              </div>
              <span className="muted small">{done}/{s.exercises.length}</span>
            </a>
          );
        })}
      </div>
    </>
  );
}

export function LadderStepPage({ id }: { id: string }) {
  const progress = useProgress();
  const step = steps.find(s => s.id === id);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [spoken, setSpoken] = useState(false);
  const [result, setResult] = useState<null | ReturnType<typeof bestDiff>>(null);
  const [issues, setIssues] = useState<ReturnType<typeof findIssues>>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!step) return <p>Step not found. <a href={href('ladder')}>Back</a></p>;
  const ex = step.exercises[index];
  const done = progress.ladder[step.id] ?? [];
  const next = steps[steps.findIndex(s => s.id === step.id) + 1];

  const reset = (i: number) => { setIndex(i); setAnswer(''); setResult(null); setIssues([]); setShowAnswer(false); setSpoken(false); };
  const check = (text = answer, viaSpeech = spoken) => {
    if (!text.trim()) return;
    const r = bestDiff([ex.target, ...(ex.alternatives ?? [])], text);
    setResult(r);
    setIssues(findIssues(text, { typed: !viaSpeech }));
    if (r.score >= PASS && !done.includes(index)) updateProgress(p => { p.ladder[step.id] = [...(p.ladder[step.id] ?? []), index]; });
    else updateProgress(() => {});
  };

  return (
    <div className="stack">
      <a className="back" href={href('ladder')}>← All steps</a>
      <Card>
        <p className="muted small">Step {step.order} of {steps.length}</p>
        <h1>{step.title}</h1>
        <p className="pattern mono">{step.pattern}</p>
        <p>{step.explanationEs}</p>
        <div className="mistake">
          <div><span className="strike">{step.commonMistake.wrong}</span> → <strong>{step.commonMistake.right}</strong></div>
          <div className="muted small">{step.commonMistake.whyEs}</div>
        </div>
      </Card>

      <Card>
        <div className="row between">
          <h2>Exercise {index + 1} / {step.exercises.length}</h2>
          <div className="dots">{step.exercises.map((_, i) => <button key={i} className={`dot${done.includes(i) ? ' done' : ''}${i === index ? ' on' : ''}`} onClick={() => reset(i)} aria-label={`Exercise ${i + 1}`} />)}</div>
        </div>
        <p className="prompt">💬 {ex.promptEs}</p>
        <SpeakBox
          rows={2}
          continuous={false}
          append={false}
          value={answer}
          placeholder="Dilo en voz alta con 🎤… o escríbelo."
          onChange={v => { setAnswer(v); setResult(null); }}
          onSpeechEnd={r => { setSpoken(true); check(r.transcript, true); }}
        />
        <div className="row wrap">
          <button className="btn primary" onClick={() => check()} disabled={!answer.trim()}>Check</button>
          <button className="btn ghost" onClick={() => setShowAnswer(true)}>Show answer</button>
        </div>
        {(result || showAnswer) && (
          <div className="result">
            {result && (
              <div className="row between wrap">
                <WordDiff tokens={result.tokens} />
                <Score value={result.score} />
              </div>
            )}
            {result && <p className={result.score >= PASS ? 'good' : 'muted'}>{result.score >= PASS ? '✅ ¡Muy bien!' : 'Casi. Compara con la frase correcta y vuelve a intentarlo.'}</p>}
            {issues.length > 0 && <IssueList issues={issues} />}
            {(showAnswer || (result && result.score < PASS)) && (
              <div className="answer">
                <strong>{ex.target}</strong>
                <ListenButton text={ex.target} small />
                <ListenButton text={ex.target} label="Slow" slow small />
              </div>
            )}
          </div>
        )}
        <div className="row between">
          <button className="btn ghost" onClick={() => reset(index - 1)} disabled={index === 0}>← Previous</button>
          {index < step.exercises.length - 1
            ? <button className="btn" onClick={() => reset(index + 1)}>Next →</button>
            : next ? <a className="btn" href={href('ladder', next.id)} onClick={() => reset(0)}>Next step: {next.title} →</a> : <a className="btn" href={href('interview')}>Try a mock interview →</a>}
        </div>
      </Card>
    </div>
  );
}
