import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth } from '../../context/AuthContext';
import {
  useWorkoutLog,
  createExercise,
  createEmptySet,
  type LoggedExercise,
  type WorkoutSetRow,
} from '../../hooks/useWorkoutLog';
import {
  DEMO_ROUTINE_VIDEOS,
  ROUTINE_CATEGORIES,
} from '../../data/memberDemo';
import {
  formatLong,
  shiftISODate,
  todayISO,
} from '../../lib/dateUtils';
import {
  BookOpen,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Plus,
  Trash2,
} from 'lucide-react';

type Props = {
  selectedDate: string;
  onDateChange: (iso: string) => void;
};

const inputClass =
  'border-white/15 bg-black/40 text-white placeholder:text-white/35 focus-visible:border-primary/50';

export function WorkoutLogSection({ selectedDate, onDateChange }: Props) {
  const { user } = useAuth();
  const { byDate, replaceDay, storageReady } = useWorkoutLog(user?.username);

  const exercises = useMemo(
    () => byDate[selectedDate] ?? [],
    [byDate, selectedDate],
  );

  const setExercises = (next: LoggedExercise[]) => {
    replaceDay(selectedDate, next);
  };

  const patchExercise = (
    id: string,
    fn: (ex: LoggedExercise) => LoggedExercise,
  ) => {
    setExercises(exercises.map((ex) => (ex.id === id ? fn(ex) : ex)));
  };

  const addFromLibrary = (title: string, category?: LoggedExercise['category']) => {
    setExercises([...exercises, createExercise(title, category)]);
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  const updateName = (id: string, name: string) => {
    patchExercise(id, (ex) => ({ ...ex, name }));
  };

  const addSet = (exerciseId: string) => {
    patchExercise(exerciseId, (ex) => ({
      ...ex,
      sets: [...ex.sets, createEmptySet()],
    }));
  };

  const removeSet = (exerciseId: string, setId: string) => {
    patchExercise(exerciseId, (ex) => {
      if (ex.sets.length <= 1) return ex;
      return { ...ex, sets: ex.sets.filter((s) => s.id !== setId) };
    });
  };

  const updateSet = (
    exerciseId: string,
    setId: string,
    patch: Partial<Pick<WorkoutSetRow, 'reps' | 'weightKg'>>,
  ) => {
    patchExercise(exerciseId, (ex) => ({
      ...ex,
      sets: ex.sets.map((s) =>
        s.id === setId ? { ...s, ...patch } : s,
      ),
    }));
  };

  const countSeries = exercises.reduce((n, e) => n + e.sets.length, 0);

  return (
    <section
      id="registro-entrenamiento"
      className="scroll-mt-28 space-y-6"
      aria-labelledby="workout-log-heading"
    >
      <div>
        <h2
          id="workout-log-heading"
          className="flex flex-wrap items-center gap-2 text-2xl font-black sm:text-3xl"
        >
          <ClipboardList className="h-7 w-7 shrink-0 text-primary" />
          Registro del entrenamiento
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-white/60 sm:text-base">
          Anota pesos y repeticiones por día. Todo se guarda en este navegador
          (solo tú en esta cuenta).
        </p>
      </div>

      {/* Selector de día */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50">
          <CalendarRange className="h-3.5 w-3.5" />
          Día del registro
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0 border-white/20 bg-white/5 text-white hover:bg-white/10"
              aria-label="Día anterior"
              onClick={() => onDateChange(shiftISODate(selectedDate, -1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                const v = e.target.value;
                if (v) onDateChange(v);
              }}
              className={`h-10 min-w-[10.5rem] rounded-xl border px-3 text-sm font-medium [color-scheme:dark] sm:min-w-[11rem] ${inputClass}`}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0 border-white/20 bg-white/5 text-white hover:bg-white/10"
              aria-label="Día siguiente"
              onClick={() => onDateChange(shiftISODate(selectedDate, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="border border-white/10 bg-white/10 text-white hover:bg-white/15"
              onClick={() => onDateChange(todayISO())}
            >
              Hoy
            </Button>
          </div>
          <p className="text-sm font-medium capitalize leading-snug text-white/80 sm:text-right">
            {formatLong(selectedDate)}
          </p>
        </div>
      </div>

      {/* Biblioteca rápida */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50">
          <BookOpen className="h-3.5 w-3.5" />
          Añadir desde la biblioteca de videos
        </p>
        <div className="-mx-1 flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 [scrollbar-width:thin]">
          {DEMO_ROUTINE_VIDEOS.map((v) => (
            <button
              key={v.id}
              type="button"
              disabled={!storageReady}
              onClick={() => addFromLibrary(v.title, v.category)}
              className="max-w-[220px] shrink-0 snap-start rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-left text-xs font-medium text-white/85 transition-colors hover:border-primary/35 hover:bg-primary/10 hover:text-white disabled:opacity-40 sm:max-w-[260px] sm:text-sm"
            >
              <span className="line-clamp-2">{v.title}</span>
              <span className="mt-1 block text-[10px] font-normal text-primary/90 sm:text-xs">
                {
                  ROUTINE_CATEGORIES.find((c) => c.id === v.category)
                    ?.label
                }
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Resumen + ejercicios personalizados */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-white/55">
          {exercises.length === 0
            ? 'Aún no hay ejercicios este día.'
            : `${exercises.length} ejercicio${exercises.length === 1 ? '' : 's'} · ${countSeries} serie${countSeries === 1 ? '' : 's'}`}
        </p>
        <Button
          type="button"
          variant="outline"
          className="w-full border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 sm:w-auto"
          disabled={!storageReady}
          onClick={() =>
            setExercises([
              ...exercises,
              createExercise('Nuevo ejercicio', undefined),
            ])
          }
        >
          <Plus className="h-4 w-4" />
          Ejercicio en blanco
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {exercises.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-14 text-center backdrop-blur-xl"
          >
            <p className="text-base font-semibold text-white/80">
              Empieza tu registro
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
              Usa la biblioteca arriba o &quot;Ejercicio en blanco&quot;. Luego
              anota cada serie con repeticiones y peso (kg).
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {exercises.map((ex, exIdx) => (
              <motion.article
                key={ex.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: exIdx * 0.03 }}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5"
              >
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-2">
                    <Label
                      htmlFor={`ex-name-${ex.id}`}
                      className="text-xs text-white/50"
                    >
                      Ejercicio
                    </Label>
                    <Input
                      id={`ex-name-${ex.id}`}
                      value={ex.name}
                      onChange={(e) => updateName(ex.id, e.target.value)}
                      disabled={!storageReady}
                      className={inputClass}
                      placeholder="Nombre del movimiento"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-white/50 hover:bg-destructive/15 hover:text-red-400"
                    aria-label="Eliminar ejercicio"
                    onClick={() => removeExercise(ex.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {ex.category ? (
                  <div className="mb-3">
                    <span className="rounded-full border border-white/12 bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-semibold text-white/70">
                      {
                        ROUTINE_CATEGORIES.find((c) => c.id === ex.category)
                          ?.label
                      }
                    </span>
                  </div>
                ) : null}

                <div className="space-y-2">
                  <div className="hidden grid-cols-[2.5rem_1fr_1fr_2.5rem] gap-2 px-1 sm:grid">
                    <span />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                      Reps
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                      Peso (kg)
                    </span>
                    <span />
                  </div>
                  {ex.sets.map((set, setIdx) => (
                    <div
                      key={set.id}
                      className="grid grid-cols-1 gap-2 rounded-2xl border border-white/5 bg-black/25 p-3 sm:grid-cols-[2.5rem_1fr_1fr_2.5rem] sm:items-center sm:p-2"
                    >
                      <div className="flex items-center justify-between sm:block sm:text-center">
                        <span className="text-[10px] font-semibold uppercase text-white/40 sm:hidden">
                          Serie {setIdx + 1}
                        </span>
                        <span className="text-sm font-bold tabular-nums text-primary sm:block sm:pt-1">
                          {setIdx + 1}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor={`reps-${set.id}`}
                          className="text-[10px] text-white/45 sm:sr-only"
                        >
                          Repeticiones serie {setIdx + 1}
                        </Label>
                        <Input
                          id={`reps-${set.id}`}
                          inputMode="numeric"
                          placeholder="Reps"
                          value={set.reps}
                          onChange={(e) =>
                            updateSet(ex.id, set.id, {
                              reps: e.target.value.replace(/[^\d]/g, ''),
                            })
                          }
                          disabled={!storageReady}
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor={`kg-${set.id}`}
                          className="text-[10px] text-white/45 sm:sr-only"
                        >
                          Peso kg serie {setIdx + 1}
                        </Label>
                        <Input
                          id={`kg-${set.id}`}
                          inputMode="decimal"
                          placeholder="Kg"
                          value={set.weightKg}
                          onChange={(e) =>
                            updateSet(ex.id, set.id, {
                              weightKg: e.target.value.replace(
                                /[^\d.,]/g,
                                '',
                              ),
                            })
                          }
                          disabled={!storageReady}
                          className={inputClass}
                        />
                      </div>
                      <div className="flex justify-end sm:justify-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-white/45 hover:bg-white/10 hover:text-red-400"
                          aria-label={`Eliminar serie ${setIdx + 1}`}
                          disabled={ex.sets.length <= 1}
                          onClick={() => removeSet(ex.id, set.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3 border-white/15 bg-white/5 text-white hover:bg-white/10"
                  onClick={() => addSet(ex.id)}
                  disabled={!storageReady}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Añadir serie
                </Button>
              </motion.article>
            ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
