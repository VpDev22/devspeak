import type { LadderStep } from './types';

export const LADDER_STEPS: LadderStep[] = [
  {
    id: "articles-profession",
    order: 1,
    title: "I am a developer",
    explanationEs:
      "En inglés, cuando dices tu profesión necesitas el artículo \"a\" o \"an\". En español decimos \"soy desarrollador\", pero en inglés es \"I am a developer\". Usa \"an\" cuando la palabra siguiente empieza con sonido de vocal: \"an engineer\".",
    pattern: "I am a/an + profession",
    commonMistake: {
      wrong: "I am developer.",
      right: "I am a developer.",
      whyEs: "Con profesiones siempre va \"a\" o \"an\" antes del sustantivo.",
    },
    exercises: [
      {
        promptEs: "Di que eres desarrollador.",
        target: "I am a developer.",
        alternatives: ["I'm a developer."],
      },
      {
        promptEs: "Di que eres desarrollador full-stack.",
        target: "I'm a full-stack developer.",
        alternatives: ["I am a full-stack developer."],
      },
      {
        promptEs: "Di que eres ingeniero de software.",
        target: "I'm a software engineer.",
        alternatives: ["I am a software engineer."],
      },
      {
        promptEs: "Di que tu hermana es ingeniera (usa \"an\").",
        target: "My sister is an engineer.",
        alternatives: ["My sister's an engineer."],
      },
      {
        promptEs: "Di que trabajas como desarrollador backend.",
        target: "I work as a backend developer.",
        alternatives: ["I'm working as a backend developer."],
      },
      {
        promptEs: "Di que tu jefe es un arquitecto de software con experiencia.",
        target: "My boss is an experienced software architect.",
        alternatives: ["My manager is an experienced software architect."],
      },
    ],
  },
  {
    id: "subject-never-omitted",
    order: 2,
    title: "Always use a subject",
    explanationEs:
      "En español podemos omitir el sujeto (\"Es muy fácil\"), pero en inglés casi nunca. Usa \"it\" para cosas y situaciones, y \"there is / there are\" para decir que algo existe. Así suenas mucho más natural.",
    pattern: "It is + adjective / There is + noun",
    commonMistake: {
      wrong: "Is very easy.",
      right: "It's very easy.",
      whyEs: "El verbo \"is\" necesita un sujeto; para cosas o situaciones usa \"it\".",
    },
    exercises: [
      {
        promptEs: "Di que es muy fácil.",
        target: "It's very easy.",
        alternatives: ["It is very easy."],
      },
      {
        promptEs: "Di que te gusta programar porque es adictivo.",
        target: "I like coding because it's addictive.",
        alternatives: ["I like coding because it is addictive.", "I like programming because it's addictive."],
      },
      {
        promptEs: "Di que hay un bug en el login.",
        target: "There's a bug in the login.",
        alternatives: ["There is a bug in the login.", "There's a bug in the login page."],
      },
      {
        promptEs: "Di que hay tres tests fallando.",
        target: "There are three failing tests.",
        alternatives: ["Three tests are failing.", "There are three tests failing."],
      },
      {
        promptEs: "Di que está lloviendo hoy.",
        target: "It's raining today.",
        alternatives: ["It is raining today."],
      },
      {
        promptEs: "Di que es importante escribir tests.",
        target: "It's important to write tests.",
        alternatives: ["It is important to write tests."],
      },
    ],
  },
  {
    id: "like-ing",
    order: 3,
    title: "I like + -ing",
    explanationEs:
      "Después de \"like\", \"love\", \"enjoy\" y \"hate\" usamos el verbo con -ing para hablar de actividades. En español decimos \"me gusta jugar\", pero en inglés es \"I like playing\". Con \"enjoy\" el -ing es obligatorio.",
    pattern: "I like + verb-ing",
    commonMistake: {
      wrong: "I like play video games.",
      right: "I like playing video games.",
      whyEs: "Después de \"like\" no va el verbo solo; usa la forma -ing (o \"to play\").",
    },
    exercises: [
      {
        promptEs: "Di que te gusta jugar videojuegos.",
        target: "I like playing video games.",
        alternatives: ["I like to play video games.", "I love playing video games."],
      },
      {
        promptEs: "Di que disfrutas resolver problemas.",
        target: "I enjoy solving problems.",
        alternatives: ["I really enjoy solving problems."],
      },
      {
        promptEs: "Di que te encanta aprender nuevas tecnologías.",
        target: "I love learning new technologies.",
        alternatives: ["I love to learn new technologies."],
      },
      {
        promptEs: "Di que odias escribir documentación.",
        target: "I hate writing documentation.",
        alternatives: ["I hate to write documentation."],
      },
      {
        promptEs: "Di que a tu equipo le gusta trabajar de forma remota.",
        target: "My team likes working remotely.",
        alternatives: ["My team likes to work remotely."],
      },
      {
        promptEs: "Di que no te gusta hacer reuniones largas.",
        target: "I don't like having long meetings.",
        alternatives: ["I don't like long meetings.", "I do not like having long meetings."],
      },
    ],
  },
  {
    id: "to-purpose",
    order: 4,
    title: "To + verb for purpose",
    explanationEs:
      "Para decir \"para + verbo\" (el propósito) usamos \"to + verbo\", no \"for + verbo\". \"For\" va con sustantivos: \"for testing\", \"for my project\". Ejemplo: \"I use Claude to learn English\".",
    pattern: "I use X to + verb / for + noun",
    commonMistake: {
      wrong: "I use Claude for learn English.",
      right: "I use Claude to learn English.",
      whyEs: "Para expresar propósito con un verbo se usa \"to\", no \"for\".",
    },
    exercises: [
      {
        promptEs: "Di que usas Claude para aprender inglés.",
        target: "I use Claude to learn English.",
        alternatives: ["I'm using Claude to learn English."],
      },
      {
        promptEs: "Di que usas Docker para desplegar tus apps.",
        target: "I use Docker to deploy my apps.",
        alternatives: ["I use Docker to deploy my applications."],
      },
      {
        promptEs: "Di que escribiste un script para automatizar los tests.",
        target: "I wrote a script to automate the tests.",
        alternatives: ["I wrote a script to automate testing."],
      },
      {
        promptEs: "Di que usas Postman para pruebas de API (usa \"for\" + sustantivo).",
        target: "I use Postman for API testing.",
        alternatives: ["I use Postman to test APIs."],
      },
      {
        promptEs: "Di que estudias inglés para conseguir un trabajo remoto.",
        target: "I study English to get a remote job.",
        alternatives: ["I'm studying English to get a remote job."],
      },
      {
        promptEs: "Di que agregamos un caché para mejorar el rendimiento.",
        target: "We added a cache to improve performance.",
        alternatives: ["We added a cache to improve the performance."],
      },
    ],
  },
  {
    id: "third-person-s",
    order: 5,
    title: "He works, it generates",
    explanationEs:
      "En presente simple, con he, she e it el verbo lleva -s al final: \"he works\", \"it generates\". Es un detalle pequeño, pero los entrevistadores lo notan mucho. Recuerda que una app, un servicio o una función también son \"it\".",
    pattern: "He / She / It + verb-s",
    commonMistake: {
      wrong: "The app generate a code.",
      right: "The app generates a code.",
      whyEs: "\"The app\" es \"it\", así que el verbo necesita -s.",
    },
    exercises: [
      {
        promptEs: "Di que la app genera un código.",
        target: "The app generates a code.",
        alternatives: ["The app generates a verification code."],
      },
      {
        promptEs: "Di que tu compañero trabaja desde casa.",
        target: "My coworker works from home.",
        alternatives: ["My teammate works from home.", "My colleague works from home."],
      },
      {
        promptEs: "Di que la función devuelve una lista.",
        target: "The function returns a list.",
        alternatives: ["This function returns a list."],
      },
      {
        promptEs: "Di que ella revisa los pull requests todos los días.",
        target: "She reviews the pull requests every day.",
        alternatives: ["She reviews pull requests every day."],
      },
      {
        promptEs: "Di que el servidor no responde.",
        target: "The server doesn't respond.",
        alternatives: ["The server does not respond.", "The server isn't responding."],
      },
      {
        promptEs: "Di que el pipeline corre los tests automáticamente.",
        target: "The pipeline runs the tests automatically.",
        alternatives: ["The pipeline runs tests automatically."],
      },
    ],
  },
  {
    id: "past-regular",
    order: 6,
    title: "Past simple: -ed",
    explanationEs:
      "Para hablar del pasado, los verbos regulares terminan en -ed: \"work → worked\", \"fix → fixed\". En español cambiamos el verbo (\"arreglo → arreglé\"), y en inglés también hay que cambiarlo. Si dices \"yesterday\", el verbo debe estar en pasado.",
    pattern: "Subject + verb-ed",
    commonMistake: {
      wrong: "Yesterday I fix the bug.",
      right: "Yesterday I fixed the bug.",
      whyEs: "\"Yesterday\" indica pasado, así que el verbo necesita -ed.",
    },
    exercises: [
      {
        promptEs: "Di que ayer arreglaste el bug.",
        target: "Yesterday I fixed the bug.",
        alternatives: ["I fixed the bug yesterday."],
      },
      {
        promptEs: "Di que desplegaste la nueva versión el viernes.",
        target: "I deployed the new version on Friday.",
        alternatives: ["On Friday I deployed the new version."],
      },
      {
        promptEs: "Di que trabajaste en una fintech por tres años.",
        target: "I worked at a fintech company for three years.",
        alternatives: ["I worked for a fintech company for three years.", "I worked at a fintech for three years."],
      },
      {
        promptEs: "Di que el equipo mejoró el rendimiento.",
        target: "The team improved the performance.",
        alternatives: ["The team improved performance."],
      },
      {
        promptEs: "Di que la semana pasada migraste la base de datos.",
        target: "Last week I migrated the database.",
        alternatives: ["I migrated the database last week."],
      },
      {
        promptEs: "Di que no probaste ese caso.",
        target: "I didn't test that case.",
        alternatives: ["I did not test that case."],
      },
    ],
  },
  {
    id: "past-irregular",
    order: 7,
    title: "Past simple: irregular verbs",
    explanationEs:
      "Muchos verbos comunes son irregulares y no usan -ed: \"make → made\", \"build → built\", \"write → wrote\", \"send → sent\", \"go → went\", \"do → did\". Hay que memorizarlos, pero son pocos y los usarás todo el tiempo en entrevistas.",
    pattern: "Subject + irregular past (made, built, wrote...)",
    commonMistake: {
      wrong: "I maked a feature.",
      right: "I made a feature.",
      whyEs: "\"Make\" es irregular: su pasado es \"made\", no \"maked\".",
    },
    exercises: [
      {
        promptEs: "Di que construiste una API con Node.js.",
        target: "I built an API with Node.js.",
        alternatives: ["I built an API using Node.js."],
      },
      {
        promptEs: "Di que escribiste los tests unitarios.",
        target: "I wrote the unit tests.",
        alternatives: ["I wrote unit tests."],
      },
      {
        promptEs: "Di que le enviaste el reporte a tu jefe.",
        target: "I sent the report to my boss.",
        alternatives: ["I sent my boss the report.", "I sent the report to my manager."],
      },
      {
        promptEs: "Di que hiciste un cambio en el código (usa \"make\").",
        target: "I made a change in the code.",
        alternatives: ["I made a change to the code."],
      },
      {
        promptEs: "Di que fuiste a una conferencia de tecnología.",
        target: "I went to a tech conference.",
        alternatives: ["I went to a technology conference."],
      },
      {
        promptEs: "Di que hiciste el code review ayer (usa \"do\").",
        target: "I did the code review yesterday.",
        alternatives: ["Yesterday I did the code review."],
      },
    ],
  },
  {
    id: "word-order-adverbs",
    order: 8,
    title: "Where \"a lot\" goes",
    explanationEs:
      "En inglés el verbo y su objeto van juntos. Expresiones como \"a lot\" o \"every day\" van al final, después del objeto. \"Really\" va antes del verbo principal: \"I really like it\".",
    pattern: "Verb + object + a lot / every day",
    commonMistake: {
      wrong: "I played a lot Brawl Stars.",
      right: "I played Brawl Stars a lot.",
      whyEs: "No separes el verbo de su objeto; \"a lot\" va al final.",
    },
    exercises: [
      {
        promptEs: "Di que jugaste mucho Brawl Stars.",
        target: "I played Brawl Stars a lot.",
        alternatives: ["I used to play Brawl Stars a lot."],
      },
      {
        promptEs: "Di que usas TypeScript todos los días.",
        target: "I use TypeScript every day.",
        alternatives: ["I use TypeScript daily."],
      },
      {
        promptEs: "Di que de verdad te gusta tu trabajo.",
        target: "I really like my job.",
        alternatives: ["I really enjoy my job."],
      },
      {
        promptEs: "Di que lees mucha documentación.",
        target: "I read a lot of documentation.",
        alternatives: ["I read lots of documentation."],
      },
      {
        promptEs: "Di que hablas inglés con tu equipo todos los días.",
        target: "I speak English with my team every day.",
        alternatives: ["Every day I speak English with my team."],
      },
      {
        promptEs: "Di que esa librería te ayudó mucho.",
        target: "That library helped me a lot.",
        alternatives: ["That library really helped me."],
      },
    ],
  },
  {
    id: "adjective-adverb",
    order: 9,
    title: "Random vs randomly",
    explanationEs:
      "Los adjetivos describen cosas (\"a random error\") y van después de \"be\": \"It was random\". Los adverbios terminan casi siempre en -ly y describen cómo se hace una acción: \"It failed randomly\". Pregúntate: ¿describo una cosa o una acción?",
    pattern: "be + adjective / verb + adverb (-ly)",
    commonMistake: {
      wrong: "It was randomly.",
      right: "It was random.",
      whyEs: "Después de \"was\" va un adjetivo; el adverbio describe un verbo: \"It happened randomly\".",
    },
    exercises: [
      {
        promptEs: "Di que el error era aleatorio.",
        target: "The error was random.",
        alternatives: ["The bug was random."],
      },
      {
        promptEs: "Di que la app se caía aleatoriamente.",
        target: "The app crashed randomly.",
        alternatives: ["The app was crashing randomly."],
      },
      {
        promptEs: "Di que arreglaste el bug rápidamente.",
        target: "I fixed the bug quickly.",
        alternatives: ["I quickly fixed the bug."],
      },
      {
        promptEs: "Di que fue un arreglo rápido.",
        target: "It was a quick fix.",
        alternatives: ["It was a quick solution."],
      },
      {
        promptEs: "Di que la página carga lento.",
        target: "The page loads slowly.",
        alternatives: ["The page is loading slowly.", "The page is slow to load."],
      },
      {
        promptEs: "Di que el código es limpio y funciona bien.",
        target: "The code is clean and works well.",
        alternatives: ["The code is clean and it works well."],
      },
    ],
  },
  {
    id: "connectors",
    order: 10,
    title: "Because, so, but, and",
    explanationEs:
      "Une ideas cortas con conectores en lugar de poner muchas frases seguidas sin conexión. \"Because\" da la causa, \"so\" da el resultado, \"but\" contrasta y \"and\" suma. Así tus respuestas suenan más claras y organizadas.",
    pattern: "Idea 1 + because / so / but / and + Idea 2",
    commonMistake: {
      wrong: "The tests failed, I checked the logs, the database was down.",
      right: "The tests failed, so I checked the logs, and I saw that the database was down.",
      whyEs: "No pegues frases solo con comas; conéctalas con \"so\", \"and\", \"because\" o \"but\".",
    },
    exercises: [
      {
        promptEs: "Di que aprendiste inglés porque querías un trabajo remoto.",
        target: "I learned English because I wanted a remote job.",
        alternatives: ["I'm learning English because I want a remote job."],
      },
      {
        promptEs: "Di que el servidor estaba lento, así que agregaste un caché.",
        target: "The server was slow, so I added a cache.",
        alternatives: ["The server was slow, so I added caching."],
      },
      {
        promptEs: "Di que el plan era bueno, pero no teníamos tiempo.",
        target: "The plan was good, but we didn't have time.",
        alternatives: ["The plan was good, but we did not have time.", "The plan was good, but we didn't have enough time."],
      },
      {
        promptEs: "Di que usas React y Node.js.",
        target: "I use React and Node.js.",
        alternatives: ["I work with React and Node.js."],
      },
      {
        promptEs: "Di que los tests fallaron, así que revisaste los logs.",
        target: "The tests failed, so I checked the logs.",
        alternatives: ["The tests failed, so I looked at the logs."],
      },
      {
        promptEs: "Di que te gusta el backend, pero también disfrutas el frontend.",
        target: "I like backend, but I also enjoy frontend.",
        alternatives: ["I like backend work, but I also enjoy frontend.", "I like the backend, but I also enjoy the frontend."],
      },
    ],
  },
  {
    id: "present-perfect",
    order: 11,
    title: "Present perfect: have/has + participle",
    explanationEs:
      "El present perfect conecta el pasado con el presente: \"I have worked here for five years\" (y sigo trabajando). Se forma con have/has + participio (worked, fixed, built, written). Usa \"for\" para duración y \"since\" para el punto de inicio.",
    pattern: "have/has + past participle (+ for/since)",
    commonMistake: {
      wrong: "The app hasn't report crashes since the fix.",
      right: "The app hasn't reported any crashes since the fix.",
      whyEs: "Después de have/has va el participio (reported), no el verbo base.",
    },
    exercises: [
      {
        promptEs: "Di que la app no ha reportado caídas desde el arreglo.",
        target: "The app hasn't reported any crashes since the fix.",
        alternatives: ["The app has not reported any crashes since the fix.", "There haven't been any crashes since the fix."],
      },
      {
        promptEs: "Di que has trabajado como desarrollador por cinco años.",
        target: "I've worked as a developer for five years.",
        alternatives: ["I have worked as a developer for five years.", "I've been a developer for five years."],
      },
      {
        promptEs: "Di que vives en Monterrey desde 2020.",
        target: "I've lived in Monterrey since 2020.",
        alternatives: ["I have lived in Monterrey since 2020.", "I've been living in Monterrey since 2020."],
      },
      {
        promptEs: "Di que ya terminaste la tarea.",
        target: "I've already finished the task.",
        alternatives: ["I have already finished the task.", "I've finished the task already."],
      },
      {
        promptEs: "Di que nunca has usado Kubernetes en producción.",
        target: "I've never used Kubernetes in production.",
        alternatives: ["I have never used Kubernetes in production."],
      },
      {
        promptEs: "Di que ella ha escrito muchos tests este mes.",
        target: "She has written a lot of tests this month.",
        alternatives: ["She's written a lot of tests this month.", "She has written many tests this month."],
      },
    ],
  },
  {
    id: "star-snippets",
    order: 12,
    title: "Interview STAR snippets",
    explanationEs:
      "En entrevistas, el método STAR (Situation, Task, Action, Result) te ayuda a contar historias claras. Memoriza frases como \"The goal was to...\", \"I was responsible for...\" y \"As a result,...\". Ojo: después de \"was\" para explicar una acción, usa \"to + verbo\".",
    pattern: "The goal was to... / I was responsible for + -ing / As a result, ...",
    commonMistake: {
      wrong: "The fix was declare the variable.",
      right: "The fix was to declare the variable.",
      whyEs: "Después de \"was\" para describir una acción necesitas \"to\" antes del verbo.",
    },
    exercises: [
      {
        promptEs: "Di que el objetivo era reducir el tiempo de carga.",
        target: "The goal was to reduce the loading time.",
        alternatives: ["The goal was to reduce load time.", "Our goal was to reduce the loading time."],
      },
      {
        promptEs: "Di que eras responsable de construir la API.",
        target: "I was responsible for building the API.",
        alternatives: ["I was in charge of building the API."],
      },
      {
        promptEs: "Di que, como resultado, las ventas subieron 20 por ciento.",
        target: "As a result, sales went up by 20 percent.",
        alternatives: ["As a result, sales increased by 20 percent.", "As a result, sales went up 20 percent."],
      },
      {
        promptEs: "Di que la solución era declarar la variable fuera del loop.",
        target: "The fix was to declare the variable outside the loop.",
        alternatives: ["The solution was to declare the variable outside the loop."],
      },
      {
        promptEs: "Di que tu equipo tenía un problema con el rendimiento de la base de datos.",
        target: "My team had a problem with database performance.",
        alternatives: ["Our team had a database performance problem.", "My team had an issue with database performance."],
      },
      {
        promptEs: "Di que primero analizaste los logs y luego encontraste la causa.",
        target: "First, I analyzed the logs, and then I found the root cause.",
        alternatives: ["First I analyzed the logs, and then I found the cause.", "First, I checked the logs, and then I found the root cause."],
      },
    ],
  },
];
