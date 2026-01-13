import {
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import { ReactElement } from "react";

interface MenuItem {
  label: string;
  icon?: ReactElement;
  onClick?: () => void;
}

const Sidebar = () => {
  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <ChartBarIcon className="w-5 h-5" />,
      onClick: () => console.log("Dashboard"),
    },
    {
      label: "Usuarios",
      icon: <UsersIcon className="w-5 h-5" />,
      onClick: () => console.log("Usuarios"),
    },
    {
      label: "Configuración",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      onClick: () => console.log("Configuración"),
    },
    {
      label: "Reportes",
      icon: <DocumentChartBarIcon className="w-5 h-5" />,
      onClick: () => console.log("Reportes"),
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div>
        <div className="mb-2 p-4 flex items-center gap-2">
          <BuildingStorefrontIcon className="w-7 h-7" />
          <h2 className="text-2xl font-bold text-gray-900">Negocio Virtual</h2>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-500"
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
