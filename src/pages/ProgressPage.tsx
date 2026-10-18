import { useRef, useState } from 'react';
import { INTERVIEW_QUESTIONS } from '../data/interview';
import { LADDER_STEPS } from '../data/ladder';
import { PRONUNCIATION_WORDS } from '../data/pronunciation';
import { REMOTE_SCENARIOS } from '../data/remote';
import { href } from '../lib/router';
import { replaceProgress, resetProgress, streak, useProgress, type Progress } from '../lib/storage';
import { Bar, Card } from '../components/ui';

export function ProgressPage() {
  const p = useProgress();
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [msg, setMsg] = useState('');

  const interviewDone = Object.keys(p.interview).length;
  const interviewAvg = interviewDone ? Object.values(p.interview).reduce((a, b) => a + b.best, 0) / interviewDone : 0;
  const ladderTotal = LADDER_STEPS.reduce((a, s) => a + s.exercises.length, 0);
  const ladderDone = Object.values(p.ladder).reduce((a, b) => a + b.length, 0);
  const pronStats = Object.values(p.pron);
  const pronTries = pronStats.reduce((a, b) => a + b.tries, 0);
  const pronHits = pronStats.reduce((a, b) => a + b.hits, 0);
  const remoteDone = Object.values(p.remote).filter(Boolean).length;
  const hardest = Object.entries(p.pron)
    .filter(([, s]) => s.tries >= 2)
    .map(([w, s]) => ({ w, acc: s.hits / s.tries, tries: s.tries }))
    .sort((a, b) => a.acc - b.acc)
    .slice(0, 8);

  // last 12 weeks, oldest first, aligned so each column is a week
  const days: { date: string; count: number }[] = [];
  const d = new Date();
  d.setDate(d.getDate() - 83);
  for (let i = 0; i < 84; i++) { const k = d.toLocaleDateString('en-CA'); days.push({ date: k, count: p.activity[k] ?? 0 }); d.setDate(d.getDate() + 1); }
  const activeDays = Object.keys(p.activity).length;

  const exportData = () => {
    const blob = new Blob([JSON.stringify(p, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `devspeak-progress-${new Date().toLocaleDateString('en-CA')}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importData = async (file: File) => {
    try {
      const data = JSON.parse(await file.text()) as Progress;
      if (typeof data !== 'object' || !data.activity) throw new Error();
      replaceProgress(data);
      setMsg('✅ Progress imported.');
    } catch {
      setMsg('❌ That file is not a DevSpeak backup.');
    }
  };

  return (
    <>
      <header className="page-head">
        <h1>Your progress</h1>
        <p className="lead">Todo se guarda solo en este navegador. Descarga un respaldo si cambias de computadora.</p>
      </header>
      <div className="kpis">
        <div className="kpi"><b>{streak(p)}🔥</b><span>day streak</span></div>
        <div className="kpi"><b>{activeDays}</b><span>days practiced</span></div>
        <div className="kpi"><b>{interviewDone ? Math.round(interviewAvg * 100) : '—'}</b><span>avg interview score</span></div>
        <div className="kpi"><b>{pronTries ? Math.round(pronHits / pronTries * 100) + '%' : '—'}</b><span>pronunciation accuracy</span></div>
      </div>

      <Card>
        <h2>Activity</h2>
        <div className="heatmap" aria-label="Practice activity in the last 12 weeks">
          {days.map(day => <i key={day.date} title={`${day.date}: ${day.count}`} className={`l${Math.min(4, Math.ceil(day.count / 3))}`} />)}
        </div>
      </Card>

      <Card>
        <h2>Modules</h2>
        <div className="modules">
          <a href={href('interview')}><span>🎤 Interview questions</span><Bar value={interviewDone / INTERVIEW_QUESTIONS.length} /><small>{interviewDone}/{INTERVIEW_QUESTIONS.length}</small></a>
          <a href={href('ladder')}><span>🪜 Ladder exercises</span><Bar value={ladderDone / ladderTotal} /><small>{ladderDone}/{ladderTotal}</small></a>
          <a href={href('pronunciation')}><span>🗣️ Words practiced</span><Bar value={pronStats.length / PRONUNCIATION_WORDS.length} /><small>{pronStats.length}/{PRONUNCIATION_WORDS.length}</small></a>
          <a href={href('remote')}><span>💻 Remote situations</span><Bar value={remoteDone / REMOTE_SCENARIOS.length} /><small>{remoteDone}/{REMOTE_SCENARIOS.length}</small></a>
        </div>
      </Card>

      {hardest.length > 0 && (
        <Card>
          <h2>Words to practice</h2>
          <div className="wordgrid">
            {hardest.map(h => <a key={h.w} className="wordchip bad" href={href('pronunciation')}>{h.w} · {Math.round(h.acc * 100)}%</a>)}
          </div>
        </Card>
      )}

      <Card>
        <h2>Backup</h2>
        <div className="row wrap">
          <button className="btn" onClick={exportData}>⬇ Download backup</button>
          <button className="btn ghost" onClick={() => fileRef.current?.click()}>⬆ Import backup</button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={e => { const f = e.target.files?.[0]; if (f) importData(f); e.target.value = ''; }} />
          {confirmReset
            ? <><button className="btn danger" onClick={() => { resetProgress(); setConfirmReset(false); setMsg('Progress reset.'); }}>Yes, delete everything</button><button className="btn ghost" onClick={() => setConfirmReset(false)}>Cancel</button></>
            : <button className="btn ghost" onClick={() => setConfirmReset(true)}>Reset progress</button>}
        </div>
        {msg && <p className="muted small">{msg}</p>}
      </Card>
    </>
  );
}
