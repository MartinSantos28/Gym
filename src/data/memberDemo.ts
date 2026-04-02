/**
 * Datos demo para el panel de Martin (sustituir por API).
 * Fechas ISO locales (YYYY-MM-DD).
 */
export const DEMO_ATTENDANCE_DATES = [
  '2026-02-03',
  '2026-02-05',
  '2026-02-07',
  '2026-02-10',
  '2026-02-12',
  '2026-02-14',
  '2026-02-18',
  '2026-02-21',
  '2026-02-24',
  '2026-02-26',
  '2026-02-28',
  '2026-03-03',
  '2026-03-05',
  '2026-03-08',
  '2026-03-11',
  '2026-03-14',
  '2026-03-17',
  '2026-03-20',
  '2026-03-24',
  '2026-03-27',
  '2026-04-01',
  '2026-04-02',
] as const;

/** Grupos musculares para rutinas en video (orden de pestañas en el panel). */
export const ROUTINE_CATEGORIES = [
  { id: 'pecho', label: 'Pecho', shortLabel: 'Pecho' },
  { id: 'espalda', label: 'Espalda', shortLabel: 'Espalda' },
  { id: 'biceps', label: 'Bíceps', shortLabel: 'Bíceps' },
  { id: 'triceps', label: 'Tríceps', shortLabel: 'Tríceps' },
  { id: 'pantorrillas', label: 'Pantorrillas', shortLabel: 'Gemelos' },
  { id: 'cuadriceps', label: 'Cuádriceps', shortLabel: 'Cuádriceps' },
  { id: 'femoral', label: 'Femoral', shortLabel: 'Isquios' },
  { id: 'abdomen', label: 'Abdomen', shortLabel: 'Core' },
] as const;

export type RoutineCategoryId = (typeof ROUTINE_CATEGORIES)[number]['id'];

export type RoutineVideo = {
  id: string;
  title: string;
  description: string;
  tag: string;
  category: RoutineCategoryId;
  /** ID de video de YouTube (solo embed). */
  youtubeId: string;
  duration: string;
};

export const DEMO_ROUTINE_VIDEOS: RoutineVideo[] = [
  {
    id: 'p1',
    title: 'Press de banca — técnica y rango',
    description:
      'Base para pecho: escápulas, recorrido controlado y alineación de muñecas.',
    tag: 'Compuesto',
    category: 'pecho',
    youtubeId: 'rT7DgCr-3pg',
    duration: '~12 min',
  },
  {
    id: 'p2',
    title: 'Aperturas y cruces en polea',
    description:
      'Aislamiento para pectoral con tensión constante en todo el arco.',
    tag: 'Aislamiento',
    category: 'pecho',
    youtubeId: 'M1IfJmVjKW0',
    duration: '~8 min',
  },
  {
    id: 'e1',
    title: 'Dominadas — progresiones',
    description:
      'Espalda y bíceps: agarre, escápulas y cómo escalar la dificultad.',
    tag: 'Compuesto',
    category: 'espalda',
    youtubeId: 'eGo4IYlbE5g',
    duration: '~11 min',
  },
  {
    id: 'e2',
    title: 'Remo con barra / mancuerna',
    description:
      'Remo horizontal para dorsales y trapecio medio con torso estable.',
    tag: 'Compuesto',
    category: 'espalda',
    youtubeId: 'roCP6nCt2_A',
    duration: '~9 min',
  },
  {
    id: 'b1',
    title: 'Curl de bíceps — variaciones',
    description:
      'Barra, mancuernas y agarre; evita balanceo y cuida el codo.',
    tag: 'Aislamiento',
    category: 'biceps',
    youtubeId: 'kwG2ipeKNxc',
    duration: '~7 min',
  },
  {
    id: 'b2',
    title: 'Curl martillo — braquial',
    description:
      'Enfatiza braquial y antebrazo; útil para volumen de brazo.',
    tag: 'Aislamiento',
    category: 'biceps',
    youtubeId: 'TwB1_4Ruh4A',
    duration: '~6 min',
  },
  {
    id: 't1',
    title: 'Extensión de tríceps en polea',
    description:
      'Codos fijos, hombros abajo; ideal para volumen en tríceps.',
    tag: 'Aislamiento',
    category: 'triceps',
    youtubeId: 'nRiJVZDpdL0',
    duration: '~6 min',
  },
  {
    id: 't2',
    title: 'Press cerrado o fondos',
    description:
      'Tríceps y pecho superior: rango segundo para hombros y codos.',
    tag: 'Compuesto',
    category: 'triceps',
    youtubeId: 'yPinc2vcYVc',
    duration: '~10 min',
  },
  {
    id: 'c1',
    title: 'Elevación de gemelos de pie',
    description:
      'Pantorrillas: pausa abajo, rango completo y control del tobillo.',
    tag: 'Aislamiento',
    category: 'pantorrillas',
    youtubeId: 'gwLzBJYoWlI',
    duration: '~5 min',
  },
  {
    id: 'c2',
    title: 'Gemelos en prensa o sentado',
    description:
      'Separa sóleo y gastrocnemio según flexión de rodilla.',
    tag: 'Aislamiento',
    category: 'pantorrillas',
    youtubeId: 'YyvJfVF4sL8',
    duration: '~6 min',
  },
  {
    id: 'q1',
    title: 'Sentadilla — profundidad y alineación',
    description:
      'Cuádriceps y glúteo: rodillas, pecho y centro de gravedad.',
    tag: 'Compuesto',
    category: 'cuadriceps',
    youtubeId: 'ultWZbUMPL8',
    duration: '~14 min',
  },
  {
    id: 'q2',
    title: 'Zancadas y split squat',
    description:
      'Trabajo unilateral para cuádriceps y estabilidad de cadera.',
    tag: 'Unilateral',
    category: 'cuadriceps',
    youtubeId: 'D7KaRUPAP4c',
    duration: '~9 min',
  },
  {
    id: 'f1',
    title: 'Peso muerto rumano',
    description:
      'Cadena posterior: isquiotibiales y glúteo con bisagra de cadera.',
    tag: 'Compuesto',
    category: 'femoral',
    youtubeId: 'JCXUYuzwNrM',
    duration: '~11 min',
  },
  {
    id: 'f2',
    title: 'Curl femoral tumbado o de pie',
    description:
      'Aislamiento de isquiotibiales; ajusta el peso para no perder forma.',
    tag: 'Aislamiento',
    category: 'femoral',
    youtubeId: '1Tq3wW0_Lww',
    duration: '~7 min',
  },
  {
    id: 'a1',
    title: 'Plancha y braceo abdominal',
    description:
      'Core anti-extensión: alineación cabeza–cadera y respiración.',
    tag: 'Estabilidad',
    category: 'abdomen',
    youtubeId: 'B296mZDhrP4',
    duration: '~8 min',
  },
  {
    id: 'a2',
    title: 'Rodillo o flexiones largas',
    description:
      'Progresión para recto abdominal; respeta la zona lumbar.',
    tag: 'Avanzado',
    category: 'abdomen',
    youtubeId: '22wP0YxD-Ck',
    duration: '~7 min',
  },
];

/** Cuenta videos por categoría (para badges en UI). */
export function countVideosByCategory(
  videos: RoutineVideo[]
): Record<RoutineCategoryId, number> {
  const initial = Object.fromEntries(
    ROUTINE_CATEGORIES.map((c) => [c.id, 0])
  ) as Record<RoutineCategoryId, number>;
  for (const v of videos) {
    initial[v.category] += 1;
  }
  return initial;
}
