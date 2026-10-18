import { INTERVIEW_QUESTIONS } from '../data/interview';
import { LADDER_STEPS } from '../data/ladder';
import { PRONUNCIATION_WORDS } from '../data/pronunciation';
import { href } from '../lib/router';
import { streak, today, useProgress } from '../lib/storage';
import { Card } from '../components/ui';

const MODULES = [
  { path: 'interview', icon: '🎤', title: 'Mock interviews', text: `${INTERVIEW_QUESTIONS.length} preguntas reales: presentación, comportamiento, técnicas y trabajo remoto.` },
  { path: 'ladder', icon: '🪜', title: 'Sentence ladder', text: `${LADDER_STEPS.length} escalones: de "I am a developer" a respuestas STAR completas.` },
  { path: 'pronunciation', icon: '🗣️', title: 'Pronunciation', text: `${PRONUNCIATION_WORDS.length} palabras técnicas con IPA, guía en español y evaluación por voz.` },
  { path: 'remote', icon: '💻', title: 'Remote work English', text: 'Standups, Slack, pull requests, code review y correos.' },
  { path: 'real', icon: '🌍', title: 'Real dev English', text: 'Lee en voz alta pull requests reales de React, Vite, Laravel y más.' },
  { path: 'progress', icon: '📈', title: 'Progress', text: 'Racha diaria, actividad y las palabras que más te cuestan.' },
];

export function Home() {
  const p = useProgress();
  const s = streak(p);
  const practicedToday = p.activity[today()] ?? 0;

  // Suggest the first unfinished ladder step and a question not answered yet.
  const nextStep = [...LADDER_STEPS].sort((a, b) => a.order - b.order).find(st => (p.ladder[st.id]?.length ?? 0) < st.exercises.length);
  const nextQuestion = INTERVIEW_QUESTIONS.find(q => !p.interview[q.id]) ?? INTERVIEW_QUESTIONS[0];
  const weakWord = Object.entries(p.pron).filter(([, v]) => v.tries > 0 && v.hits / v.tries < 0.7).map(([w]) => w)[0];

  return (
    <>
      <section className="hero">
        <h1>Speak tech English<br /><span className="accent-text">with confidence.</span></h1>
        <p className="lead">Practica entrevistas y el inglés del trabajo remoto en voz alta. Gratis, sin registro y todo corre en tu navegador.</p>
        <div className="row wrap">
          <a className="btn primary lg" href={href('interview', 'mock')}>▶ Start a mock interview</a>
          <a className="btn ghost lg" href={href('ladder')}>Start from the basics</a>
        </div>
      </section>

      <Card className="today">
        <div className="row between wrap">
          <h2>Today's plan</h2>
          <span className="muted">{s > 0 ? `🔥 ${s}-day streak` : 'Practica hoy para empezar tu racha'} · {practicedToday} practices today</span>
        </div>
        <ol className="plan">
          {nextStep && <li><a href={href('ladder', nextStep.id)}>🪜 Ladder: <b>{nextStep.title}</b></a></li>}
          <li><a href={href('pronunciation')}>🗣️ Pronunciation: {weakWord ? <>repeat <b>{weakWord}</b></> : <>5 new words</>}</a></li>
          <li><a href={href('interview', nextQuestion.id)}>🎤 Interview: <b>{nextQuestion.question}</b></a></li>
        </ol>
      </Card>

      <div className="grid modules-grid">
        {MODULES.map(m => (
          <a key={m.path} className="tile big" href={href(m.path)}>
            <span className="icon">{m.icon}</span>
            <div className="q">{m.title}</div>
            <p className="muted small">{m.text}</p>
          </a>
        ))}
      </div>
    </>
  );
}

export function About() {
  return (
    <div className="prose">
      <h1>About DevSpeak</h1>
      <p>DevSpeak is a free tool for Spanish-speaking developers who read and write English well but freeze when they have to <b>speak</b> it — in interviews, standups or calls.</p>
      <h2>Why it works</h2>
      <ul>
        <li><b>Production over recognition.</b> Entender no es lo mismo que producir. Todo aquí te obliga a decir las frases en voz alta.</li>
        <li><b>Chunks, not words.</b> Aprendes frases completas ("I was responsible for…") que puedes reutilizar como snippets.</li>
        <li><b>Mistakes Spanish speakers actually make.</b> El revisor detecta errores típicos: "I am developer", "I like play", "for learn", "because is…".</li>
      </ul>
      <h2>Privacy</h2>
      <ul>
        <li>No accounts, no backend, no tracking. Your progress is stored in your browser (localStorage).</li>
        <li>Speech recognition uses your browser's built-in Web Speech API. In Chrome, audio is processed by Google's speech service.</li>
        <li>The optional AI review runs a small language model <b>on your device</b> with WebGPU (WebLLM). Your answers never leave your computer.</li>
        <li>"Real dev English" reads public pull requests directly from the GitHub API.</li>
      </ul>
      <h2>Best experience</h2>
      <p>Use desktop Chrome or Edge with a microphone. Firefox and Safari can listen and type, but can't evaluate your voice.</p>
      <h2>Built with</h2>
      <p>React, TypeScript, Vite, the Web Speech API and WebLLM. Hosted on Cloudflare Pages.</p>
    </div>
  );
}
