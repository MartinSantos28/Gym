import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { flushSync } from 'react-dom';

const STORAGE_KEY = 'trinity-gym-session';

/** Usuario de prueba (credenciales fijas hasta conectar API). */
export const DEMO_USER = {
  username: 'martinSantos',
  password: 'colmillo12',
  displayName: 'Martin Santos',
} as const;

export type AuthUser = {
  username: string;
  displayName: string;
};

export type AuthModalView = 'login' | 'register';

type AuthContextValue = {
  user: AuthUser | null;
  login: (identifier: string, password: string) => boolean;
  logout: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalView: AuthModalView;
  openAuthModal: (view: AuthModalView) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeUsername(id: string): string {
  return id.trim().toLowerCase();
}

function loadStoredUser(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    if (parsed?.username && parsed?.displayName) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() =>
    typeof window !== 'undefined' ? loadStoredUser() : null,
  );

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] =
    useState<AuthModalView>('login');

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (user) setAuthModalOpen(false);
  }, [user]);

  const openAuthModal = useCallback((view: AuthModalView) => {
    setAuthModalView(view);
    setAuthModalOpen(true);
  }, []);

  const login = useCallback((identifier: string, password: string) => {
    const u = normalizeUsername(identifier);
    const expectedUser = DEMO_USER.username.toLowerCase();
    const pwd = password.trim();

    if (u === expectedUser && pwd === DEMO_USER.password) {
      flushSync(() => {
        setUser({
          username: DEMO_USER.username,
          displayName: DEMO_USER.displayName,
        });
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      authModalOpen,
      setAuthModalOpen,
      authModalView,
      openAuthModal,
    }),
    [user, login, logout, authModalOpen, authModalView, openAuthModal],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return ctx;
}
