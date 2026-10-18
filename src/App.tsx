import { useEffect, useState } from 'react';
import { href, useRoute } from './lib/router';
import { stopSpeaking } from './lib/speech';
import { About, Home } from './pages/Home';
import { InterviewList, InterviewPractice } from './pages/Interview';
import { LadderList, LadderStepPage } from './pages/Ladder';
import { PronunciationPage } from './pages/Pronunciation';
import { RemoteList, RemoteScenarioPage } from './pages/Remote';
import { RealWorldPage } from './pages/RealWorld';
import { ProgressPage } from './pages/ProgressPage';

const NAV = [
  { path: 'interview', label: 'Interview' },
  { path: 'ladder', label: 'Ladder' },
  { path: 'pronunciation', label: 'Pronunciation' },
  { path: 'remote', label: 'Remote work' },
  { path: 'real', label: 'Real English' },
  { path: 'progress', label: 'Progress' },
];

function Page({ route }: { route: string[] }) {
  const [section, id] = route;
  switch (section) {
    case undefined: return <Home />;
    case 'interview': return id ? <InterviewPractice key={id} id={id} /> : <InterviewList />;
    case 'ladder': return id ? <LadderStepPage key={id} id={id} /> : <LadderList />;
    case 'pronunciation': return <PronunciationPage />;
    case 'remote': return id ? <RemoteScenarioPage key={id} id={id} /> : <RemoteList />;
    case 'real': return <RealWorldPage />;
    case 'progress': return <ProgressPage />;
    case 'about': return <About />;
    default: return <p>Page not found. <a href="#/">Go home</a></p>;
  }
}

export default function App() {
  const route = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { setMenuOpen(false); stopSpeaking(); }, [route.join('/')]);

  return (
    <>
      <header className="topbar">
        <a className="logo" href="#/"><img src="/favicon.svg" alt="" width={28} height={28} /> DevSpeak</a>
        <button className="menu-btn" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(o => !o)}>☰</button>
        <nav className={menuOpen ? 'open' : ''}>
          {NAV.map(n => <a key={n.path} href={href(n.path)} className={route[0] === n.path ? 'active' : ''}>{n.label}</a>)}
        </nav>
      </header>
      <main>
        <Page route={route} />
      </main>
      <footer>
        <span>DevSpeak · free & open source · no signup</span>
        <a href={href('about')}>About & privacy</a>
      </footer>
    </>
  );
}
