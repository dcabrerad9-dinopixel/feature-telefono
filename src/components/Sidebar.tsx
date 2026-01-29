import {
  BuildingStorefrontIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  BoltIcon,
  Squares2X2Icon,
  UsersIcon
} from "@heroicons/react/24/outline";
import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import Accordion from "./Accordion";
import { PencilIcon } from "@heroicons/react/24/solid";

interface MenuItem {
  label: string;
  path?: string;
  icon?: ReactElement;
  collapsedIcon?: ReactElement;
  children?: MenuItem[];
}
/*
interface MenuItemNuevo {
  label: string;
  path: string;
  icon?: ReactElement;
  children?: MenuItemNuevo[];
}
*/
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
    {
      label: "Diego",
      path: "/diego",
      icon: <BoltIcon className="w-5 h-5" />,
      collapsedIcon: <BoltIcon className="w-7 h-7" />,
    },
    {
      label: "Componentes",
      path: "/componentes",
      icon: <Squares2X2Icon className="w-5 h-5" />,
      collapsedIcon: <Squares2X2Icon className="w-7 h-7" />,
      children: [
        {
          label: "TextField",
          path: "/componentes/textfield",
          icon: <PencilIcon className="w-5 h-5" />,
        }
      ]
    },
  ];
  /*
    const menuItemsNuevo: MenuItemNuevo[] = [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: <ChartBarIcon className="w-5 h-5" />,
      },
      {
        label: "Usuarios",
        path: "/usuarios",
        icon: <UsersIcon className="w-5 h-5" />,
      },
      {
        label: "Configuración",
        path: "/configuracion",
        icon: <Cog6ToothIcon className="w-5 h-5" />,
      },
      {
        label: "Reportes",
        path: "/reportes",
        icon: <DocumentChartBarIcon className="w-5 h-5" />,
      },
      {
        label: "Componentes",
        path: "/componentes",
        icon: <Squares2X2Icon className="w-5 h-5" />,
        children: [
          {
            label: "TextField",
            path: "/componentes/textfield",
            icon: <PencilIcon className="w-5 h-5" />,
          }
        ]
      },
    ];
  */
  return (
    <aside
      className={`bg-theme-surface border-r border-theme h-full overflow-y-auto transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
        }`}
    >
      <div>
        <Link 
          to="/dashboard" 
          className="p-3 flex items-center gap-2 hover-theme transition-colors duration-200 cursor-pointer"
        >
          <BuildingStorefrontIcon
            className={`transition-all duration-300 ${isCollapsed ? "w-8 h-8 mx-auto" : "w-7 h-7"
              }`}
            style={{ color: "var(--color-text-primary)" }}
          />
          <h2
            className={`text-2xl font-bold text-theme-primary transition-all duration-300 ${isCollapsed
              ? "opacity-0 w-0 overflow-hidden"
              : "opacity-100 delay-300"
              }`}
          >
            Negocio Virtual
          </h2>
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return item.children ? (
              <Accordion
                key={index}
                icon={item.icon}
                collapsedIcon={item.collapsedIcon}
                isCollapsed={isCollapsed}
                defaultOpen={0}
                items={item.children.map((child) => ({
                  title: item.label,
                  content: (
                    <Link
                      key={index}
                      to={child.path!}
                      className={`w-full text-theme-secondary hover-theme transition-colors duration-500 ${isCollapsed
                          ? "flex flex-col items-center justify-center px-2 py-3 gap-1"
                          : "flex items-center gap-3 px-4 py-3 text-left"
                        } ${isActive ? "bg-theme-surface-secondary border-r-2 border-theme-primary" : ""}`}
                    >
                      <span style={{ color: "var(--color-text-secondary)" }}>
                        {child.icon}
                      </span>
                      <span
                        className={`font-medium text-theme-secondary transition-all duration-300 ${isCollapsed ? "text-[10px] opacity-100" : "opacity-100 delay-300"
                          }`}
                      >
                        {child.label}
                      </span>
                    </Link>
                  ),
                }))}
              />
            ) : item.path ? (
              <Link
                key={index}
                to={item.path}
                className={`w-full text-theme-secondary hover-theme transition-colors duration-500 ${isCollapsed
                    ? "flex flex-col items-center justify-center px-2 py-3 gap-1"
                    : "flex items-center gap-3 px-4 py-3 text-left"
                  } ${isActive ? "bg-theme-surface-secondary border-r-2 border-theme-primary" : ""}`}
              >
                <span style={{ color: "var(--color-text-secondary)" }}>
                  {isCollapsed ? item.collapsedIcon : item.icon}
                </span>
                <span
                  className={`font-medium text-theme-secondary transition-all duration-300 ${isCollapsed ? "text-[10px] opacity-100" : "opacity-100 delay-300"
                    }`}
                >
                  {item.label}
                </span>
              </Link>
            ) : null;
          })}
        </nav>

        <hr className="my-4 border-theme" />

        {/*<Menu items={menuItemsNuevo} isCollapsed={isCollapsed} />*/}

        <hr className="my-4 border-theme" />

        {!isCollapsed && (
          <Accordion
            defaultOpen={0}
            items={[
              {
                title: "Ayuda",
                content: (
                  <p>
                    Enlaces a documentación, FAQs y soporte.
                  </p>
                ),
              },
              {
                title: "Atajos",
                content: (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ctrl+K: búsqueda</li>
                    <li>Ctrl+B: toggle sidebar</li>
                  </ul>
                ),
              },
              {
                title: "Componentes",
                content: (
                  <ul className="list-disc list-inside space-y-1">
                    <li>TextField</li>
                    <li>Button</li>
                    <li>Input</li>
                    <li>Select</li>
                    <li>Checkbox</li>
                    <li>Radio</li>
                    <li>Switch</li>
                    <li>DatePicker</li>
                    <li>TimePicker</li>
                  </ul>
                ),
              },
            ]}
          />

        )}

      </div>
    </aside>
  );
};

export default Sidebar;
