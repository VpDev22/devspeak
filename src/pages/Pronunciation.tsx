import { useMemo, useState } from 'react';
import { PRONUNCIATION_WORDS } from '../data/pronunciation';
import type { PronCategory, PronunciationWord } from '../data/types';
import { diffWords, heardWord } from '../lib/compare';
import { stopSpeaking, useRecognizer } from '../lib/speech';
import { updateProgress, useProgress, type Progress } from '../lib/storage';
import { Card, ListenButton, Score, WordDiff } from '../components/ui';

type Filter = PronCategory | 'all' | 'practice';
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'practice', label: '🎯 Needs practice' },
  { id: 'tech', label: 'Tech' },
  { id: 'interview', label: 'Interview' },
  { id: 'tricky-sounds', label: 'Tricky sounds' },
  { id: 'everyday', label: 'Everyday' },
];

const accuracy = (p: Progress, w: string) => { const s = p.pron[w]; return s && s.tries ? s.hits / s.tries : null; };

export function PronunciationPage() {
  const progress = useProgress();
  const [filter, setFilter] = useState<Filter>('all');
  const words = useMemo(() => PRONUNCIATION_WORDS.filter(w => {
    if (filter === 'all') return true;
    if (filter === 'practice') { const a = accuracy(progress, w.word); return a !== null && a < 0.7; }
    return w.category === filter;
  }), [filter, progress]);
  const [current, setCurrent] = useState<string>(PRONUNCIATION_WORDS[0].word);
  const word = PRONUNCIATION_WORDS.find(w => w.word === current) ?? PRONUNCIATION_WORDS[0];
  const pos = words.findIndex(w => w.word === word.word);
  const move = (d: number) => { if (words.length) setCurrent(words[(Math.max(pos, 0) + d + words.length) % words.length].word); };

  return (
    <>
      <header className="page-head">
        <h1>Pronunciation 🗣️</h1>
        <p className="lead">Escucha, repite y mira si el navegador te entendió. Si te entiende una máquina, te entiende un entrevistador.</p>
      </header>
      <div className="chips">
        {FILTERS.map(f => <button key={f.id} className={`chip${filter === f.id ? ' on' : ''}`} onClick={() => setFilter(f.id)}>{f.label}</button>)}
      </div>
      <div className="pron-layout">
        <WordCard key={word.word} w={word} onPrev={() => move(-1)} onNext={() => move(1)} />
        <div className="wordgrid">
          {words.length === 0 && <p className="muted">Aún no hay palabras difíciles. Practica algunas y aquí aparecerán las que fallas.</p>}
          {words.map(w => {
            const a = accuracy(progress, w.word);
            return (
              <button key={w.word} className={`wordchip${w.word === word.word ? ' on' : ''}${a === null ? '' : a >= 0.7 ? ' good' : ' bad'}`} onClick={() => setCurrent(w.word)}>
                {w.word}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function WordCard({ w, onPrev, onNext }: { w: PronunciationWord; onPrev: () => void; onNext: () => void }) {
  const progress = useProgress();
  const stats = progress.pron[w.word];
  const [heard, setHeard] = useState<{ ok: boolean; alts: string[] } | null>(null);
  const [sentence, setSentence] = useState<ReturnType<typeof diffWords> | null>(null);
  const [said, setSaid] = useState('');

  const wordRec = useRecognizer({
    onFinal: r => {
      if (!r.alternatives.length) return;
      const ok = heardWord(w.word, r.alternatives);
      setHeard({ ok, alts: r.alternatives.slice(0, 3) });
      updateProgress(p => { const s = p.pron[w.word] ?? { tries: 0, hits: 0 }; p.pron[w.word] = { tries: s.tries + 1, hits: s.hits + (ok ? 1 : 0) }; });
    },
  });
  const sentRec = useRecognizer({
    onFinal: r => { if (r.transcript) { setSaid(r.transcript); setSentence(diffWords(w.example, r.transcript)); updateProgress(() => {}); } },
  });
  const listening = wordRec.listening || sentRec.listening;

  return (
    <Card className="wordcard">
      <div className="row between">
        <button className="btn ghost sm" onClick={onPrev} aria-label="Previous word">←</button>
        <span className="muted small">{stats ? `${stats.hits}/${stats.tries} correct` : 'not practiced yet'}</span>
        <button className="btn ghost sm" onClick={onNext} aria-label="Next word">→</button>
      </div>
      <div className="big-word">{w.word}</div>
      <div className="ipa">{w.ipa}</div>
      <div className="approx">💬 {w.approxEs}</div>
      <p className="tipline">💡 {w.tipEs}</p>
      <div className="row center wrap">
        <ListenButton text={w.word} />
        <ListenButton text={w.word} label="Slow" slow />
        <button className={`btn ${wordRec.listening ? 'danger pulse' : 'primary'}`} disabled={!wordRec.supported || sentRec.listening}
          onClick={() => { if (wordRec.listening) wordRec.stop(); else { stopSpeaking(); setHeard(null); wordRec.start(); } }}>
          {wordRec.listening ? '⏹ Listening…' : '🎤 Say the word'}
        </button>
      </div>
      {heard && (
        <div className={`heard ${heard.ok ? 'ok' : 'bad'}`}>
          {heard.ok ? '✅ ¡Se entendió!' : '❌ No se entendió esa palabra.'}
          <span className="muted small"> We heard: “{heard.alts[0]}”{heard.alts.length > 1 && <> (or “{heard.alts.slice(1).join('”, “')}”)</>}</span>
        </div>
      )}

      <div className="example">
        <p>“{w.example}”</p>
        <div className="row center wrap">
          <ListenButton text={w.example} small />
          <button className={`btn sm ${sentRec.listening ? 'danger pulse' : ''}`} disabled={!sentRec.supported || wordRec.listening}
            onClick={() => { if (sentRec.listening) sentRec.stop(); else { stopSpeaking(); setSentence(null); sentRec.start(); } }}>
            {sentRec.listening ? '⏹ Listening…' : '🎤 Say the sentence'}
          </button>
        </div>
        {sentence && (
          <div className="row between wrap">
            <WordDiff tokens={sentence.tokens} />
            <Score value={sentence.score} />
          </div>
        )}
        {sentence && <p className="muted small">We heard: “{said}”</p>}
      </div>
      {!wordRec.supported && <p className="note">🎙️ Para evaluar tu pronunciación abre la página en Chrome o Edge. Escuchar sí funciona aquí.</p>}
      {(wordRec.error || sentRec.error) && <p className="note warn">{wordRec.error || sentRec.error}</p>}
      {listening && <p className="muted small center">Habla claro y a velocidad normal. La grabación termina sola cuando dejas de hablar.</p>}
    </Card>
  );
}
