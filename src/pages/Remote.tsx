import { useState } from 'react';
import { REMOTE_SCENARIOS } from '../data/remote';
import type { RemoteKind } from '../data/types';
import { findIssues } from '../lib/feedback';
import { href } from '../lib/router';
import { updateProgress, useProgress } from '../lib/storage';
import { AIFeedback } from '../components/AIFeedback';
import { Badge, Card, IssueList, ListenButton, Reveal, SpeakBox } from '../components/ui';

const KINDS: { id: RemoteKind; label: string; icon: string }[] = [
  { id: 'standup', label: 'Daily standup', icon: '☀️' },
  { id: 'meeting', label: 'Meetings', icon: '🎥' },
  { id: 'slack', label: 'Slack / chat', icon: '💬' },
  { id: 'pull-request', label: 'Pull requests', icon: '🔀' },
  { id: 'code-review', label: 'Code review', icon: '🔍' },
  { id: 'email', label: 'Email', icon: '✉️' },
];

export function RemoteList() {
  const progress = useProgress();
  return (
    <>
      <header className="page-head">
        <h1>Remote work English</h1>
        <p className="lead">En remoto casi todo es por escrito o en llamadas cortas. Practica las situaciones de todos los días con plantillas reales.</p>
      </header>
      {KINDS.map(k => {
        const items = REMOTE_SCENARIOS.filter(s => s.kind === k.id);
        if (!items.length) return null;
        return (
          <section key={k.id} className="group">
            <h2>{k.icon} {k.label}</h2>
            <div className="grid">
              {items.map(s => (
                <a key={s.id} className="tile" href={href('remote', s.id)}>
                  <div className="q">{s.title}</div>
                  <div className="row between">
                    <Badge tone={s.mode === 'spoken' ? 'accent' : 'default'}>{s.mode === 'spoken' ? '🎤 spoken' : '⌨️ written'}</Badge>
                    {progress.remote[s.id] && <Badge tone="good">✓ done</Badge>}
                  </div>
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

/** Renders "{placeholder}" parts of a template as highlighted blanks. */
function Template({ text }: { text: string }) {
  return <pre className="template">{text.split(/(\{[^}]+\})/g).map((p, i) => p.startsWith('{') ? <mark key={i}>{p.slice(1, -1)}</mark> : p)}</pre>;
}

export function RemoteScenarioPage({ id }: { id: string }) {
  const progress = useProgress();
  const s = REMOTE_SCENARIOS.find(x => x.id === id);
  const [answer, setAnswer] = useState('');
  const [spoken, setSpoken] = useState(false);
  const [issues, setIssues] = useState<ReturnType<typeof findIssues> | null>(null);
  if (!s) return <p>Scenario not found. <a href={href('remote')}>Back</a></p>;

  const check = () => {
    setIssues(findIssues(answer, { typed: !spoken }));
    updateProgress(p => { p.remote[s.id] = true; });
  };
  const idx = REMOTE_SCENARIOS.findIndex(x => x.id === s.id);
  const next = REMOTE_SCENARIOS[(idx + 1) % REMOTE_SCENARIOS.length];

  return (
    <div className="stack">
      <a className="back" href={href('remote')}>← All situations</a>
      <Card>
        <div className="row between wrap">
          <Badge tone={s.mode === 'spoken' ? 'accent' : 'default'}>{s.mode === 'spoken' ? '🎤 Say it out loud' : '⌨️ Write it'}</Badge>
          {progress.remote[s.id] && <Badge tone="good">✓ practiced</Badge>}
        </div>
        <h1>{s.title}</h1>
        <p className="prompt">💬 {s.situationEs}</p>
        <h3>Template</h3>
        <Template text={s.template} />
        <h3>Useful phrases</h3>
        <ul className="phrases">
          {s.phrases.map(ph => <li key={ph}><span>{ph}</span><ListenButton text={ph.replace(/\.\.\.|…/g, '')} label="" small /></li>)}
        </ul>
        <Reveal label="Show a full example">
          <h3>Example</h3>
          <pre className="example-text">{s.example}</pre>
          <ListenButton text={s.example.replace(/\n+/g, '. ')} label="Listen to the example" />
        </Reveal>
      </Card>

      <Card>
        <h2>Your turn</h2>
        <p className="muted small">{s.mode === 'spoken' ? 'Usa la plantilla y dilo en voz alta, como si estuvieras en la llamada.' : 'Escríbelo como lo mandarías de verdad. También puedes dictarlo.'}</p>
        <SpeakBox rows={s.mode === 'written' ? 7 : 4} value={answer} onChange={v => { setAnswer(v); setIssues(null); }} onSpeechEnd={() => setSpoken(true)}
          placeholder={s.mode === 'spoken' ? 'Press “Speak” and give your update…' : 'Write your message here…'} />
        <button className="btn primary" onClick={check} disabled={!answer.trim()}>Check</button>
        {issues && (
          <div className="feedback">
            <h3>Common mistakes</h3>
            <IssueList issues={issues} />
            <h3>AI review (optional)</h3>
            <AIFeedback context={`Workplace situation: ${s.title}. The student must produce a ${s.mode} message for a remote software team. Template: "${s.template}"`} answer={answer} />
          </div>
        )}
      </Card>
      <a className="btn ghost self-end" href={href('remote', next.id)}>Next: {next.title} →</a>
    </div>
  );
}
