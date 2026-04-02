/** Fecha local YYYY-MM-DD sin UTC shift. */
export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatLong(iso: string): string {
  return parseISODate(iso).toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function todayISO(): string {
  const d = new Date();
  return toISOFromParts(d.getFullYear(), d.getMonth(), d.getDate());
}

export function toISOFromParts(
  year: number,
  monthIndex: number,
  day: number,
): string {
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function isSameCalendarDay(
  iso: string,
  year: number,
  monthIndex: number,
  day: number,
): boolean {
  const d = parseISODate(iso);
  return (
    d.getFullYear() === year &&
    d.getMonth() === monthIndex &&
    d.getDate() === day
  );
}

export function addCalendarMonths(
  year: number,
  monthIndex: number,
  delta: number,
): { year: number; monthIndex: number } {
  const d = new Date(year, monthIndex + delta, 1);
  return { year: d.getFullYear(), monthIndex: d.getMonth() };
}

export function shiftISODate(iso: string, dayDelta: number): string {
  const d = parseISODate(iso);
  d.setDate(d.getDate() + dayDelta);
  return toISOFromParts(d.getFullYear(), d.getMonth(), d.getDate());
}

export function buildMonthGrid(
  year: number,
  monthIndex: number,
): (number | null)[][] {
  const first = new Date(year, monthIndex, 1);
  const last = new Date(year, monthIndex + 1, 0);
  const startPad = (first.getDay() + 6) % 7;
  const daysInMonth = last.getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }
  return rows;
}
