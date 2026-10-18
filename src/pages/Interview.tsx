import { useMemo, useState } from 'react';
import { INTERVIEW_QUESTIONS } from '../data/interview';
import type { InterviewCategory, InterviewQuestion, Level } from '../data/types';
import { keywordCoverage } from '../lib/compare';
import { findIssues, speechStats } from '../lib/feedback';
import { go, href } from '../lib/router';
import { updateProgress, useProgress } from '../lib/storage';
import { AIFeedback } from '../components/AIFeedback';
import { Badge, Card, IssueList, ListenButton, Reveal, Score, SpeakBox } from '../components/ui';

const CATEGORIES: { id: InterviewCategory; label: string }[] = [
  { id: 'intro', label: 'Introduction' },
  { id: 'behavioral', label: 'Behavioral' },
  { id: 'technical', label: 'Technical' },
  { id: 'remote', label: 'Remote work' },
  { id: 'closing', label: 'Closing' },
];
const EXPECTED_WORDS: Record<Level, number> = { A2: 15, B1: 35, B2: 60 };
const LENGTH_HINT: Record<Level, string> = { A2: '2–3 short sentences', B1: '3–5 sentences', B2: '5–7 sentences (use STAR)' };

export function InterviewList() {
  const progress = useProgress();
  const [cat, setCat] = useState<InterviewCategory | 'all'>('all');
  const [level, setLevel] = useState<Level | 'all'>('all');
  const list = INTERVIEW_QUESTIONS.filter(q => (cat === 'all' || q.category === cat) && (level === 'all' || q.level === level));

  return (
    <>
      <header className="page-head">
        <h1>Mock interviews</h1>
        <p className="lead">Escucha la pregunta, responde en voz alta y recibe retroalimentación al instante.</p>
        <button className="btn primary lg" onClick={() => go('interview', 'mock')}>▶ Start a 6-question mock interview</button>
      </header>
      <div className="filters">
        <div className="chips">
          <button className={`chip${cat === 'all' ? ' on' : ''}`} onClick={() => setCat('all')}>All</button>
          {CATEGORIES.map(c => <button key={c.id} className={`chip${cat === c.id ? ' on' : ''}`} onClick={() => setCat(c.id)}>{c.label}</button>)}
        </div>
        <div className="chips">
          {(['all', 'A2', 'B1', 'B2'] as const).map(l => <button key={l} className={`chip${level === l ? ' on' : ''}`} onClick={() => setLevel(l)}>{l === 'all' ? 'Any level' : l}</button>)}
        </div>
      </div>
      <div className="list">
        {list.map(q => {
          const p = progress.interview[q.id];
          return (
            <a key={q.id} className="list-item" href={href('interview', q.id)}>
              <div>
                <div className="q">{q.question}</div>
                <div className="meta"><Badge>{q.level}</Badge> <span className="muted small">{CATEGORIES.find(c => c.id === q.category)?.label}</span></div>
              </div>
              {p ? <Badge tone={p.best >= 0.8 ? 'good' : 'warn'}>best {Math.round(p.best * 100)}</Badge> : <span className="muted small">new</span>}
            </a>
          );
        })}
      </div>
    </>
  );
}

function buildMock(): InterviewQuestion[] {
  const pick = (cat: InterviewCategory, n: number) =>
    INTERVIEW_QUESTIONS.filter(q => q.category === cat).sort(() => Math.random() - 0.5).slice(0, n);
  return [...pick('intro', 1), ...pick('behavioral', 2), ...pick('technical', 1), ...pick('remote', 1), ...pick('closing', 1)];
}

export function InterviewPractice({ id }: { id: string }) {
  const mock = id === 'mock';
  const queue = useMemo(() => (mock ? buildMock() : INTERVIEW_QUESTIONS.filter(q => q.id === id)), [id, mock]);
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);

  if (!queue.length) return <p>Question not found. <a href={href('interview')}>Back to the list</a></p>;

  if (mock && index >= queue.length) {
    const avg = scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length);
    return (
      <Card className="center">
        <h1>Interview finished 🎉</h1>
        <Score value={avg} />
        <p className="lead">{avg >= 0.8 ? '¡Excelente! Estás listo para una entrevista real.' : avg >= 0.5 ? 'Vas muy bien. Repite las preguntas con menor puntaje.' : 'Buen comienzo. Practica las frases clave y vuelve a intentarlo.'}</p>
        <ol className="summary">{queue.map((q, i) => <li key={q.id}><a href={href('interview', q.id)}>{q.question}</a> — <b>{Math.round((scores[i] ?? 0) * 100)}</b></li>)}</ol>
        <div className="row center"><button className="btn primary" onClick={() => location.reload()}>New mock interview</button><a className="btn ghost" href={href('interview')}>All questions</a></div>
      </Card>
    );
  }

  const q = queue[index];
  const nextIndex = queue.findIndex(x => x.id === q.id) + 1;
  const nextSingle = INTERVIEW_QUESTIONS[(INTERVIEW_QUESTIONS.findIndex(x => x.id === q.id) + 1) % INTERVIEW_QUESTIONS.length];
  return (
    <QuestionSession
      key={q.id + index}
      q={q}
      position={mock ? `Question ${index + 1} of ${queue.length}` : undefined}
      nextLabel={mock ? (nextIndex < queue.length ? 'Next question →' : 'See results →') : 'Next question →'}
      onNext={score => {
        if (mock) { setScores(s => [...s, score]); setIndex(i => i + 1); }
        else go('interview', nextSingle.id);
      }}
    />
  );
}

