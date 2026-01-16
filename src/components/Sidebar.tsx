import {
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
  label: string;
  path: string;
  icon?: ReactElement;
  collapsedIcon?: ReactElement;
}

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <ChartBarIcon className="w-5 h-5" />,
      collapsedIcon: <ChartBarIcon className="w-7 h-7" />,
    },
    {
      label: "Usuarios",
      path: "/usuarios",
      icon: <UsersIcon className="w-5 h-5" />,
      collapsedIcon: <UsersIcon className="w-7 h-7" />,
    },
    {
      label: "Configuración",
      path: "/configuracion",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      collapsedIcon: <Cog6ToothIcon className="w-7 h-7" />,
    },
    {
      label: "Reportes",
      path: "/reportes",
      icon: <DocumentChartBarIcon className="w-5 h-5" />,
      collapsedIcon: <DocumentChartBarIcon className="w-7 h-7" />,
    },
  ];

  return (
    <aside
      className={`bg-theme-surface border-r border-theme h-full overflow-y-auto transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        <div className="p-3 flex items-center gap-2">
          <BuildingStorefrontIcon
            className={`transition-all duration-300 ${
              isCollapsed ? "w-8 h-8 mx-auto" : "w-7 h-7"
            }`}
            style={{ color: "var(--color-text-primary)" }}
          />
          <h2
            className={`text-2xl font-bold text-theme-primary transition-all duration-300 ${
              isCollapsed
                ? "opacity-0 w-0 overflow-hidden"
                : "opacity-100 delay-300"
            }`}
          >
            Negocio Virtual
          </h2>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;          
            return (
              <Link
                key={index}
                to={item.path}
                className={`w-full text-theme-secondary hover-theme transition-colors duration-500 ${
                  isCollapsed
                    ? "flex flex-col items-center justify-center px-2 py-3 gap-1"
                    : "flex items-center gap-3 px-4 py-3 text-left"
                } ${
                  isActive ? "bg-theme-primary/10 border-r-2 border-theme-primary" : ""
                }`}
              >
                <span style={{ color: "var(--color-text-secondary)" }}>
                  {isCollapsed ? item.collapsedIcon : item.icon}
                </span>
                <span
                  className={`font-medium text-theme-secondary transition-all duration-300 ${
                    isCollapsed
                      ? "text-[10px] opacity-100"
                      : "opacity-100 delay-300"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
