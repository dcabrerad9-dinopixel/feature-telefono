import { FormEvent, useState } from "react";
import TextField from "../components/TextField";
import { useAuth } from "../hooks/useAuth";

const LoginLayout = () => {
  const { login, saveUser } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) {
      login();
      saveUser(username);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-theme-surface rounded-2xl shadow-lg p-8 border border-theme">
          <h1 className="text-4xl font-bold text-theme-primary mb-8 text-center">
            Ingresar
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              label="Usuario"
              variant="outlined"
              placeholder="Ingresa tu usuario"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              placeholder="Ingresa tu contraseña"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-theme-primary text-theme-inverse font-medium py-3 px-4 transition-colors duration-200 bg-theme-primary-hover focus-theme disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!username || !password}
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
