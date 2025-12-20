import { useState } from "react";
import "./App.css";
import InputText from "./components/InputText";

const App = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  
  return (
    <div className="container">
      <h1 style={{ color: "black" }}>Formulario</h1>
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
      <button>Submit</button>
      <p style={{ color: "black" }}>
        Usuario: {username} <br /> Contraseña: {password} <br /> Teléfono: {telefono}
      </p>
    </div>
  );
};

export default App;
