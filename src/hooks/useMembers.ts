import { useEffect, useMemo, useState } from 'react';
import type { GymMember } from '../data/adminDemo';
import { loadMembers, saveMembers } from '../lib/membersStorage';

export function useMembers() {
  const [members, setMembers] = useState<GymMember[]>([]);

  useEffect(() => {
    setMembers(loadMembers());
  }, []);

  const api = useMemo(() => {
    const setAll = (next: GymMember[]) => {
      setMembers(next);
      saveMembers(next);
    };

    return {
      members,
      refresh: () => setMembers(loadMembers()),
      setAll,
    };
  }, [members]);

  return api;
}

