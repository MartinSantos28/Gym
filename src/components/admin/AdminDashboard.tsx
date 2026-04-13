import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useMembers } from '../../hooks/useMembers';
import { formatLong, parseISODate, todayISO } from '../../lib/dateUtils';
import type { GymMember, MemberStatus, SubscriptionType } from '../../data/adminDemo';
import {
  Activity,
  CalendarCheck,
  ChevronDown,
  Dumbbell,
  LogOut,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react';

const pillBase =
  'rounded-full border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

function toMonthKey(iso: string): string {
  return iso.slice(0, 7);
}

function countVisitsInMonth(attendance: string[], monthKey: string): number {
  let n = 0;
  for (const d of attendance) if (toMonthKey(d) === monthKey) n++;
  return n;
}

function lastVisit(attendance: string[]): string | null {
  if (!attendance.length) return null;
  return [...attendance].sort(
    (a, b) => parseISODate(b).getTime() - parseISODate(a).getTime(),
  )[0]!;
}

function statusBadgeVariant(status: MemberStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (status === 'Activo') return 'default';
  if (status === 'Suspendido') return 'secondary';
  return 'destructive';
}

function planPriceMXN(plan: SubscriptionType): number {
  // Demo prices. Replace with real billing.
  if (plan === 'Mensual') return 450;
  if (plan === 'Trimestral') return 1200;
  return 4200;
}

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const { members } = useMembers();

  const [q, setQ] = useState('');
  const [plan, setPlan] = useState<SubscriptionType | 'Todos'>('Todos');
  const [status, setStatus] = useState<MemberStatus | 'Todos'>('Todos');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const monthKey = toMonthKey(todayISO());
  const today = todayISO();

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return members.filter((m) => {
      if (plan !== 'Todos' && m.subscriptionType !== plan) return false;
      if (status !== 'Todos' && m.status !== status) return false;
      if (!query) return true;
      return (
        m.fullName.toLowerCase().includes(query) ||
        m.username.toLowerCase().includes(query) ||
        m.phone.includes(query)
      );
    });
  }, [members, plan, status, q]);

  const kpis = useMemo(() => {
    const total = members.length;
    const active = members.filter((m) => m.status === 'Activo');
    const activeCount = active.length;
    const visitsToday = members.filter((m) => m.attendanceDates.includes(today)).length;
    const visitsThisMonth = members.reduce(
      (sum, m) => sum + countVisitsInMonth(m.attendanceDates, monthKey),
      0,
    );
    const avgVisitsPerMember = total > 0 ? visitsThisMonth / total : 0;
    const mrr = active.reduce((sum, m) => sum + planPriceMXN(m.subscriptionType) / (m.subscriptionType === 'Anual' ? 12 : m.subscriptionType === 'Trimestral' ? 3 : 1), 0);

    return {
      total,
      activeCount,
      visitsToday,
      visitsThisMonth,
      avgVisitsPerMember,
      mrr,
    };
  }, [members, monthKey, today]);

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
              <p className="truncate text-xs text-white/55">Administrador</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden max-w-[14rem] truncate text-sm text-white/75 sm:inline md:max-w-xs">
              {user?.displayName ?? 'Admin'}
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

      <main className="relative z-10 mx-auto max-w-6xl space-y-10 px-3 py-8 sm:px-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2"
        >
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
            Resumen del negocio
          </span>
        </motion.div>

        {/* KPIs */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            icon={<Users className="h-5 w-5 text-primary" />}
            label="Socios"
            value={kpis.total.toLocaleString('es-MX')}
            hint="Total dados de alta"
          />
          <KpiCard
            icon={<Activity className="h-5 w-5 text-primary" />}
            label="Activos"
            value={kpis.activeCount.toLocaleString('es-MX')}
            hint="Suscripción vigente"
          />
          <KpiCard
            icon={<CalendarCheck className="h-5 w-5 text-primary" />}
            label="Asistencias (hoy)"
            value={kpis.visitsToday.toLocaleString('es-MX')}
            hint="Registros del día"
          />
          <KpiCard
            icon={<TrendingUp className="h-5 w-5 text-primary" />}
            label="Asistencias (mes)"
            value={kpis.visitsThisMonth.toLocaleString('es-MX')}
            hint={`Prom. ${kpis.avgVisitsPerMember.toFixed(1)} por socio`}
          />
        </section>

        {/* Filtros */}
        <section className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar por nombre, usuario o teléfono…"
                  className="border-white/15 bg-black/40 pl-9 text-white placeholder:text-white/35 focus-visible:border-primary/50"
                />
              </div>
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
                {(['Todos', 'Mensual', 'Trimestral', 'Anual'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlan(p)}
                    className={`${pillBase} ${
                      plan === p
                        ? 'border-primary/45 bg-primary/15 text-primary ring-2 ring-primary/20'
                        : 'border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20 hover:bg-white/[0.07] hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <span className="mx-1 w-px bg-white/10" aria-hidden />
                {(['Todos', 'Activo', 'Vencido', 'Suspendido'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`${pillBase} ${
                      status === s
                        ? 'border-primary/45 bg-primary/15 text-primary ring-2 ring-primary/20'
                        : 'border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20 hover:bg-white/[0.07] hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-white/50">
              Mostrando <span className="font-semibold text-white/80">{filtered.length}</span> de{' '}
              <span className="font-semibold text-white/80">{members.length}</span> socios.
            </p>
          </div>

          {/* Tabla */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/60">Socio</TableHead>
                  <TableHead className="text-white/60">Usuario</TableHead>
                  <TableHead className="text-white/60">Teléfono</TableHead>
                  <TableHead className="text-white/60">Plan</TableHead>
                  <TableHead className="text-white/60">Estado</TableHead>
                  <TableHead className="text-white/60">Visitas (mes)</TableHead>
                  <TableHead className="text-white/60">Última visita</TableHead>
                  <TableHead className="text-white/60 text-right">Detalles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((m) => {
                  const vMonth = countVisitsInMonth(m.attendanceDates, monthKey);
                  const last = lastVisit(m.attendanceDates);
                  const isOpen = Boolean(expanded[m.username.toLowerCase()]);

                  return (
                    <React.Fragment key={m.id}>
                      <TableRow className="border-white/10 hover:bg-white/[0.03]">
                        <TableCell className="text-white/85 font-semibold whitespace-nowrap">
                          {m.fullName}
                        </TableCell>
                        <TableCell className="text-white/65">{m.username}</TableCell>
                        <TableCell className="text-white/65">{m.phone || '—'}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-white/15 bg-white/[0.04] text-white/80"
                          >
                            {m.subscriptionType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={statusBadgeVariant(m.status)}
                            className={
                              m.status === 'Activo'
                                ? 'bg-primary/15 text-primary border-primary/40'
                                : m.status === 'Suspendido'
                                  ? 'bg-white/10 text-white/75 border-white/15'
                                  : 'bg-red-500/15 text-red-300 border-red-500/30'
                            }
                          >
                            {m.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white/80 font-semibold tabular-nums">
                          {vMonth}
                        </TableCell>
                        <TableCell className="text-white/65 capitalize">
                          {last ? formatLong(last) : '—'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-white/65 hover:bg-white/10 hover:text-white"
                            onClick={() =>
                              setExpanded((p) => ({
                                ...p,
                                [m.username.toLowerCase()]: !isOpen,
                              }))
                            }
                          >
                            Ver
                            <ChevronDown
                              className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <TableRow className="border-white/10">
                            <TableCell colSpan={8} className="p-0">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t border-white/10 bg-black/30"
                              >
                                <div className="grid gap-4 p-4 sm:grid-cols-2">
                                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                                      Días asistidos (últimos 20)
                                    </p>
                                    <ul className="mt-3 max-h-[220px] space-y-2 overflow-y-auto pr-1">
                                      {[...m.attendanceDates]
                                        .sort(
                                          (a, b) =>
                                            parseISODate(b).getTime() -
                                            parseISODate(a).getTime(),
                                        )
                                        .slice(0, 20)
                                        .map((d) => (
                                          <li
                                            key={d}
                                            className="rounded-xl border border-white/5 bg-black/25 px-3 py-2 text-sm text-white/75 capitalize"
                                          >
                                            {formatLong(d)}
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                                      Perfil
                                    </p>
                                    <div className="mt-3 space-y-2 text-sm">
                                      <div className="flex items-center justify-between gap-3">
                                        <span className="text-white/55">Alta</span>
                                        <span className="text-white/80">
                                          {formatLong(m.createdAtISO)}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between gap-3">
                                        <span className="text-white/55">Plan</span>
                                        <span className="text-white/80">{m.subscriptionType}</span>
                                      </div>
                                      <div className="flex items-center justify-between gap-3">
                                        <span className="text-white/55">Precio (demo)</span>
                                        <span className="text-white/80 tabular-nums">
                                          ${planPriceMXN(m.subscriptionType).toLocaleString('es-MX')} MXN
                                        </span>
                                      </div>
                                      <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                                          KPI rápido
                                        </p>
                                        <p className="mt-2 text-sm text-white/65">
                                          Visitas este mes: <span className="font-semibold text-white/85">{vMonth}</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </AnimatePresence>
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
            <div className="border-t border-white/10 px-4 py-3 text-xs text-white/45">
              KPIs demo sugeridos para gimnasio: socios activos, asistencias (hoy/mes), promedio de visitas, MRR estimado.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
            {label}
          </p>
          <p className="mt-2 text-3xl font-black tracking-tight text-white">
            {value}
          </p>
          <p className="mt-1 text-sm text-white/55">{hint}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