function QuestionSession({ q, position, nextLabel, onNext }: { q: InterviewQuestion; position?: string; nextLabel: string; onNext: (score: number) => void }) {
  const [answer, setAnswer] = useState('');
  const [spokenMs, setSpokenMs] = useState(0);
  const [hideText, setHideText] = useState(false);
  const [result, setResult] = useState<null | {
    score: number;
    issues: ReturnType<typeof findIssues>;
    coverage: ReturnType<typeof keywordCoverage>;
    stats: ReturnType<typeof speechStats>;
    parts: { grammar: number; answered: number; detail: number };
  }>(null);

  const check = () => {
    const issues = findIssues(answer, { typed: spokenMs === 0, interview: true });
    const coverage = keywordCoverage(q.keywords, answer);
    const stats = speechStats(answer, spokenMs || undefined);
    // Three separate questions: is it correct? did you answer? is it complete enough for an interview?
    const grammar = Math.max(0, 1 - issues.length * 0.25);
    const answered = coverage.hits.length > 0 || stats.words >= 5 ? 1 : stats.words >= 2 ? 0.5 : 0;
    const detail = Math.min(1, stats.words / EXPECTED_WORDS[q.level]) * 0.5 + coverage.ratio * 0.5;
    const score = grammar * 0.4 + answered * 0.3 + detail * 0.3;
    setResult({ score, issues, coverage, stats, parts: { grammar, answered, detail } });
    updateProgress(p => {
      const prev = p.interview[q.id];
      p.interview[q.id] = { attempts: (prev?.attempts ?? 0) + 1, best: Math.max(prev?.best ?? 0, score), lastAnswer: answer };
    });
  };

  return (
    <div className="stack">
      <a className="back" href={href('interview')}>← All questions</a>
      <Card>
        <div className="row between">
          <div className="row"><Badge>{q.level}</Badge>{position && <span className="muted small">{position}</span>}</div>
          <label className="muted small"><input type="checkbox" checked={hideText} onChange={e => setHideText(e.target.checked)} /> Listening mode (hide text)</label>
        </div>
        <h1 className={`question${hideText ? ' blurred' : ''}`}>{q.question}</h1>
        <div className="row wrap">
          <ListenButton text={q.question} label="Listen" />
          <ListenButton text={q.question} label="Slow" slow />
        </div>
        <details className="tip"><summary>💡 Tip</summary><p>{q.tipEs}</p></details>
      </Card>

      <Card>
        <div className="row between wrap">
          <h2>Your answer</h2>
          <span className="muted small">📏 Ideal: {LENGTH_HINT[q.level]}</span>
        </div>
        <SpeakBox value={answer} onChange={v => { setAnswer(v); setResult(null); }} onSpeechEnd={r => setSpokenMs(ms => ms + r.durationMs)} />
        <div className="row wrap">
          <button className="btn primary" onClick={check} disabled={!answer.trim()}>Check my answer</button>
          {result && <button className="btn ghost" onClick={() => onNext(result.score)}>{nextLabel}</button>}
          {!result && position && <button className="btn ghost" onClick={() => onNext(0)}>Skip</button>}
        </div>
      </Card>

      {result && (
        <Card className="feedback">
          <div className="row between wrap">
            <h2>Feedback</h2>
            <Score value={result.score} />
          </div>
          <div className="parts">
            <div className={result.parts.grammar === 1 ? 'ok' : 'no'}><b>{result.parts.grammar === 1 ? '✅' : '✏️'} Grammar</b><span>{result.issues.length ? `${result.issues.length} to fix` : 'no mistakes found'}</span></div>
            <div className={result.parts.answered === 1 ? 'ok' : 'no'}><b>{result.parts.answered === 1 ? '✅' : '❓'} Answered</b><span>{result.parts.answered === 1 ? 'you answered the question' : 'try a full sentence'}</span></div>
            <div className={result.parts.detail >= 0.6 ? 'ok' : 'no'}><b>📏 Detail</b><span>{Math.round(result.parts.detail * 100)}% · {result.stats.words} words</span></div>
          </div>
          <p className="verdict">
            {result.issues.length > 0
              ? 'Corrige los errores de abajo y vuelve a intentarlo.'
              : result.parts.detail >= 0.6
                ? '🎉 Respuesta correcta y completa. ¡Así se responde en una entrevista!'
                : `✅ Tu respuesta es correcta. En una entrevista conviene agregar 1–2 detalles (ideal: ${LENGTH_HINT[q.level]}) para que la conversación fluya.`}
          </p>
          {result.stats.wpm && result.stats.wpm < 90 && <p className="muted small">Hablas a {result.stats.wpm} palabras/min. Un ritmo cómodo en entrevista es 110–150. Practica las frases clave para ganar fluidez.</p>}

          {result.coverage.misses.length > 0 && (
            <>
              <h3>Ideas you could add</h3>
              <div className="chips">
                {result.coverage.hits.map(k => <span key={k} className="chip hit">✓ {k}</span>)}
                {result.coverage.misses.map(k => <span key={k} className="chip miss">+ {k}</span>)}
              </div>
            </>
          )}

          <h3>Common mistakes</h3>
          <IssueList issues={result.issues} />

          <h3>AI review (optional)</h3>
          <AIFeedback context={`Interview question: "${q.question}"`} answer={answer} />

          <h3>Model answer</h3>
          <Reveal label="Show model answer">
            <blockquote>{q.modelAnswer}</blockquote>
            <div className="row wrap"><ListenButton text={q.modelAnswer} /><ListenButton text={q.modelAnswer} label="Slow" slow /></div>
          </Reveal>

          <h3>Phrases to memorize</h3>
          <ul className="phrases">
            {q.phrases.map(ph => <li key={ph}><span>{ph}</span><ListenButton text={ph.replace(/\.\.\.|…/g, '')} label="" small /></li>)}
          </ul>
        </Card>
      )}
    </div>
  );
}
