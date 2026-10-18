import { useCallback, useEffect, useRef, useState } from 'react';

// The Web Speech API has no TypeScript types in lib.dom yet, so we keep it loose here.
/* eslint-disable @typescript-eslint/no-explicit-any */
type Recognition = any;

const w = typeof window !== 'undefined' ? (window as any) : undefined;
const RecognitionClass: (new () => Recognition) | undefined = w?.SpeechRecognition ?? w?.webkitSpeechRecognition;

export const canRecognize = !!RecognitionClass;
export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

const PREFERRED_VOICES = ['Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Guy', 'Samantha', 'Alex'];

function pickVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  const us = voices.filter(v => v.lang.replace('_', '-').toLowerCase().startsWith('en-us'));
  for (const name of PREFERRED_VOICES) {
    const v = us.find(v => v.name.includes(name));
    if (v) return v;
  }
  return us[0] ?? voices.find(v => v.lang.toLowerCase().startsWith('en')) ?? null;
}

if (canSpeak) speechSynthesis.getVoices(); // voices load lazily; this kicks it off

/**
 * Reads text aloud with an American English voice.
 * Long texts are split into sentences because Chrome cuts utterances after ~15 seconds.
 */
export function speak(text: string, rate = 1): Promise<void> {
  if (!canSpeak || !text.trim()) return Promise.resolve();
  speechSynthesis.cancel();
  const parts = text.match(/[^.!?]+[.!?]*/g)?.map(s => s.trim()).filter(Boolean) ?? [text];
  const voice = pickVoice();
  return new Promise(resolve => {
    parts.forEach((part, i) => {
      const u = new SpeechSynthesisUtterance(part);
      u.lang = 'en-US';
      u.rate = rate;
      if (voice) u.voice = voice;
      if (i === parts.length - 1) { u.onend = () => resolve(); u.onerror = () => resolve(); }
      speechSynthesis.speak(u);
    });
  });
}

export function stopSpeaking() {
  if (canSpeak) speechSynthesis.cancel();
}

export interface RecognitionResult {
  transcript: string;
  /** Alternative transcriptions of the last phrase, best first. */
  alternatives: string[];
  durationMs: number;
}

const ERROR_MESSAGES: Record<string, string> = {
  'not-allowed': 'Microphone permission was denied. Allow it in the address bar and try again.',
  'service-not-allowed': 'Speech recognition is blocked in this browser.',
  'audio-capture': 'No microphone was found.',
  network: 'Speech recognition needs an internet connection in this browser.',
};

/** Wraps the browser speech recognizer (Chrome / Edge) in a small React hook. */
export function useRecognizer(opts: { continuous?: boolean; onFinal?: (r: RecognitionResult) => void } = {}) {
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<Recognition | null>(null);
  const startedAt = useRef(0);
  const finalText = useRef('');
  const liveText = useRef('');
  const alternatives = useRef<string[]>([]);
  const optsRef = useRef(opts);
  optsRef.current = opts;

  const start = useCallback(() => {
    if (!RecognitionClass) { setError('Speech recognition needs Chrome or Edge. You can type your answer instead.'); return; }
    recRef.current?.abort();
    const rec = new RecognitionClass();
    rec.lang = 'en-US';
    rec.interimResults = true;
    rec.continuous = !!optsRef.current.continuous;
    rec.maxAlternatives = 5;
    finalText.current = ''; liveText.current = ''; alternatives.current = [];
    setInterim(''); setError(null);

    rec.onresult = (e: any) => {
      let fin = '', live = '';
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) {
          fin += r[0].transcript + ' ';
          const alts: string[] = [];
          for (let k = 0; k < r.length; k++) alts.push(r[k].transcript.trim());
          alternatives.current = alts;
        } else live += r[0].transcript;
      }
      finalText.current = fin.trim();
      liveText.current = (fin + live).trim();
      setInterim(liveText.current);
    };
    rec.onerror = (e: any) => {
      if (e.error !== 'no-speech' && e.error !== 'aborted') setError(ERROR_MESSAGES[e.error] ?? `Speech error: ${e.error}`);
    };
    rec.onend = () => {
      setListening(false);
      recRef.current = null;
      const transcript = finalText.current || liveText.current;
      optsRef.current.onFinal?.({
        transcript,
        alternatives: alternatives.current.length ? alternatives.current : transcript ? [transcript] : [],
        durationMs: Date.now() - startedAt.current,
      });
    };

    recRef.current = rec;
    startedAt.current = Date.now();
    try { rec.start(); setListening(true); } catch { setError('Could not start the microphone.'); }
  }, []);

  const stop = useCallback(() => { recRef.current?.stop(); }, []);

  useEffect(() => () => recRef.current?.abort(), []);

  return { supported: canRecognize, listening, interim, error, start, stop };
}
