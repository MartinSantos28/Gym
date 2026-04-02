import { useCallback, useEffect, useMemo, useState } from 'react';
import type { RoutineCategoryId } from '../data/memberDemo';

export type WorkoutSetRow = {
  id: string;
  reps: string;
  weightKg: string;
};

export type LoggedExercise = {
  id: string;
  name: string;
  category?: RoutineCategoryId;
  sets: WorkoutSetRow[];
};

export type WorkoutLogByDate = Record<string, LoggedExercise[]>;

function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function load(storageKey: string): WorkoutLogByDate {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))
      return {};
    return parsed as WorkoutLogByDate;
  } catch {
    return {};
  }
}

function persist(storageKey: string, data: WorkoutLogByDate) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch {
    /* */
  }
}

export function createEmptySet(): WorkoutSetRow {
  return { id: uid(), reps: '', weightKg: '' };
}

export function createExercise(
  name: string,
  category?: RoutineCategoryId,
): LoggedExercise {
  return {
    id: uid(),
    name: name.trim() || 'Ejercicio',
    category,
    sets: [createEmptySet()],
  };
}

function cloneExercise(e: LoggedExercise): LoggedExercise {
  return {
    ...e,
    sets: e.sets.map((s) => ({ ...s })),
  };
}

export function useWorkoutLog(userKey: string | undefined) {
  const storageKey = useMemo(
    () =>
      userKey ? `trinity-gym-workout-log-v1:${userKey.toLowerCase()}` : null,
    [userKey],
  );

  const [byDate, setByDate] = useState<WorkoutLogByDate>({});

  useEffect(() => {
    if (!storageKey) {
      setByDate({});
      return;
    }
    setByDate(load(storageKey));
  }, [storageKey]);

  const replaceDay = useCallback(
    (iso: string, exercises: LoggedExercise[]) => {
      if (!storageKey) return;
      setByDate((prev) => {
        const next = { ...prev };
        if (exercises.length === 0) {
          delete next[iso];
        } else {
          next[iso] = exercises.map(cloneExercise);
        }
        persist(storageKey, next);
        return next;
      });
    },
    [storageKey],
  );

  return { byDate, replaceDay, storageReady: Boolean(storageKey) };
}

export { uid };
