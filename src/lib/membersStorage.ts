import { DEMO_MEMBERS, type GymMember, type MemberStatus, type SubscriptionType } from '../data/adminDemo';

const STORAGE_KEY = 'trinity-gym-members-v1';

function safeParse(raw: string | null): GymMember[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as GymMember[];
  } catch {
    return [];
  }
}

export function loadMembers(): GymMember[] {
  const stored = safeParse(localStorage.getItem(STORAGE_KEY));
  // Merge demo members (keeps any stored edits for same username/id)
  const byUsername = new Map<string, GymMember>();
  for (const m of DEMO_MEMBERS) byUsername.set(m.username.toLowerCase(), m);
  for (const m of stored) byUsername.set(m.username.toLowerCase(), m);
  return [...byUsername.values()];
}

export function saveMembers(members: GymMember[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
}

export function upsertMember(member: GymMember) {
  const members = loadMembers();
  const u = member.username.toLowerCase();
  const idx = members.findIndex((m) => m.username.toLowerCase() === u);
  if (idx >= 0) members[idx] = member;
  else members.push(member);
  saveMembers(members);
}

export function createMemberFromRegistration(input: {
  apellidoPaterno: string;
  apellidoMaterno?: string;
  nombre: string;
  telefono: string;
  direccion: string;
  edad: number;
  sexo: string;
  subscriptionType?: SubscriptionType;
}): { member: GymMember; generatedPassword: string } {
  const phoneDigits = input.telefono.replace(/\D/g, '');
  const baseUser =
    `${input.nombre}${input.apellidoPaterno}`.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
  const user = `${baseUser}${phoneDigits.slice(-4)}` || `socio${phoneDigits.slice(-4) || '0000'}`;
  const generatedPassword = phoneDigits.slice(-6) || 'trinity123';
  const fullName = [
    input.nombre.trim(),
    input.apellidoPaterno.trim(),
    (input.apellidoMaterno ?? '').trim(),
  ]
    .filter(Boolean)
    .join(' ');

  const now = new Date();
  const createdAtISO = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const member: GymMember = {
    id: `m-${now.getTime()}`,
    username: user,
    fullName,
    phone: phoneDigits,
    createdAtISO,
    subscriptionType: input.subscriptionType ?? 'Mensual',
    status: 'Activo',
    attendanceDates: [],
  };
  return { member, generatedPassword };
}

export function updateMemberStatus(username: string, status: MemberStatus) {
  const members = loadMembers();
  const u = username.toLowerCase();
  const next = members.map((m) =>
    m.username.toLowerCase() === u ? { ...m, status } : m,
  );
  saveMembers(next);
}

