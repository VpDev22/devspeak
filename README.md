# DevSpeak 🎤

**Practice technical English and remote job interviews out loud. Free, no signup, everything runs in your browser.**

DevSpeak is for Spanish-speaking developers who can read documentation and write code in English, but freeze when they have to *speak* it in interviews, standups or calls.

## Features

| Module | What you do |
|---|---|
| 🎤 **Mock interviews** | 40 questions (intro, behavioral, technical, remote work, closing) at A2–B2 levels. Listen to the question, answer by voice or text, get a score, key-idea coverage, common mistakes, a model answer and phrases to memorize. |
| 🪜 **Sentence ladder** | 12 grammar steps, 72 exercises. From *"I am a developer"* to STAR interview answers, each step targeting a mistake Spanish speakers really make. |
| 🗣️ **Pronunciation** | 70 tech and interview words with IPA, a Spanish-speaker approximation, and voice checking. Tracks the words you miss most. |
| 💻 **Remote work English** | 14 real situations: standups, Slack, pull requests, code review, meetings, email. Templates, phrases and practice. |
| 🌍 **Real dev English** | Recently merged pull requests from React, Vite, Laravel, Node.js and more, read live from the GitHub API. Practice reading real titles out loud. |
| 📈 **Progress** | Streak, activity heatmap, accuracy and backup/restore as JSON. |

### Feedback without paid APIs

- **Instant rule-based review** that detects typical Spanish-speaker mistakes: missing articles (*I am developer*), *like + -ing*, *to* vs *for*, omitted subjects (*because is easy*), past tense, present perfect, word order, false friends and more.
- **Optional on-device AI review** with [WebLLM](https://github.com/mlc-ai/web-llm) (Qwen 2.5 1.5B or Llama 3.2 3B). The model runs on your GPU via WebGPU, so your answers never leave your computer. It's downloaded only when you ask for it.

## Privacy

No accounts, no backend, no analytics. Progress lives in `localStorage`. Speech recognition uses the browser's Web Speech API (in Chrome, audio is processed by Google's speech service).

## Tech stack

React 19 · TypeScript · Vite · Web Speech API · WebLLM · Cloudflare Pages

## Run locally

```bash
npm install
npm run dev
```

Use desktop Chrome or Edge for speech recognition and WebGPU.

## Deploy to Cloudflare

The site is deployed as static assets on Cloudflare (Pages on Workers). The configuration lives in `cloudflare.config.ts`.

```bash
cf deploy
```

Live: https://devspeak.previewdev.workers.dev

## Project structure

```
src/
  data/        content: interview questions, ladder, pronunciation words, remote scenarios
  lib/         speech (TTS + recognition), word diff, mistake detector, local AI, progress store, router
  components/  shared UI (SpeakBox, WordDiff, AIFeedback…)
  pages/       one file per module
```

## Roadmap

- Phoneme-level pronunciation scoring with wav2vec2 (IPA output, no language model).
- AI interviewer that asks follow-up questions.
- More content: system design and frontend question sets.
