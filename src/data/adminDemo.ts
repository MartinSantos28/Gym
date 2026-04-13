import { todayISO } from '../lib/dateUtils';

export type SubscriptionType = 'Mensual' | 'Trimestral' | 'Anual';
export type MemberStatus = 'Activo' | 'Vencido' | 'Suspendido';

export type GymMember = {
  id: string;
  username: string;
  fullName: string;
  phone: string;
  createdAtISO: string;
  subscriptionType: SubscriptionType;
  status: MemberStatus;
  /** Fechas ISO (YYYY-MM-DD) de asistencias. */
  attendanceDates: string[];
};

const T = todayISO();

export const DEMO_MEMBERS: GymMember[] = [
  {
    id: 'm-001',
    username: 'martinSantos',
    fullName: 'Martin Santos',
    phone: '9611234567',
    createdAtISO: '2026-02-01',
    subscriptionType: 'Mensual',
    status: 'Activo',
    attendanceDates: [
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
      T,
    ],
  },
  {
    id: 'm-002',
    username: 'mariaGomez',
    fullName: 'María Gómez',
    phone: '9619876543',
    createdAtISO: '2026-02-10',
    subscriptionType: 'Trimestral',
    status: 'Activo',
    attendanceDates: [
      '2026-03-02',
      '2026-03-04',
      '2026-03-06',
      '2026-03-09',
      '2026-03-12',
      '2026-03-16',
      '2026-03-18',
      '2026-03-23',
      '2026-03-30',
      '2026-04-03',
    ],
  },
  {
    id: 'm-003',
    username: 'carlosLopez',
    fullName: 'Carlos López',
    phone: '9615551122',
    createdAtISO: '2026-01-15',
    subscriptionType: 'Mensual',
    status: 'Vencido',
    attendanceDates: ['2026-02-01', '2026-02-04', '2026-02-08'],
  },
  {
    id: 'm-004',
    username: 'anaRuiz',
    fullName: 'Ana Ruiz',
    phone: '9612223344',
    createdAtISO: '2026-03-01',
    subscriptionType: 'Anual',
    status: 'Activo',
    attendanceDates: [
      '2026-03-01',
      '2026-03-03',
      '2026-03-05',
      '2026-03-08',
      '2026-03-10',
      '2026-03-12',
      '2026-03-15',
      '2026-03-17',
      '2026-03-19',
      '2026-03-22',
      '2026-03-24',
      '2026-03-26',
      '2026-03-29',
      '2026-03-31',
      '2026-04-02',
    ],
  },
];

