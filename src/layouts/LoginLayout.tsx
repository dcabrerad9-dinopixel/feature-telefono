import { useState, FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import InputText from "../components/InputText";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Ingresar
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputText
              placeholder="Ingresa tu usuario"
              type="text"
              onChange={setUsername}
            />
            <InputText
              placeholder="Ingresa tu contraseña"
              type="password"
              onChange={setPassword}
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 text-white font-medium py-3 px-4 transition-colors duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

