import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { LogIn, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth, type AuthModalView } from '../../context/AuthContext';

const fieldClass =
  'bg-white/5 border-white/15 text-white placeholder:text-white/35 focus-visible:border-primary/50 focus-visible:ring-primary/25';

export type { AuthModalView };

export interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: AuthModalView;
}

export function AuthModal({
  open,
  onOpenChange,
  initialView = 'login',
}: AuthModalProps) {
  const { login: authLogin } = useAuth();
  const [view, setView] = useState<AuthModalView>(initialView);

  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regApellidoPaterno, setRegApellidoPaterno] = useState('');
  const [regApellidoMaterno, setRegApellidoMaterno] = useState('');
  const [regNombre, setRegNombre] = useState('');
  const [regTelefono, setRegTelefono] = useState('');
  const [regDireccion, setRegDireccion] = useState('');
  const [regEdad, setRegEdad] = useState('');
  const [regSexo, setRegSexo] = useState('masculino');

  useEffect(() => {
    if (open) setView(initialView);
  }, [open, initialView]);

  const resetLogin = () => {
    setLoginIdentifier('');
    setLoginPassword('');
  };

  const resetRegister = () => {
    setRegApellidoPaterno('');
    setRegApellidoMaterno('');
    setRegNombre('');
    setRegTelefono('');
    setRegDireccion('');
    setRegEdad('');
    setRegSexo('masculino');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const id = loginIdentifier.trim();
    if (!id) {
      toast.error('Ingresa tu usuario o número de teléfono');
      return;
    }
    if (!loginPassword) {
      toast.error('Ingresa tu contraseña');
      return;
    }

    if (authLogin(id, loginPassword)) {
      toast.success('Bienvenido a tu panel');
      resetLogin();
      onOpenChange(false);
      return;
    }

    toast.error('Usuario o contraseña incorrectos');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regApellidoPaterno.trim() || !regNombre.trim()) {
      toast.error('Nombre y apellido paterno son obligatorios');
      return;
    }
    const phone = regTelefono.replace(/\D/g, '');
    if (phone.length < 10) {
      toast.error('Ingresa un número telefónico válido (mín. 10 dígitos)');
      return;
    }
    if (!regDireccion.trim()) {
      toast.error('Ingresa tu dirección');
      return;
    }
    const edad = parseInt(regEdad, 10);
    if (Number.isNaN(edad) || edad < 14 || edad > 120) {
      toast.error('Indica una edad válida (14 a 120 años)');
      return;
    }
    toast.success('Cuenta registrada (demo). Aquí enviarías los datos al servidor.');
    resetRegister();
    onOpenChange(false);
  };

  const tabBtn = (active: boolean) =>
    `flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
      active
        ? 'bg-gradient-primary text-black shadow-lg shadow-primary/20'
        : 'text-white/60 hover:text-white hover:bg-white/5'
    }`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(92dvh,840px)] w-[calc(100%-1.5rem)] max-w-lg overflow-y-auto border-white/10 bg-zinc-950/95 p-0 text-white shadow-2xl backdrop-blur-xl sm:max-w-xl [&>button]:text-white/70 [&>button]:hover:text-white [&>button]:border-0">
        <div className="border-b border-white/10 p-4 sm:p-5">
          <div className="flex gap-2 rounded-2xl bg-black/40 p-1">
            <button
              type="button"
              className={tabBtn(view === 'login')}
              onClick={() => setView('login')}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <LogIn className="h-4 w-4" />
                Iniciar sesión
              </span>
            </button>
            <button
              type="button"
              className={tabBtn(view === 'register')}
              onClick={() => setView('register')}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <UserPlus className="h-4 w-4" />
                Registro
              </span>
            </button>
          </div>
        </div>

        <div className="px-5 pb-6 pt-2 sm:px-8 sm:pb-8">
          {view === 'login' ? (
            <>
              <DialogHeader className="mb-6 text-left">
                <DialogTitle className="text-xl font-bold text-white sm:text-2xl">
                  Bienvenido de nuevo
                </DialogTitle>
                <DialogDescription className="text-white/55">
                  Usa tu usuario o tu número de teléfono y tu contraseña.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="auth-identifier" className="text-white/80">
                    Usuario o teléfono
                  </Label>
                  <Input
                    id="auth-identifier"
                    autoComplete="username"
                    placeholder="Ej. maria.gomez o 9611234567"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="auth-password" className="text-white/80">
                    Contraseña
                  </Label>
                  <Input
                    id="auth-password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-gradient-primary py-6 text-base font-bold text-black hover:opacity-95"
                >
                  Entrar
                </Button>
                <p className="text-center text-sm text-white/50">
                  ¿Primera vez en Trinity?{' '}
                  <button
                    type="button"
                    className="font-semibold text-primary hover:underline"
                    onClick={() => setView('register')}
                  >
                    Crear cuenta
                  </button>
                </p>
              </form>
            </>
          ) : (
            <>
              <DialogHeader className="mb-5 text-left">
                <DialogTitle className="text-xl font-bold text-white sm:text-2xl">
                  Crea tu cuenta
                </DialogTitle>
                <DialogDescription className="text-white/55">
                  Regístrate con tu número. Solo te tomará un minuto.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="reg-paterno" className="text-white/80">
                      Apellido paterno
                    </Label>
                    <Input
                      id="reg-paterno"
                      autoComplete="family-name"
                      placeholder="Apellido paterno"
                      value={regApellidoPaterno}
                      onChange={(e) => setRegApellidoPaterno(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-materno" className="text-white/80">
                      Apellido materno
                    </Label>
                    <Input
                      id="reg-materno"
                      placeholder="Apellido materno"
                      value={regApellidoMaterno}
                      onChange={(e) => setRegApellidoMaterno(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-nombre" className="text-white/80">
                    Nombre(s)
                  </Label>
                  <Input
                    id="reg-nombre"
                    autoComplete="given-name"
                    placeholder="Nombre(s)"
                    value={regNombre}
                    onChange={(e) => setRegNombre(e.target.value)}
                    className={fieldClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-tel" className="text-white/80">
                    Número telefónico
                  </Label>
                  <Input
                    id="reg-tel"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="10 dígitos"
                    value={regTelefono}
                    onChange={(e) => setRegTelefono(e.target.value)}
                    className={fieldClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-dir" className="text-white/80">
                    Dirección
                  </Label>
                  <Textarea
                    id="reg-dir"
                    rows={3}
                    placeholder="Calle, número, colonia, ciudad…"
                    value={regDireccion}
                    onChange={(e) => setRegDireccion(e.target.value)}
                    className={fieldClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-edad" className="text-white/80">
                    Edad
                  </Label>
                  <Input
                    id="reg-edad"
                    type="number"
                    min={14}
                    max={120}
                    inputMode="numeric"
                    placeholder="Años"
                    value={regEdad}
                    onChange={(e) => setRegEdad(e.target.value)}
                    className={`max-w-[8rem] ${fieldClass}`}
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium text-white/80">Sexo</span>
                  <RadioGroup
                    value={regSexo}
                    onValueChange={setRegSexo}
                    className="flex flex-wrap gap-x-5 gap-y-2 rounded-xl border border-white/10 bg-black/30 p-3"
                  >
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-white/85">
                      <RadioGroupItem
                        value="masculino"
                        id="sex-m"
                        className="border-white/30 text-primary"
                      />
                      Masculino
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-white/85">
                      <RadioGroupItem
                        value="femenino"
                        id="sex-f"
                        className="border-white/30 text-primary"
                      />
                      Femenino
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-white/85">
                      <RadioGroupItem
                        value="otro"
                        id="sex-o"
                        className="border-white/30 text-primary"
                      />
                      Otro
                    </label>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-gradient-primary py-6 text-base font-bold text-black hover:opacity-95"
                >
                  Registrarme
                </Button>
                <p className="text-center text-sm text-white/50">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    type="button"
                    className="font-semibold text-primary hover:underline"
                    onClick={() => setView('login')}
                  >
                    Iniciar sesión
                  </button>
                </p>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
