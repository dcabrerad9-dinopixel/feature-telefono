import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

const DashboardLayout = ({ children, onLogout }: DashboardLayoutProps) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#1a1a1a",
        padding: "2rem",
      }}
    >
      {/* Header con título y botón de cerrar sesión */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          Dashboard
        </h1>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: "#374151",
            color: "#ffffff",
            fontWeight: "600",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#4b5563";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#374151";
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Contenedor principal blanco */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "2rem",
          minHeight: "calc(100vh - 120px)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

