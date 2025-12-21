import { useState } from "react";
import InputText from "./components/InputText";
import LoginLayout from "./layouts/LoginLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");

  const handleLogin = () => {
    // Validación simple - puedes mejorarla según necesites
    if (username.trim() && password.trim()) {
      setIsLoggedIn(true);
    } else {
      alert("Por favor ingresa usuario y contraseña");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Limpiar los campos al cerrar sesión
    setUsername("");
    setPassword("");
    setTelefono("");
  };

  // Si está logueado, mostrar Dashboard
  if (isLoggedIn) {
    return (
      <DashboardLayout onLogout={handleLogout}>
        <Dashboard />
      </DashboardLayout>
    );
  }

  // Si no está logueado, mostrar formulario de login
  return (
    <LoginLayout>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#000000', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>
            Formulario
          </h1>
          <p style={{ color: '#666666', fontSize: '0.95rem', margin: 0 }}>
            Ingresa tus datos
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
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
          <InputText
            placeholder="Ingresa tu teléfono"
            type="tel"
            onChange={setTelefono}
          />
        </div>

        <button 
          onClick={handleLogin}
          style={{
            width: '100%',
            backgroundColor: '#1f2937',
            color: '#ffffff',
            fontWeight: '600',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.2s',
            marginBottom: '1.5rem'
          }} 
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#374151'} 
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
        >
          Iniciar Sesión
        </button>
    </LoginLayout>
  );
};

export default App;
