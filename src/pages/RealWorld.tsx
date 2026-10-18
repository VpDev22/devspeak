import { useEffect, useState } from 'react';
import { diffWords } from '../lib/compare';
import { useRecognizer, stopSpeaking } from '../lib/speech';
import { updateProgress } from '../lib/storage';
import { Card, ListenButton, Score, WordDiff } from '../components/ui';

// Real English from real open-source projects: recently merged pull requests, read live from the public GitHub API.

const REPOS = ['facebook/react', 'vitejs/vite', 'laravel/framework', 'microsoft/vscode', 'vercel/next.js', 'nodejs/node', 'php/php-src', 'tailwindlabs/tailwindcss'];

interface PR { number: number; title: string; summary: string; url: string; author: string }

function summarize(body: string | null): string {
  if (!body) return '';
  const text = body
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#+\s.*$/gm, ' ')
    .replace(/^\s*[-*]\s*\[[ x]\]\s*/gim, '')
    .replace(/[`*_>#|]/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const sentences = text.match(/[^.!?]+[.!?]/g) ?? [text];
  let out = '';
  for (const s of sentences) { if ((out + s).length > 320) break; out += s; }
  return out.trim() || text.slice(0, 280);
}

async function fetchPRs(repo: string): Promise<PR[]> {
  const key = `devspeak:prs:${repo}`;
  try { const cached = sessionStorage.getItem(key); if (cached) return JSON.parse(cached); } catch { /* ignore */ }
  const res = await fetch(`https://api.github.com/repos/${repo}/pulls?state=closed&sort=updated&direction=desc&per_page=40`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (res.status === 403 || res.status === 429) throw new Error('GitHub limita las peticiones sin cuenta (60 por hora). Intenta más tarde o con otro repositorio.');
  if (!res.ok) throw new Error(`GitHub respondió ${res.status}`);
  const data: { number: number; title: string; body: string | null; html_url: string; merged_at: string | null; user: { login: string } | null }[] = await res.json();
  const prs = data
    .filter(p => p.merged_at && !/^(bump|chore\(deps|\[?bot\]?|revert)/i.test(p.title) && !/bot/i.test(p.user?.login ?? ''))
    .map(p => ({ number: p.number, title: p.title, summary: summarize(p.body), url: p.html_url, author: p.user?.login ?? '' }))
    .slice(0, 20);
  try { sessionStorage.setItem(key, JSON.stringify(prs)); } catch { /* ignore */ }
  return prs;
}

export function RealWorldPage() {
  const [repo, setRepo] = useState(REPOS[0]);
  const [prs, setPrs] = useState<PR[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setPrs(null); setError('');
    fetchPRs(repo).then(p => alive && setPrs(p)).catch(e => alive && setError(e.message));
    return () => { alive = false; };
  }, [repo]);

  return (
    <>
      <header className="page-head">
        <h1>Real dev English 🌍</h1>
        <p className="lead">Pull requests reales, recién fusionados en proyectos open source. Así escriben los equipos de verdad: léelos en voz alta y aprende su vocabulario.</p>
      </header>
      <Card className="tipcard">
        <p>💡 <b>Los títulos de PR y commits usan imperativo:</b> <i>Fix</i>, <i>Add</i>, <i>Remove</i>, <i>Update</i>, <i>Support</i>… (no <i>Fixed</i> ni <i>Fixing</i>). Piensa en ellos como “Este cambio va a… <i>fix the login bug</i>”.</p>
      </Card>
      <div className="chips">
        {REPOS.map(r => <button key={r} className={`chip${repo === r ? ' on' : ''}`} onClick={() => setRepo(r)}>{r}</button>)}
      </div>
      {error && <p className="note warn">{error}</p>}
      {!prs && !error && <p className="muted">Loading pull requests from GitHub…</p>}
      <div className="stack">
        {prs?.map(pr => <PRCard key={pr.number} pr={pr} />)}
        {prs && prs.length === 0 && <p className="muted">No recent merged pull requests found.</p>}
      </div>
    </>
  );
}

function PRCard({ pr }: { pr: PR }) {
  const [result, setResult] = useState<ReturnType<typeof diffWords> | null>(null);
  const [heard, setHeard] = useState('');
  const rec = useRecognizer({
    onFinal: r => { if (r.transcript) { setHeard(r.transcript); setResult(diffWords(pr.title, r.transcript)); updateProgress(() => {}); } },
  });
  const verb = pr.title.replace(/^\[[^\]]*\]\s*|^[\w-]+(\([^)]*\))?!?:\s*/, '').split(/\s+/)[0];
  return (
    <Card className="pr">
      <div className="row between wrap">
        <a className="muted small" href={pr.url} target="_blank" rel="noreferrer">#{pr.number} by {pr.author} ↗</a>
        {verb && /^[A-Z][a-z]+$/.test(verb) && <span className="badge accent">verb: {verb}</span>}
      </div>
      <h3 className="pr-title">{pr.title}</h3>
      {pr.summary && <p className="muted">{pr.summary}</p>}
      <div className="row wrap">
        <ListenButton text={pr.title} small />
        {pr.summary && <ListenButton text={pr.summary} label="Listen to summary" small />}
        <button className={`btn sm ${rec.listening ? 'danger pulse' : 'primary'}`} disabled={!rec.supported}
          onClick={() => { if (rec.listening) rec.stop(); else { stopSpeaking(); setResult(null); rec.start(); } }}>
          {rec.listening ? '⏹ Listening…' : '🎤 Read the title'}
        </button>
      </div>
      {result && (
        <>
          <div className="row between wrap"><WordDiff tokens={result.tokens} /><Score value={result.score} /></div>
          <p className="muted small">We heard: “{heard}”</p>
        </>
      )}
    </Card>
  );
}
