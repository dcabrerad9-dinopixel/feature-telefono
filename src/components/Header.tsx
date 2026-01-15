import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import {
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Obtener iniciales del usuario para el avatar
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-theme-surface border-b border-theme">
      <div className="px-4">
        <div className="flex justify-between items-center h-14">
          {/* Botón para ocultar menú */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-theme-secondary hover-theme hover-theme-text transition-colors duration-200"
            aria-label="Ocultar menú"
          >
            <Bars3Icon className="w-7 h-7" style={{ color: 'var(--color-text-secondary)' }} />
          </button>

          {/* Contenedor de botones derecho */}
          <div className="flex items-center gap-2">
            {/* Botón para cambiar tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-theme-secondary hover-theme hover-theme-text transition-colors duration-200"
              aria-label={theme === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"}
            >
              {theme === "light" ? (
                <MoonIcon className="w-6 h-6" style={{ color: 'var(--color-text-secondary)' }} />
              ) : (
                <SunIcon className="w-6 h-6" style={{ color: 'var(--color-text-secondary)' }} />
              )}
            </button>

            {/* Avatar con dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover-theme transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-theme-avatar flex items-center justify-center text-sm font-medium">
                {getInitials(user)}
              </div>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-theme-surface rounded-lg shadow-lg border border-theme py-2 z-50">
                <div className="px-4 py-3 border-b border-theme flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-theme-avatar flex items-center justify-center text-sm font-medium">
                    {getInitials(user)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-theme-primary">
                      {user || "Usuario"}
                    </p>
                    <p className="text-xs text-theme-muted">Usuario</p>
                  </div>
                </div>
                <div className="py-1">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-theme-secondary hover-theme transition-colors duration-200"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;