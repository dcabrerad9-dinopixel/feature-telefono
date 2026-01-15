import { useState, useEffect } from "react";
import InputText from "../components/InputText";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Detectar tamaño de pantalla y colapsar automáticamente en md o menor
  useEffect(() => {
    const checkScreenSize = () => {
      // md breakpoint en Tailwind es 768px
      const isMdOrSmaller = window.innerWidth < 1200;
      setIsSidebarCollapsed(isMdOrSmaller);
    };

    // Verificar al montar el componente
    checkScreenSize();

    // Agregar listener para cambios de tamaño
    window.addEventListener("resize", checkScreenSize);

    // Limpiar listener al desmontar
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="h-screen bg-theme-background flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} />

      {/* Contenido Principal con Header */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
          <div className="bg-theme-surface rounded-lg shadow-sm border border-theme p-6">
          <h2 className="text-xl font-semibold text-theme-primary mb-4">
            Bienvenido al Dashboard {user}
          </h2>
          <p className="text-theme-secondary">
            Has iniciado sesión correctamente. Este es el contenido principal
            del dashboard.
          </p>
          <br />

          <h2 className="text-lg font-semibold text-theme-primary mb-4">
            Componentes
          </h2>
          <h3 className="text-md font-semibold text-theme-primary mb-4">
            InputText
          </h3>
          <InputText
            placeholder="Ingresa tu usuario"
            type="text"
            onChange={() => {}}
          />

          <hr className="my-4" style={{ borderColor: 'var(--color-border)' }}/>

          <div className="grid grid-flow-col grid-rows-3 gap-4 border border-theme rounded-lg p-4">
            <div className="row-span-3 bg-theme-surface-secondary p-4">
              <InputText
                placeholder="Ingresa tu usuario"
                type="text"
                onChange={() => {}}
              />
            </div>
            <div className="col-span-2">
              <InputText
                placeholder="Ingresa tu usuario"
                type="text"
                onChange={() => {}}
              />
            </div>
            <div className="col-span-2 row-span-2">
              <InputText
                placeholder="Ingresa tu usuario"
                type="text"
                onChange={() => {}}
              />
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

