import { useEffect, useRef, useState, type ReactNode } from 'react';
import { speak, stopSpeaking, useRecognizer, canSpeak, type RecognitionResult } from '../lib/speech';
import type { DiffToken } from '../lib/compare';
import type { Issue } from '../lib/feedback';

export function ListenButton({ text, label = 'Listen', slow = false, small = false }: { text: string; label?: string; slow?: boolean; small?: boolean }) {
  const [playing, setPlaying] = useState(false);
  if (!canSpeak) return null;
  const onClick = async () => {
    if (playing) { stopSpeaking(); setPlaying(false); return; }
    setPlaying(true);
    await speak(text, slow ? 0.7 : 1);
    setPlaying(false);
  };
  return (
    <button type="button" className={`btn ghost${small ? ' sm' : ''}`} onClick={onClick} aria-label={`${label}: ${text}`}>
      {playing ? '⏹ Stop' : `${slow ? '🐢' : '🔊'} ${label}`}
    </button>
  );
}

/**
 * Text area that can be filled by voice or by typing.
 * Speech is appended to what is already there, so the learner can speak in several takes.
 */
export function SpeakBox({ value, onChange, onSpeechEnd, rows = 5, placeholder = 'Press “Speak” and answer out loud… or type here.', continuous = true, append = true }: {
  value: string;
  onChange: (v: string) => void;
  onSpeechEnd?: (r: RecognitionResult) => void;
  rows?: number;
  placeholder?: string;
  continuous?: boolean;
  /** Keep the existing text and add the new speech after it (false = each take replaces the text). */
  append?: boolean;
}) {
  const base = useRef(value);
  const rec = useRecognizer({
    continuous,
    onFinal: r => {
      const next = [base.current, r.transcript].filter(s => s.trim()).join(base.current.trim() ? ' ' : '');
      onChange(next);
      onSpeechEnd?.(r);
    },
  });
  const shown = rec.listening ? [base.current, rec.interim].filter(Boolean).join(' ') : value;
  const toggle = () => {
    if (rec.listening) { rec.stop(); return; }
    base.current = append ? value : '';
    stopSpeaking();
    rec.start();
  };
  return (
    <div className="speakbox">
      <textarea
        rows={rows}
        value={shown}
        readOnly={rec.listening}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        spellCheck={false}
      />
      <div className="row">
        <button type="button" className={`btn ${rec.listening ? 'danger pulse' : 'primary'}`} onClick={toggle} disabled={!rec.supported}>
          {rec.listening ? '⏹ Stop' : '🎤 Speak'}
        </button>
        {value && !rec.listening && <button type="button" className="btn ghost" onClick={() => onChange('')}>Clear</button>}
        {rec.listening && <span className="muted small">Listening… speak naturally, then press Stop.</span>}
      </div>
      {!rec.supported && <p className="note">🎙️ El reconocimiento de voz funciona en Chrome o Edge. Aquí puedes escribir tu respuesta.</p>}
      {rec.error && <p className="note warn">{rec.error}</p>}
    </div>
  );
}

export function WordDiff({ tokens }: { tokens: DiffToken[] }) {
  return (
    <p className="diff" aria-label="Comparison with the target sentence">
      {tokens.map((t, i) => (
        <span key={i} className={`w ${t.status}`} title={t.status === 'missed' ? 'Missing or not understood' : t.status === 'extra' ? 'Extra word' : 'OK'}>
          {t.text}
        </span>
      ))}
    </p>
  );
}

export function IssueList({ issues }: { issues: Issue[] }) {
  if (!issues.length) return <p className="good">✅ No common mistakes detected.</p>;
  return (
    <ul className="issues">
      {issues.map((i, k) => (
        <li key={k}>
          <div><span className="strike">{i.found}</span> → <strong>{i.fix}</strong></div>
          <div className="muted small">{i.whyEs}</div>
        </li>
      ))}
    </ul>
  );
}

export function Badge({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'good' | 'warn' | 'accent' }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export function Bar({ value }: { value: number }) {
  return <div className="bar" role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${Math.round(Math.min(1, value) * 100)}%` }} /></div>;
}

export function Score({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const tone = pct >= 80 ? 'good' : pct >= 50 ? 'mid' : 'low';
  return <div className={`score ${tone}`}><b>{pct}</b><span>/100</span></div>;
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>;
}

/** Shows content only after the learner asks for it (to avoid peeking at answers). */
export function Reveal({ label, children, open: startOpen = false }: { label: string; children: ReactNode; open?: boolean }) {
  const [open, setOpen] = useState(startOpen);
  useEffect(() => setOpen(startOpen), [startOpen]);
  return open ? <>{children}</> : <button type="button" className="btn ghost" onClick={() => setOpen(true)}>{label}</button>;
}

/** Tiny markdown renderer for the AI output: **bold** and "- " bullets. */
export function MiniMarkdown({ text }: { text: string }) {
  const bold = (s: string) => s.split(/(\*\*[^*]+\*\*)/g).map((p, i) => p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p);
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => { if (list.length) { blocks.push(<ul key={blocks.length}>{list.map((l, i) => <li key={i}>{bold(l)}</li>)}</ul>); list = []; } };
  for (const line of text.split('\n')) {
    if (/^\s*[-*]\s+/.test(line)) list.push(line.replace(/^\s*[-*]\s+/, ''));
    else { flush(); if (line.trim()) blocks.push(<p key={blocks.length}>{bold(line)}</p>); }
  }
  flush();
  return <div className="md">{blocks}</div>;
}
