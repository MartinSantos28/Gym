import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import {
  DEMO_ATTENDANCE_DATES,
  DEMO_ROUTINE_VIDEOS,
  ROUTINE_CATEGORIES,
  countVideosByCategory,
  type RoutineCategoryId,
} from '../../data/memberDemo';
import {
  parseISODate,
  formatLong,
  todayISO,
  buildMonthGrid,
  addCalendarMonths,
  isSameCalendarDay,
  toISOFromParts,
} from '../../lib/dateUtils';
import { WorkoutLogSection } from './WorkoutLogSection';
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  LogOut,
  Play,
  Sparkles,
} from 'lucide-react';

const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'] as const;

function isAttendanceDay(
  year: number,
  monthIndex: number,
  day: number,
  set: Set<string>,
): boolean {
  const key = toISOFromParts(year, monthIndex, day);
  return set.has(key);
}

export function MemberDashboard() {
  const { user, logout } = useAuth();

  const now = new Date();
  const attendanceThisMonth = [...DEMO_ATTENDANCE_DATES].filter((iso) => {
    const d = parseISODate(iso);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  const attendanceSet = useMemo(
    () => new Set<string>([...DEMO_ATTENDANCE_DATES]),
    [],
  );

  const sortedAttendance = useMemo(
    () =>
      [...DEMO_ATTENDANCE_DATES].sort(
        (a, b) => parseISODate(b).getTime() - parseISODate(a).getTime(),
      ),
    [],
  );

  const [calendarCursor, setCalendarCursor] = useState(() => ({
    y: now.getFullYear(),
    m: now.getMonth(),
  }));
  const { y: viewY, m: viewM } = calendarCursor;

  const [logDateISO, setLogDateISO] = useState(todayISO);

  const setLogDate = (iso: string) => {
    setLogDateISO(iso);
    const d = parseISODate(iso);
    setCalendarCursor({ y: d.getFullYear(), m: d.getMonth() });
  };

  const monthLabel = new Date(viewY, viewM).toLocaleDateString('es-MX', {
    month: 'long',
    year: 'numeric',
  });
  const grid = buildMonthGrid(viewY, viewM);

  const [routineTab, setRoutineTab] = useState<RoutineCategoryId>('pecho');
  const videosByCategoryCount = useMemo(
    () => countVideosByCategory(DEMO_ROUTINE_VIDEOS),
    [],
  );
  const routineVideosForTab = useMemo(
    () => DEMO_ROUTINE_VIDEOS.filter((v) => v.category === routineTab),
    [routineTab],
  );

  const bumpMonth = (delta: number) => {
    const { year, monthIndex } = addCalendarMonths(viewY, viewM, delta);
    setCalendarCursor({ y: year, m: monthIndex });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-gray-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-4 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-primary">
              <Dumbbell className="h-5 w-5 text-black" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-tight text-white">
                TRINITY <span className="text-primary">Gym</span>
              </p>
              <p className="truncate text-xs text-white/55">
                Panel de miembro
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden max-w-[10rem] truncate text-sm text-white/75 sm:inline md:max-w-xs">
              Hola,{' '}
              <span className="font-semibold text-white">
                {user?.displayName ?? 'Socio'}
              </span>
            </span>
            <Button
              type="button"
              variant="outline"
              onClick={logout}
              className="shrink-0 border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl space-y-12 px-3 py-8 sm:px-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
            Tu progreso
          </span>
        </motion.div>

        {/* Asistencias */}
        <section className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-black sm:text-3xl">
                <CalendarCheck className="h-7 w-7 text-primary" />
                Asistencia al gimnasio
              </h1>
              <p className="mt-1 text-sm text-white/60 sm:text-base">
                Días registrados en los que ingresaste a Trinity. Mes actual:{' '}
                <span className="font-semibold text-white">
                  {attendanceThisMonth}{' '}
                  {attendanceThisMonth === 1 ? 'día' : 'días'}
                </span>
                .
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-7"
            >
              <div className="mb-4 flex items-center justify-between gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-white/70 hover:bg-white/10 hover:text-white"
                  aria-label="Mes anterior"
                  onClick={() => bumpMonth(-1)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h2 className="flex-1 text-center text-lg font-bold capitalize text-white">
                  {monthLabel}
                </h2>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-white/70 hover:bg-white/10 hover:text-white"
                  aria-label="Mes siguiente"
                  onClick={() => bumpMonth(1)}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-white/45 sm:gap-2 sm:text-sm">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="py-2 font-semibold text-white/50">
                    {d}
                  </div>
                ))}
                {grid.flat().map((day, i) => {
                  if (day === null) {
                    return <div key={`e-${i}`} className="aspect-square" />;
                  }
                  const hit = isAttendanceDay(viewY, viewM, day, attendanceSet);
                  const selectedDay = isSameCalendarDay(
                    logDateISO,
                    viewY,
                    viewM,
                    day,
                  );
                  const isToday =
                    day === now.getDate() &&
                    viewM === now.getMonth() &&
                    viewY === now.getFullYear();

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() =>
                        setLogDate(toISOFromParts(viewY, viewM, day))
                      }
                      className={`relative aspect-square rounded-xl border text-sm font-semibold transition-all flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-base ${
                        hit
                          ? 'border-primary/50 bg-gradient-to-br from-primary/30 to-primary/10 text-white shadow-inner'
                          : 'border-white/5 bg-black/20 text-white/45 hover:border-white/15 hover:bg-white/[0.07] hover:text-white/80'
                      } ${
                        selectedDay
                          ? 'ring-2 ring-white/90 ring-offset-2 ring-offset-[#070707]'
                          : ''
                      } ${isToday && !selectedDay ? 'ring-1 ring-primary/40' : ''}`}
                    >
                      {day}
                      {isToday ? (
                        <span
                          className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary sm:bottom-1.5 sm:h-1.5 sm:w-1.5"
                          aria-hidden
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-center text-xs text-white/45">
                Toca un día para ver y editar tu{' '}
                <a
                  href="#registro-entrenamiento"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  registro de entrenamiento
                </a>
                . El anillo blanco es el día seleccionado.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6"
            >
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/70">
                Historial reciente
              </h2>
              <ul className="max-h-[320px] space-y-2 overflow-y-auto pr-1">
                {sortedAttendance.map((iso) => (
                  <li key={iso}>
                    <button
                      type="button"
                      onClick={() => setLogDate(iso)}
                      className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-black/30 px-3 py-2.5 text-left text-sm transition-colors hover:border-primary/30 hover:bg-white/[0.06]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-xs font-bold text-primary">
                        ✓
                      </span>
                      <span className="capitalize text-white/85">
                        {formatLong(iso)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <WorkoutLogSection
          selectedDate={logDateISO}
          onDateChange={setLogDate}
        />

        {/* Videos por grupo muscular */}
        <section
          className="space-y-6 pb-8"
          aria-labelledby="rutinas-video-heading"
        >
          <div>
            <h2
              id="rutinas-video-heading"
              className="flex items-center gap-2 text-2xl font-black sm:text-3xl"
            >
              <Play className="h-7 w-7 text-primary" />
              Rutinas en video
            </h2>
            <p className="mt-1 text-sm text-white/60 sm:text-base">
              Elige un grupo muscular y sigue las guías. Desliza las pestañas en
              móvil para ver todos los bloques.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl sm:p-4">
            <p
              id="routine-tabs-label"
              className="mb-3 px-1 text-xs font-semibold uppercase tracking-widest text-white/50"
            >
              Grupo muscular
            </p>
            <div
              role="tablist"
              aria-labelledby="routine-tabs-label"
              className="-mx-1 flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent] sm:flex-wrap sm:overflow-visible"
            >
              {ROUTINE_CATEGORIES.map((cat) => {
                const count = videosByCategoryCount[cat.id];
                const selected = routineTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    id={`routine-tab-${cat.id}`}
                    aria-selected={selected}
                    aria-controls={`routine-panel-${cat.id}`}
                    tabIndex={0}
                    onClick={() => setRoutineTab(cat.id)}
                    className={`flex shrink-0 snap-start items-center gap-2 rounded-full border px-3.5 py-2 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-4 ${
                      selected
                        ? 'border-primary/50 bg-primary/15 text-primary ring-2 ring-primary/25'
                        : 'border-white/10 bg-white/[0.04] text-white/75 hover:border-white/20 hover:bg-white/[0.07] hover:text-white'
                    }`}
                  >
                    <span className="whitespace-nowrap sm:hidden">
                      {cat.shortLabel}
                    </span>
                    <span className="hidden whitespace-nowrap sm:inline">
                      {cat.label}
                    </span>
                    <span
                      className={`rounded-full px-1.5 py-0 text-[10px] font-bold tabular-nums sm:text-xs ${
                        selected
                          ? 'bg-primary/25 text-primary'
                          : 'bg-white/10 text-white/55'
                      }`}
                      aria-hidden
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            role="tabpanel"
            id={`routine-panel-${routineTab}`}
            aria-labelledby={`routine-tab-${routineTab}`}
            className="min-h-[10rem]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={routineTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid gap-6 sm:grid-cols-2"
              >
                {routineVideosForTab.map((v, idx) => (
                  <motion.article
                    key={v.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * idx }}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
                  >
                    <div className="aspect-video w-full overflow-hidden bg-black">
                      <iframe
                        title={v.title}
                        src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-2 p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-0.5 text-xs font-semibold text-white/85">
                          {
                            ROUTINE_CATEGORIES.find((c) => c.id === v.category)
                              ?.label
                          }
                        </span>
                        <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                          {v.tag}
                        </span>
                        <span className="text-xs text-white/45">
                          {v.duration}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {v.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/65">
                        {v.description}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}
