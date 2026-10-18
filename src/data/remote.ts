import type { RemoteScenario } from './types';

export const REMOTE_SCENARIOS: RemoteScenario[] = [
  // ------------------------------------------------------------- STANDUP
  {
    id: "standup-normal-update",
    kind: "standup",
    title: "Daily standup: normal update",
    situationEs: "Es tu turno en el daily standup. Tienes que decir qué hiciste ayer, qué vas a hacer hoy y si tienes bloqueos, en menos de un minuto.",
    template: "Yesterday I {what you did}. Today I'm going to {plan}. {blockers}",
    example:
      "Yesterday I finished the API endpoint for the new notifications screen and opened a pull request. Today I'm going to work on the review comments and start on the unit tests. No blockers for now.",
    phrases: [
      "Yesterday I worked on...",
      "Today I'm going to...",
      "I'm still working on...",
      "No blockers for now.",
      "That's it from me.",
    ],
    mode: "spoken",
  },
  {
    id: "standup-blocked",
    kind: "standup",
    title: "Daily standup: you're blocked",
    situationEs: "Estás bloqueado porque necesitas algo de otra persona o equipo. Explica el bloqueo con claridad y pide ayuda concreta.",
    template: "Yesterday I {what you did}. I'm blocked on {task} because {reason}. Could {person} {what you need}? In the meantime, I'll {alternative work}.",
    example:
      "Yesterday I started the integration with the payments provider. I'm blocked on the checkout flow because I still don't have access to the sandbox account. Could Sarah share the API keys with me after the meeting? In the meantime, I'll work on the error handling and the tests.",
    phrases: [
      "I'm blocked on... because...",
      "I'm waiting for...",
      "Could someone help me with...?",
      "In the meantime, I'll...",
      "Can we talk about it after the standup?",
    ],
    mode: "spoken",
  },
  {
    id: "standup-finished-early",
    kind: "standup",
    title: "Daily standup: you finished early",
    situationEs: "Terminaste tu tarea antes de lo esperado. Comunícalo y ofrece ayuda o pregunta qué sigue.",
    template: "Yesterday I finished {task}, and it's {status}. I have some extra time today, so I can {offer}. Is there anything {question}?",
    example:
      "Yesterday I finished the password reset feature, and it's already merged and deployed to staging. I have some extra time today, so I can pick up the next ticket or help with code reviews. Is there anything that's high priority right now?",
    phrases: [
      "I finished... earlier than expected.",
      "It's already merged and deployed to staging.",
      "I have some extra time today.",
      "I'm happy to help with...",
      "Is there anything that's high priority?",
    ],
    mode: "spoken",
  },

  // -------------------------------------------------------- PULL REQUEST
  {
    id: "pull-request-description",
    kind: "pull-request",
    title: "Writing a pull request description",
    situationEs: "Abriste un pull request y necesitas escribir una descripción clara para que tus compañeros sepan qué cambiaste, por qué y cómo probarlo.",
    template: "## What\n{what this PR changes}\n\n## Why\n{reason or ticket}\n\n## How to test\n1. {step 1}\n2. {step 2}\n\n## Notes\n{anything reviewers should know}",
    example:
      "## What\nAdds two-factor authentication with authenticator apps to the login flow.\n\n## Why\nUsers asked for more account security, and it's required for our enterprise customers. Closes AUTH-142.\n\n## How to test\n1. Log in and go to Settings > Security, then enable 2FA.\n2. Scan the QR code with an authenticator app and log in again with the 6-digit code.\n\n## Notes\nThis PR includes a database migration that adds two columns to the users table. Existing users are not affected until they enable 2FA.",
    phrases: [
      "This PR adds...",
      "This PR fixes a bug where...",
      "Closes / Related to...",
      "To test it, ...",
      "Reviewers should pay attention to...",
      "This change is backward compatible.",
    ],
    mode: "written",
  },
  {
    id: "pull-request-respond-review",
    kind: "pull-request",
    title: "Responding to review comments",
    situationEs: "Un compañero dejó comentarios en tu pull request. Tienes que responder: aceptar un cambio, explicar una decisión y agradecer.",
    template: "Thanks for the review! {response to comment 1}. About {topic}, {explanation}. {next step}",
    example:
      "Thanks for the review! Good catch on the missing null check, I fixed it in the latest commit. About using a separate table for the 2FA codes, I kept them in the users table because we only store one secret per user, but I'm happy to change it if you think it's better. I'll re-request your review once the tests pass.",
    phrases: [
      "Thanks for the review!",
      "Good catch, fixed in the latest commit.",
      "I did it this way because...",
      "I'm happy to change it if you think...",
      "Let's handle this in a separate PR.",
      "I'll re-request your review once...",
    ],
    mode: "written",
  },

  // --------------------------------------------------------------- SLACK
  {
    id: "slack-asking-for-help",
    kind: "slack",
    title: "Asking for help on Slack",
    situationEs: "Llevas un rato atascado con un problema y quieres pedir ayuda en el canal del equipo. Da contexto, lo que ya intentaste y una pregunta concreta.",
    template: "Hi team! I'm working on {task} and I'm stuck on {problem}. I've already tried {what you tried}. {error or details}. Has anyone seen this before?",
    example:
      "Hi team! I'm working on the push notifications for the mobile app, and I'm stuck on an authentication error from the notification service. I've already tried regenerating the key and checking the environment variables on staging. The error is: 401 invalid credentials. Has anyone seen this before? Any ideas are welcome.",
    phrases: [
      "Hi team! Quick question.",
      "I'm stuck on...",
      "I've already tried...",
      "Has anyone seen this before?",
      "Any ideas are welcome.",
      "No rush, just when you have a minute.",
    ],
    mode: "written",
  },
  {
    id: "slack-announcing-deploy",
    kind: "slack",
    title: "Announcing a deploy",
    situationEs: "Vas a hacer un deploy a producción y quieres avisar al equipo en Slack: qué se publica, cuándo y si puede haber impacto.",
    template: "Heads up: I'm deploying {what} to production {when}. {expected impact}. I'll post an update when it's done. Let me know if {condition}.",
    example:
      "Heads up: I'm deploying the new login with 2FA to production in about 15 minutes. There's a short database migration, so logins might be slow for a minute or two. I'll post an update when it's done. Let me know if you see anything strange after the deploy.",
    phrases: [
      "Heads up: I'm deploying...",
      "There shouldn't be any downtime.",
      "Users might notice...",
      "I'll post an update when it's done.",
      "The deploy is done and everything looks good.",
      "Let me know if you see anything strange.",
    ],
    mode: "written",
  },
  {
    id: "slack-going-offline",
    kind: "slack",
    title: "Saying you'll be offline",
    situationEs: "Tienes una cita y vas a estar desconectado unas horas. Avisa al equipo, di cuándo vuelves y quién puede ayudar si hay algo urgente.",
    template: "Hi everyone, I'll be offline from {start time} to {end time} because {reason}. {status of your work}. If anything urgent comes up, {contact or backup}.",
    example:
      "Hi everyone, I'll be offline from 2 to 4 p.m. today because I have a doctor's appointment. My PR for the reports page is ready for review, so feel free to leave comments. If anything urgent comes up, please reach out to Carlos, or call me on my phone.",
    phrases: [
      "I'll be offline from... to...",
      "I'll be back around...",
      "I'll catch up on messages when I'm back.",
      "If anything urgent comes up,...",
      "Feel free to leave comments.",
    ],
    mode: "written",
  },

  // ------------------------------------------------------------- MEETING
  {
    id: "meeting-ask-to-repeat",
    kind: "meeting",
    title: "Asking someone to repeat or clarify",
    situationEs: "En una videollamada no entendiste lo que dijo alguien (por el audio o porque habló muy rápido). Pide que lo repita o confirma lo que entendiste.",
    template: "Sorry, {reason}. Could you {request}? Just to make sure I understood, {your summary}?",
    example:
      "Sorry, the audio cut out for a second. Could you repeat the last part, about the deadline? Just to make sure I understood, you need the API ready by Thursday so the mobile team can test it on Friday, right?",
    phrases: [
      "Sorry, I didn't catch that.",
      "Could you repeat the last part?",
      "Could you say that a bit more slowly?",
      "Just to make sure I understood,...",
      "So what you mean is..., right?",
    ],
    mode: "spoken",
  },
  {
    id: "meeting-disagree-politely",
    kind: "meeting",
    title: "Disagreeing politely in a meeting",
    situationEs: "En una reunión técnica alguien propone una solución que te parece arriesgada. Expresa tu desacuerdo con respeto y propone una alternativa.",
    template: "I see your point about {their idea}, but I'm a bit worried about {concern}. What if we {alternative}? That way, {benefit}.",
    example:
      "I see your point about moving everything to a new database, but I'm a bit worried about the timeline. We only have three weeks before the launch. What if we move only the reports table first and see how it goes? That way, we reduce the risk and still learn from it.",
    phrases: [
      "I see your point, but...",
      "I'm a bit worried about...",
      "Have we thought about...?",
      "What if we...?",
      "That way,...",
      "I might be wrong, but...",
    ],
    mode: "spoken",
  },

  // --------------------------------------------------------------- EMAIL
  {
    id: "email-follow-up-recruiter",
    kind: "email",
    title: "Following up with a recruiter",
    situationEs: "Tuviste una entrevista hace una semana y no has recibido respuesta. Escribe un correo corto y amable para preguntar por el estado del proceso.",
    template: "Subject: Following up on {position} interview\n\nHi {name},\n\nI hope you're doing well. I wanted to follow up on my interview for the {position} role on {date}. {reason you're excited}. Could you let me know {question}?\n\nThank you for your time.\n\nBest regards,\n{your name}",
    example:
      "Subject: Following up on Full-Stack Developer interview\n\nHi Jessica,\n\nI hope you're doing well. I wanted to follow up on my interview for the Full-Stack Developer role last Tuesday. I really enjoyed talking with the team, and I'm still very interested in the position. Could you let me know if there are any updates on the next steps?\n\nThank you for your time.\n\nBest regards,\nAlex",
    phrases: [
      "I hope you're doing well.",
      "I wanted to follow up on...",
      "I'm still very interested in the position.",
      "Could you let me know if there are any updates?",
      "Thank you for your time.",
      "Best regards,",
    ],
    mode: "written",
  },
  {
    id: "email-request-time-off",
    kind: "email",
    title: "Requesting time off",
    situationEs: "Quieres pedir unos días de vacaciones a tu manager. Indica las fechas, cómo vas a dejar tu trabajo cubierto y pide confirmación.",
    template: "Subject: Time off request: {dates}\n\nHi {manager},\n\nI'd like to request time off from {start date} to {end date}. {plan to cover your work}. Please let me know if these dates work for the team.\n\nThanks,\n{your name}",
    example:
      "Subject: Time off request: Dec 22 to Dec 29\n\nHi Mike,\n\nI'd like to request time off from December 22 to December 29 for the holidays. Before I leave, I'll finish the reports feature and hand over any open tickets to Laura. I'll also update the documentation so the team has everything they need. Please let me know if these dates work for the team.\n\nThanks,\nAlex",
    phrases: [
      "I'd like to request time off from... to...",
      "Before I leave, I'll...",
      "I'll hand over... to...",
      "Please let me know if these dates work.",
      "I'll be back on...",
    ],
    mode: "written",
  },

  // --------------------------------------------------------- CODE REVIEW
  {
    id: "code-review-suggest-change",
    kind: "code-review",
    title: "Suggesting a change kindly",
    situationEs: "Estás revisando el código de un compañero y ves algo que se puede mejorar. Escribe un comentario amable que explique el problema y sugiera una solución.",
    template: "{positive note}. One suggestion: what do you think about {change}? {reason}. {optional: nit or non-blocking note}",
    example:
      "Nice work, this is much easier to read than before. One suggestion: what do you think about using a prepared statement here instead of building the query with string concatenation? The email comes from user input, so this could allow SQL injection. Happy to pair on it if you want.",
    phrases: [
      "Nice work on this!",
      "What do you think about...?",
      "Have you considered...?",
      "Nit: (small, non-blocking detail)",
      "Not a blocker, but...",
      "Happy to pair on it if you want.",
    ],
    mode: "written",
  },
  {
    id: "code-review-approve",
    kind: "code-review",
    title: "Approving a pull request",
    situationEs: "Revisaste un pull request y todo se ve bien. Apruébalo con un comentario corto y positivo, y menciona detalles menores si los hay.",
    template: "LGTM! {what you liked}. {optional small comment}. {approval note}",
    example:
      "LGTM! Thanks for adding tests for the edge cases, that makes me much more confident about this change. I left one small nit about a variable name, but feel free to ignore it. Approving.",
    phrases: [
      "LGTM! (Looks good to me)",
      "Thanks for adding tests for...",
      "Great job on...",
      "Feel free to merge once the tests pass.",
      "Approving.",
    ],
    mode: "written",
  },
];
