import type { InterviewQuestion } from './types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // ---------------------------------------------------------------- INTRO
  {
    id: "intro-where-are-you-from",
    category: "intro",
    level: "A2",
    question: "Where are you from?",
    tipEs: "Responde corto: país, ciudad y un dato extra (zona horaria). La zona horaria es importante en trabajos remotos.",
    keywords: ["from", "live", "city", "time zone"],
    modelAnswer:
      "I'm from Mexico. I live in Guadalajara, and I work from home. My time zone is Central Time, so it's easy for me to work with teams in the US.",
    phrases: ["I'm from...", "I live in...", "My time zone is...", "It's easy for me to..."],
  },
  {
    id: "intro-what-do-you-do",
    category: "intro",
    level: "A2",
    question: "What do you do?",
    tipEs: "Di tu rol y lo principal que haces. Usa 'I'm a...' y 'I work on...'; no digas 'I am working of'.",
    keywords: ["developer", "full-stack", "work on", "web", "backend"],
    modelAnswer:
      "I'm a full-stack developer. I work on web applications and APIs. I use PHP, JavaScript, and SQL every day.",
    phrases: ["I'm a full-stack developer.", "I work on...", "I use... every day."],
  },
  {
    id: "intro-how-long-developer",
    category: "intro",
    level: "A2",
    question: "How long have you been a developer?",
    tipEs: "Usa el present perfect: 'I've been a developer for five years'. No digas 'I am developer since five years'.",
    keywords: ["years", "experience", "since", "started"],
    modelAnswer:
      "I've been a developer for about five years. I started with PHP and SQL, and later I learned JavaScript and React.",
    phrases: ["I've been a developer for...", "I started with...", "Later, I learned..."],
  },
  {
    id: "intro-what-languages",
    category: "intro",
    level: "A2",
    question: "What programming languages do you use?",
    tipEs: "Menciona tus lenguajes principales y para qué los usas. Pronuncia bien 'SQL' (es-kiu-el o 'sequel').",
    keywords: ["php", "javascript", "sql", "typescript", "backend", "frontend"],
    modelAnswer:
      "I mainly use PHP and JavaScript. I use SQL for databases, and TypeScript and React on the frontend. PHP is the language I know best.",
    phrases: ["I mainly use...", "I use... for...", "The language I know best is..."],
  },
  {
    id: "intro-tell-me-about-yourself",
    category: "intro",
    level: "B1",
    question: "Tell me about yourself.",
    tipEs: "Usa presente, pasado y futuro: quién eres hoy, qué has hecho y qué buscas. Habla de trabajo, no de tu vida personal. Máximo un minuto.",
    keywords: ["full-stack", "five years", "php", "javascript", "experience", "looking for", "remote"],
    modelAnswer:
      "I'm a full-stack developer with about five years of experience. Right now I work mostly with PHP, JavaScript, and SQL. In my current company, I built the login system with two-factor authentication, and I also work on the backend for our mobile app. I enjoy solving hard bugs and making apps more stable. Now I'm looking for a remote role where I can grow and work with an international team.",
    phrases: ["I'm a... with... years of experience.", "Right now I work mostly with...", "In my current company, I...", "Now I'm looking for..."],
  },
  {
    id: "intro-describe-current-role",
    category: "intro",
    level: "B1",
    question: "Can you describe your current role?",
    tipEs: "Explica tus responsabilidades principales con verbos de acción: build, maintain, fix, review. Da un ejemplo concreto.",
    keywords: ["responsible", "backend", "api", "maintain", "team", "features"],
    modelAnswer:
      "In my current role, I'm responsible for backend and frontend features. I build and maintain REST APIs in PHP, and I work on the web app with JavaScript. I also support the mobile team, because our app uses my APIs. Every week I review pull requests and help fix bugs in production.",
    phrases: ["In my current role, I'm responsible for...", "I build and maintain...", "I also support...", "Every week I..."],
  },
  {
    id: "intro-why-new-job",
    category: "intro",
    level: "B1",
    question: "Why are you looking for a new job?",
    tipEs: "Habla en positivo: crecimiento, nuevos retos, equipo internacional. Nunca hables mal de tu empresa actual.",
    keywords: ["grow", "challenge", "learn", "international", "remote", "opportunity"],
    modelAnswer:
      "I've learned a lot at my current company, and I'm thankful for that. But I feel ready for a new challenge. I want to work with an international team and improve my skills with bigger products. This role looks like a great opportunity to do that.",
    phrases: ["I've learned a lot at...", "I feel ready for a new challenge.", "I want to improve my skills in...", "This role looks like a great opportunity to..."],
  },
  {
    id: "intro-walk-me-through-career",
    category: "intro",
    level: "B2",
    question: "Can you walk me through your career so far and how it led you to this position?",
    tipEs: "Cuenta tu carrera en orden cronológico y conecta cada etapa con el puesto. Termina explicando por qué este rol es el siguiente paso lógico.",
    keywords: ["started", "junior", "backend", "full-stack", "security", "mobile", "next step"],
    modelAnswer:
      "I started about five years ago as a junior PHP developer, mostly fixing bugs and writing SQL queries. After a year, I started taking on bigger features, and I learned JavaScript and React to work on the frontend too. A big moment for me was when I led the work on our new login system with two-factor authentication, because it taught me a lot about security. Later, I moved into building the backend for our mobile app, where I focused on performance and on fixing crashes. Today I feel comfortable across the whole stack. This position feels like the natural next step, because it combines full-stack work with a strong product team and a remote culture.",
    phrases: ["I started about... years ago as...", "A big moment for me was when...", "It taught me a lot about...", "Today I feel comfortable...", "This position feels like the natural next step because..."],
  },

  // ----------------------------------------------------------- BEHAVIORAL
  {
    id: "behavioral-do-you-like-teamwork",
    category: "behavioral",
    level: "A2",
    question: "Do you like working in a team?",
    tipEs: "Responde que sí y da una razón simple. Una frase de ejemplo hace tu respuesta más creíble.",
    keywords: ["team", "learn", "help", "share", "together"],
    modelAnswer:
      "Yes, I really like it. I learn a lot from my teammates, and I like helping them too. We usually solve problems faster together.",
    phrases: ["Yes, I really like it.", "I learn a lot from...", "We usually... together."],
  },
  {
    id: "behavioral-strengths",
    category: "behavioral",
    level: "A2",
    question: "What are your strengths?",
    tipEs: "Elige dos fortalezas y da un ejemplo corto de cada una. Evita listas largas de adjetivos.",
    keywords: ["problem solving", "debugging", "responsible", "learn fast", "communication"],
    modelAnswer:
      "I'm good at solving problems, especially hard bugs. I'm also very responsible. When I say I'll do something, I do it on time.",
    phrases: ["I'm good at...", "I'm also very...", "When I say I'll do something, I..."],
  },
  {
    id: "behavioral-weakness",
    category: "behavioral",
    level: "B1",
    question: "What is your biggest weakness?",
    tipEs: "Elige una debilidad real pero no crítica, y explica qué estás haciendo para mejorarla. No digas 'soy perfeccionista' sin más.",
    keywords: ["weakness", "improve", "working on", "learned", "now"],
    modelAnswer:
      "Sometimes I try to fix everything by myself, and I wait too long before asking for help. I realized this slows the team down. Now I give myself a time limit, and if I'm still stuck after an hour or two, I ask a teammate. It's helped me a lot.",
    phrases: ["Sometimes I...", "I realized that...", "Now I...", "It's helped me a lot."],
  },
  {
    id: "behavioral-mistake",
    category: "behavioral",
    level: "B1",
    question: "Tell me about a mistake you made at work.",
    tipEs: "Admite el error, explica cómo lo arreglaste y qué aprendiste. Lo importante es la lección, no el error.",
    keywords: ["mistake", "production", "fixed", "learned", "now", "test"],
    modelAnswer:
      "Once I deployed a change to production without testing it on a real phone, and it broke a screen in our mobile app. I told my team right away and rolled back the change. Then I fixed the bug and tested it properly. Since then, I always test on a real device before I deploy.",
    phrases: ["Once I...", "I told my team right away.", "I rolled back the change.", "Since then, I always..."],
  },
  {
    id: "behavioral-learn-quickly",
    category: "behavioral",
    level: "B1",
    question: "Tell me about a time you had to learn something new quickly.",
    tipEs: "Di qué tuviste que aprender, cómo lo aprendiste (docs, cursos, práctica) y el resultado.",
    keywords: ["learn", "quickly", "documentation", "practice", "result", "react"],
    modelAnswer:
      "When my team decided to use React, I had only two weeks to learn it before a new project started. I read the official docs, built a small app on my own, and asked a teammate to review my code. By the time the project started, I was ready to build real features. I ended up being one of the main React developers on that project.",
    phrases: ["I had only... to learn...", "I read the official docs.", "By the time..., I was ready to...", "I ended up..."],
  },
  {
    id: "behavioral-tight-deadline",
    category: "behavioral",
    level: "B1",
    question: "How do you handle tight deadlines?",
    tipEs: "Muestra que priorizas y comunicas. Menciona que avisas temprano si hay riesgo de no llegar.",
    keywords: ["prioritize", "communicate", "deadline", "scope", "focus", "early"],
    modelAnswer:
      "First, I break the work into small tasks and decide what's really important. I focus on the most important part first. If I see that we might miss the deadline, I tell my manager early, so we can change the scope together. I don't like surprises at the last minute.",
    phrases: ["First, I break the work into...", "I focus on... first.", "I tell my manager early.", "I don't like surprises at the last minute."],
  },
  {
    id: "behavioral-difficult-bug",
    category: "behavioral",
    level: "B2",
    question: "Tell me about the most difficult bug you've fixed.",
    tipEs: "Usa la estructura STAR: situación, tarea, acción, resultado. Explica cómo investigaste paso a paso y da un resultado con números si puedes.",
    keywords: ["crash", "logs", "reproduce", "root cause", "fixed", "result", "mobile"],
    modelAnswer:
      "Last year, our mobile app started crashing for some users, but we couldn't reproduce it on our devices. I was responsible for finding the cause on the backend side. First, I checked the crash reports and the API logs, and I noticed that all the crashes happened after a specific API call. It turned out that the API sometimes returned a null value when a user had an old account, and the app didn't expect it. I fixed the API response, added a test for that case, and worked with the mobile team to handle null values safely. As a result, the crash rate dropped by more than eighty percent in one week.",
    phrases: ["I was responsible for...", "First, I checked...", "I noticed that...", "It turned out that...", "As a result,..."],
  },
  {
    id: "behavioral-conflict-coworker",
    category: "behavioral",
    level: "B2",
    question: "Tell me about a time you had a conflict with a coworker. How did you handle it?",
    tipEs: "Usa STAR y muestra madurez: escuchaste, buscaste datos y llegaron a un acuerdo. No culpes a la otra persona.",
    keywords: ["disagree", "listen", "talk", "data", "agreement", "respect", "result"],
    modelAnswer:
      "A coworker and I disagreed about how to structure a new API. He wanted one big endpoint, and I wanted several smaller ones. Instead of arguing in the pull request, I asked him for a quick call. I listened to his reasons first, and then I explained mine with a few examples of how the mobile app would use the API. We realized we both had good points, so we agreed on a mix of both ideas. In the end, the API was easier to use, and we actually started working together more often after that.",
    phrases: ["We disagreed about...", "Instead of..., I asked for a quick call.", "I listened to his reasons first.", "We agreed on...", "In the end,..."],
  },
  {
    id: "behavioral-project-proud-of",
    category: "behavioral",
    level: "B2",
    question: "What project are you most proud of, and why?",
    tipEs: "Elige un proyecto con impacto claro. Explica tu papel exacto (usa 'I', no solo 'we') y el resultado medible.",
    keywords: ["login", "two-factor", "security", "led", "users", "result", "proud"],
    modelAnswer:
      "I'm most proud of the new login system I built at my current company. Our old login was slow and didn't support two-factor authentication, and we had some security concerns. I was responsible for the design and most of the backend work. I added two-factor authentication with authenticator apps, improved how we stored passwords, and added rate limiting to stop brute-force attacks. I also worked closely with the frontend and mobile teams so the experience was simple for users. As a result, suspicious login attempts dropped a lot, and we didn't have any account takeover issues after the launch.",
    phrases: ["I'm most proud of...", "I was responsible for...", "I worked closely with...", "As a result,..."],
  },
  {
    id: "behavioral-disagree-manager",
    category: "behavioral",
    level: "B2",
    question: "Tell me about a time you disagreed with your manager.",
    tipEs: "Muestra que puedes dar tu opinión con respeto y con datos, pero que aceptas la decisión final si no te dan la razon.",
    keywords: ["disagree", "respect", "data", "explain", "decision", "compromise"],
    modelAnswer:
      "My manager once wanted to release a big feature on a Friday afternoon to meet a deadline. I was worried because the feature changed the payment flow, and nobody would be online over the weekend if something broke. I asked for a few minutes to talk and showed him the risks, plus a plan to release on Monday morning instead. I also offered to finish the last tests on Friday so we wouldn't lose time. He agreed, and we released on Monday. We found one small bug in the first hour and fixed it quickly, so he was glad we waited.",
    phrases: ["I was worried because...", "I asked for a few minutes to talk.", "I showed him the risks.", "I offered to...", "He agreed, and..."],
  },
  {
    id: "behavioral-improved-process",
    category: "behavioral",
    level: "B2",
    question: "Give me an example of a time you improved a process on your team.",
    tipEs: "Usa STAR. Explica el problema del proceso, qué propusiste y cómo mediste la mejora.",
    keywords: ["process", "automated", "proposed", "team", "time", "result", "ci"],
    modelAnswer:
      "On my team, deployments were done by hand, and they took almost an hour every time. Sometimes people forgot a step, and that caused bugs in production. I proposed setting up a simple CI pipeline that ran our tests and deployed automatically. I built a first version in my free time during a quiet week and showed it to the team. After we started using it, deployments took about ten minutes, and we stopped having errors from missed steps. Now the team deploys several times a week instead of once.",
    phrases: ["Deployments were done by hand.", "I proposed...", "I built a first version...", "After we started using it,...", "Now the team..."],
  },
  {
    id: "behavioral-production-incident",
    category: "behavioral",
    level: "B2",
    question: "Describe a time when something went wrong in production. What did you do?",
    tipEs: "Muestra calma: primero restaurar el servicio, luego investigar la causa, y al final prevenir que vuelva a pasar.",
    keywords: ["production", "incident", "rollback", "communicate", "root cause", "prevent", "monitoring"],
    modelAnswer:
      "One morning, users started reporting that they couldn't log in. I was on call that week, so I took the lead. First, I let the team know in Slack that I was looking into it, and I rolled back the last deploy, which fixed the problem in a few minutes. Then I looked for the root cause and found a database migration that had locked the users table. I wrote a short report for the team and added a check to our deploy process for long-running migrations. We also added an alert, so now we find out about login errors before users do.",
    phrases: ["I was on call that week, so I took the lead.", "First, I let the team know...", "Then I looked for the root cause.", "I wrote a short report...", "Now we find out... before users do."],
  },

  // ------------------------------------------------------------ TECHNICAL
  {
    id: "technical-favorite-language",
    category: "technical",
    level: "A2",
    question: "What's your favorite programming language?",
    tipEs: "Di cuál es y da una o dos razones simples. Usa 'because'.",
    keywords: ["favorite", "because", "javascript", "typescript", "php"],
    modelAnswer:
      "My favorite language is TypeScript. I like it because it finds many errors before I run the code. It also makes big projects easier to read.",
    phrases: ["My favorite language is...", "I like it because...", "It also makes..."],
  },
  {
    id: "technical-daily-tools",
    category: "technical",
    level: "A2",
    question: "What tools do you use every day?",
    tipEs: "Menciona editor, control de versiones, base de datos y comunicación. Respuestas cortas y claras.",
    keywords: ["vs code", "git", "github", "mysql", "postman", "slack"],
    modelAnswer:
      "I use VS Code to write code and Git and GitHub for version control. I use MySQL for the database and Postman to test APIs. For communication, I use Slack.",
    phrases: ["I use... to...", "For version control, I use...", "For communication, I use..."],
  },
  {
    id: "technical-do-you-use-git",
    category: "technical",
    level: "A2",
    question: "Do you use Git?",
    tipEs: "Responde que sí y menciona algo concreto: ramas, pull requests. Pronuncia 'Git' con G fuerte, como 'guit'.",
    keywords: ["git", "branches", "pull requests", "every day", "commit"],
    modelAnswer:
      "Yes, I use Git every day. I create a branch for each feature, and I open a pull request when it's ready. My teammates review it before we merge.",
    phrases: ["Yes, I use... every day.", "I create a branch for...", "I open a pull request when..."],
  },
  {
    id: "technical-what-is-rest-api",
    category: "technical",
    level: "B1",
    question: "Can you explain what a REST API is?",
    tipEs: "Explica como si fuera para alguien junior: recursos, métodos HTTP, JSON y códigos de estado. Da un ejemplo.",
    keywords: ["http", "resources", "get", "post", "json", "status codes", "endpoint"],
    modelAnswer:
      "A REST API is a way for two systems to talk over HTTP. You work with resources, like users or orders, and each one has a URL. You use HTTP methods to say what you want to do: GET to read, POST to create, PUT or PATCH to update, and DELETE to remove. The data is usually sent as JSON, and the server returns status codes like 200 or 404 to show what happened.",
    phrases: ["It's a way for... to...", "For example,...", "You use... to...", "It usually returns..."],
  },
  {
    id: "technical-let-const-var",
    category: "technical",
    level: "B1",
    question: "What's the difference between var, let, and const in JavaScript?",
    tipEs: "Habla de scope y reasignación. Termina diciendo cuál usas tú normalmente y por qué.",
    keywords: ["scope", "block", "function", "reassign", "hoisting", "const"],
    modelAnswer:
      "The main difference is scope. Var is function-scoped, while let and const are block-scoped, so they only exist inside the curly braces where you declare them. You can reassign let, but you can't reassign const. Var also has some confusing hoisting behavior. In my code, I use const by default and let only when I need to change the value. I never use var.",
    phrases: ["The main difference is...", "..., while...", "I use... by default.", "I only use... when..."],
  },
  {
    id: "technical-how-do-you-test",
    category: "technical",
    level: "B1",
    question: "How do you test your code?",
    tipEs: "Menciona tipos de pruebas (unitarias, integración, manuales) y herramientas. Sé honesto si no tienes 100% de cobertura.",
    keywords: ["unit tests", "integration tests", "phpunit", "jest", "manual", "edge cases"],
    modelAnswer:
      "I write unit tests for important logic, using PHPUnit for PHP and Jest for JavaScript. For APIs, I add integration tests that call the real endpoints with a test database. I also test edge cases, like empty values or very large inputs. Before I open a pull request, I always test the feature manually too.",
    phrases: ["I write unit tests for...", "For..., I add...", "I also test edge cases, like...", "Before I open a pull request, I always..."],
  },
  {
    id: "technical-debugging-approach",
    category: "technical",
    level: "B1",
    question: "How do you approach debugging a problem you've never seen before?",
    tipEs: "Muestra un método: reproducir, revisar logs, aislar la causa, arreglar y agregar una prueba.",
    keywords: ["reproduce", "logs", "isolate", "breakpoints", "root cause", "test"],
    modelAnswer:
      "First, I try to reproduce the problem, because it's hard to fix something you can't see. Then I check the logs and error messages to find where it fails. I try to make the problem smaller, step by step, using breakpoints or simple logs. When I find the root cause, I fix it and add a test so the bug doesn't come back.",
    phrases: ["First, I try to reproduce...", "Then I check...", "Step by step,...", "I add a test so the bug doesn't come back."],
  },
  {
    id: "technical-prevent-sql-injection",
    category: "technical",
    level: "B1",
    question: "How do you prevent SQL injection?",
    tipEs: "La respuesta clave es 'prepared statements' o consultas parametrizadas. Menciona también validar la entrada.",
    keywords: ["prepared statements", "parameters", "pdo", "validate", "input", "orm"],
    modelAnswer:
      "The most important thing is to never put user input directly into a SQL query. I always use prepared statements with parameters. In PHP, I use PDO or the query builder from the framework. I also validate the input, and I give the database user only the permissions it really needs.",
    phrases: ["The most important thing is to...", "I always use...", "In PHP, I use...", "I also..."],
  },
  {
    id: "technical-slow-sql-query",
    category: "technical",
    level: "B2",
    question: "A SQL query in production is very slow. How would you investigate and fix it?",
    tipEs: "Explica un proceso ordenado: medir, usar EXPLAIN, revisar índices, reescribir la consulta y volver a medir. Si tienes un ejemplo real, úsalo.",
    keywords: ["explain", "index", "slow query log", "joins", "measure", "cache", "n+1"],
    modelAnswer:
      "First, I'd measure the problem. I'd check the slow query log or our monitoring tool to see how long the query takes and how often it runs. Then I'd run EXPLAIN to see how the database executes it, for example, if it's doing a full table scan. Most of the time, the fix is adding the right index, usually on the columns used in the WHERE clause or in joins. If that's not enough, I'd look at rewriting the query, selecting only the columns we need, or fixing an N plus one problem in the code. In one case, adding a composite index took a report query from twelve seconds to under half a second. After any change, I measure again to make sure it really improved.",
    phrases: ["First, I'd measure the problem.", "Then I'd run... to see...", "Most of the time, the fix is...", "If that's not enough, I'd...", "After any change, I measure again."],
  },
  {
    id: "technical-secure-login",
    category: "technical",
    level: "B2",
    question: "How would you design a secure login system?",
    tipEs: "Cubre los puntos clave: hashing de contraseñas, HTTPS, 2FA, rate limiting y manejo de sesiones. Conéctalo con tu experiencia real.",
    keywords: ["hashing", "bcrypt", "https", "two-factor", "rate limiting", "sessions", "tokens"],
    modelAnswer:
      "I actually built one at my current company, so I'd start from that experience. Passwords should never be stored in plain text, so I'd hash them with a slow algorithm like bcrypt or Argon2. Everything must go over HTTPS, and session cookies should be HttpOnly and Secure. I'd add rate limiting and temporary lockouts to stop brute-force attacks. I'd also offer two-factor authentication, ideally with an authenticator app instead of SMS. Finally, I'd log login attempts and alert on unusual activity, like many failed logins from the same IP.",
    phrases: ["I actually built one at...", "Passwords should never be...", "I'd add... to stop...", "I'd also offer...", "Finally, I'd..."],
  },
  {
    id: "technical-slow-web-page",
    category: "technical",
    level: "B2",
    question: "A page in our React app loads slowly. What would you check?",
    tipEs: "Separa frontend y backend. Menciona herramientas concretas (DevTools, Lighthouse, React Profiler) y soluciones concretas.",
    keywords: ["devtools", "network", "bundle size", "lazy loading", "re-renders", "api", "cache"],
    modelAnswer:
      "First, I'd find out where the time goes, using the browser DevTools and Lighthouse. If the network tab shows slow API calls, the problem is probably in the backend, so I'd check the queries and maybe add caching. If the JavaScript bundle is too big, I'd use code splitting and lazy loading so the page only loads what it needs. I'd also look at images, because big images are a very common cause. If the page is slow after it loads, I'd use the React Profiler to find unnecessary re-renders and fix them with memoization or better state structure. I'd measure before and after each change, so I know what actually helped.",
    phrases: ["First, I'd find out where the time goes.", "If..., the problem is probably...", "I'd also look at...", "I'd measure before and after each change."],
  },
  {
    id: "technical-mobile-backend-api",
    category: "technical",
    level: "B2",
    question: "What do you keep in mind when you build an API for a mobile app?",
    tipEs: "Piensa en lo específico de móvil: versiones viejas de la app, redes lentas, tamaño de respuesta y errores claros. Da un ejemplo de tu experiencia.",
    keywords: ["versioning", "backward compatible", "slow network", "payload", "pagination", "errors", "null"],
    modelAnswer:
      "The biggest difference is that you can't force users to update the app, so old versions will call your API for a long time. Because of that, I keep the API backward compatible and use versioning when I need breaking changes. I also think about slow and unstable networks, so I keep responses small and use pagination. Error responses need to be clear and consistent, so the app can show a useful message. From my experience fixing crashes, I'm also very careful with null values and missing fields, because one unexpected null can crash the app. Finally, I add monitoring to see errors by app version.",
    phrases: ["The biggest difference is that...", "Because of that, I...", "I also think about...", "From my experience,...", "Finally, I add..."],
  },

  // --------------------------------------------------------------- REMOTE
  {
    id: "remote-worked-remotely-before",
    category: "remote",
    level: "A2",
    question: "Have you worked remotely before?",
    tipEs: "Di cuánto tiempo y con qué herramientas. Si no tienes experiencia, menciona trabajo remoto parcial o proyectos con personas en otras ciudades.",
    keywords: ["remote", "years", "from home", "slack", "video calls"],
    modelAnswer:
      "Yes, I have. I've worked remotely for about three years. My team uses Slack and video calls every day.",
    phrases: ["Yes, I have.", "I've worked remotely for...", "My team uses..."],
  },
  {
    id: "remote-organize-day",
    category: "remote",
    level: "A2",
    question: "How do you organize your workday?",
    tipEs: "Describe una rutina simple con horarios. Muestra que eres disciplinado.",
    keywords: ["schedule", "start", "standup", "focus", "tasks", "break"],
    modelAnswer:
      "I start at nine every day. First, I check messages and go to the daily standup. Then I focus on my main task, and I take a short break after lunch.",
    phrases: ["I start at... every day.", "First, I...", "Then I focus on..."],
  },
  {
    id: "remote-time-zones",
    category: "remote",
    level: "B1",
    question: "How do you communicate with a team in different time zones?",
    tipEs: "Habla de comunicación asíncrona: mensajes claros, documentación y horas de solapamiento.",
    keywords: ["async", "overlap", "clear messages", "documentation", "time zones", "updates"],
    modelAnswer:
      "I try to write clear messages that people can understand without a call, with all the context and links they need. I use the hours when we're all online for meetings and quick questions. At the end of my day, I post a short update, so my teammates know where I am when they start. I also document decisions, so nobody has to wait for me to answer.",
    phrases: ["I try to write clear messages...", "I use the overlap hours for...", "At the end of my day, I post...", "I also document..."],
  },
  {
    id: "remote-why-remote",
    category: "remote",
    level: "B1",
    question: "Why do you want to work remotely?",
    tipEs: "Enfócate en productividad y en el equipo, no solo en comodidad. Evita respuestas como 'para no salir de casa'.",
    keywords: ["focus", "productive", "international", "team", "experience", "communication"],
    modelAnswer:
      "I've worked remotely for a few years, and I've found that I'm more productive at home because I can focus for long periods. I also like working with people from different countries, because I learn new ways of doing things. And I've built good habits for remote work, like clear communication and good documentation.",
    phrases: ["I've found that I'm more productive...", "I also like working with...", "I've built good habits, like..."],
  },
  {
    id: "remote-blocked-no-one-online",
    category: "remote",
    level: "B2",
    question: "What do you do when you're blocked and nobody on your team is online to help?",
    tipEs: "Muestra autonomía: intentas resolverlo solo, dejas una pregunta clara para después y mientras tanto avanzas en otra tarea.",
    keywords: ["blocked", "research", "documentation", "async", "question", "another task", "autonomy"],
    modelAnswer:
      "First, I try to unblock myself. I search the codebase, read the docs, and check old tickets or Slack threads, because often someone had the same problem before. If I'm still stuck, I write a clear question in the team channel with what I tried, what I expected, and any error messages, so someone can answer quickly when they come online. While I wait, I don't just stop working. I switch to another task, or I work on a part of the same task that doesn't depend on the answer. If it's really urgent and it affects production, I follow our on-call process and contact the person on call.",
    phrases: ["First, I try to unblock myself.", "I write a clear question with what I tried...", "While I wait, I...", "If it's really urgent, I..."],
  },

  // -------------------------------------------------------------- CLOSING
  {
    id: "closing-availability",
    category: "closing",
    level: "A2",
    question: "When can you start?",
    tipEs: "Da una fecha clara. Si necesitas dar aviso a tu empresa actual, dilo: muestra profesionalismo.",
    keywords: ["notice", "weeks", "start", "available"],
    modelAnswer:
      "I need to give two weeks' notice at my current job. So I can start about two weeks after I accept the offer.",
    phrases: ["I need to give... notice.", "I can start...", "I'm available from..."],
  },
  {
    id: "closing-salary-expectations",
    category: "closing",
    level: "B1",
    question: "What are your salary expectations?",
    tipEs: "Investiga antes y da un rango, no un número exacto. Di si es en dólares, anual o mensual, y muestra flexibilidad.",
    keywords: ["range", "per year", "usd", "flexible", "benefits", "market"],
    modelAnswer:
      "Based on my experience and what I've seen in the market for similar roles, I'm looking for something between fifty and sixty thousand US dollars per year. But I'm flexible, and I'd like to understand the full package, including benefits. The most important thing for me is that the role is a good fit.",
    phrases: ["Based on my experience and the market,...", "I'm looking for something between... and...", "I'm flexible.", "I'd like to understand the full package."],
  },
  {
    id: "closing-questions-for-us",
    category: "closing",
    level: "B1",
    question: "Do you have any questions for us?",
    tipEs: "Siempre ten 2-3 preguntas preparadas. Nunca digas 'No, gracias'. Pregunta sobre el equipo, el proceso o los retos.",
    keywords: ["team", "challenges", "first months", "process", "success"],
    modelAnswer:
      "Yes, thank you. I'd like to know more about the team. How many developers are there, and how do you usually work together? Also, what would success look like for this role in the first three months?",
    phrases: ["Yes, thank you. I'd like to know more about...", "How do you usually...?", "What would success look like for this role?", "What are the biggest challenges right now?"],
  },
];
