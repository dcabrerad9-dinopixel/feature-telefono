import {
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  FolderIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  UsersIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Container from "../components/Container";
import InputText from "../components/InputText";
import Menu, { MenuItemData } from "../components/Menu";
import TextField from "../components/TextField";

const Componentes = () => {
  const [outlinedValue, setOutlinedValue] = useState("");
  const [filledValue, setFilledValue] = useState("");
  const [standardValue, setStandardValue] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [multilineValue, setMultilineValue] = useState("");
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  // Ejemplo de datos para el menú jerárquico
  const menuItems: MenuItemData[] = [
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
      children: [
        {
          label: "Lista de Usuarios",
          path: "/usuarios/lista",
        },
        {
          label: "Permisos",
          path: "/usuarios/permisos",
          children: [
            {
              label: "Roles",
              path: "/usuarios/permisos/roles",
            },
            {
              label: "Permisos Avanzados",
              path: "/usuarios/permisos/avanzados",
            },
          ],
        },
        {
          label: "Grupos",
          path: "/usuarios/grupos",
        },
      ],
    },
    {
      label: "Configuración",
      path: "/configuracion",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      collapsedIcon: <Cog6ToothIcon className="w-7 h-7" />,
      children: [
        {
          label: "General",
          path: "/configuracion/general",
        },
        {
          label: "Seguridad",
          path: "/configuracion/seguridad",
          icon: <ShieldCheckIcon className="w-5 h-5" />,
        },
        {
          label: "Archivos",
          path: "/configuracion/archivos",
          icon: <FolderIcon className="w-5 h-5" />,
        },
      ],
    },
    {
      label: "Reportes",
      path: "/reportes",
      icon: <DocumentChartBarIcon className="w-5 h-5" />,
      collapsedIcon: <DocumentChartBarIcon className="w-7 h-7" />,
      children: [
        {
          label: "Reportes Generales",
          path: "/reportes/generales",
        },
        {
          label: "Reportes Personalizados",
          path: "/reportes/personalizados",
        },
      ],
    },
    {
      label: "Componentes",
      path: "/componentes",
      icon: <Squares2X2Icon className="w-5 h-5" />,
      collapsedIcon: <Squares2X2Icon className="w-7 h-7" />,
    },
  ];

  return (
    <Container title="Componentes" path="home / componentes">
      <div className="space-y-8 p-6">
        <div>
          <h1 className="text-2xl font-bold text-theme-primary mb-4">Input Simple</h1>
          <InputText placeholder="Ingresa tu nombre" type="text" onChange={() => {}} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-theme-primary mb-4">TextField - Variantes</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-theme-secondary mb-2">Outlined (por defecto)</h2>
              <TextField
                label="Outlined"
                variant="outlined"
                value={outlinedValue}
                onChange={(e) => setOutlinedValue(e.target.value)}
                placeholder="Ingresa texto"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-theme-secondary mb-2">Filled</h2>
              <TextField
                label="Filled"
                variant="filled"
                value={filledValue}
                onChange={(e) => setFilledValue(e.target.value)}
                placeholder="Ingresa texto"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-theme-secondary mb-2">Standard</h2>
              <TextField
                label="Standard"
                variant="standard"
                value={standardValue}
                onChange={(e) => setStandardValue(e.target.value)}
                placeholder="Ingresa texto"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-theme-primary mb-4">TextField - Estados</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-theme-secondary mb-2">Required</h2>
              <TextField
                label="Required"
                variant="outlined"
                required
                placeholder="Campo obligatorio"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-theme-secondary mb-2">Disabled</h2>
              <TextField
                label="Disabled"
                variant="outlined"
                disabled
                defaultValue="Valor deshabilitado"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-theme-secondary mb-2">Error</h2>
              <TextField
                label="Error"
                variant="outlined"
                error
                helperText="Este campo tiene un error"
                value={errorValue}
                onChange={(e) => setErrorValue(e.target.value)}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-theme-secondary mb-2">Password (con toggle automático)</h2>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                helperText="Haz clic en el icono del ojo para mostrar/ocultar la contraseña"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-theme-secondary mb-2">Password sin toggle</h2>
              <TextField
                label="Password sin toggle"
                variant="outlined"
                type="password"
                showPasswordToggle={false}
                helperText="Toggle desactivado con showPasswordToggle={false}"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-theme-secondary mb-2">Read Only</h2>
              <TextField
                label="Read Only"
                variant="outlined"
                readOnly
                defaultValue="Solo lectura"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-theme-primary mb-4">TextField - Multiline</h1>
          <div className="space-y-4">
            <div>
              <TextField
                label="Multiline"
                variant="outlined"
                multiline
                rows={4}
                value={multilineValue}
                onChange={(e) => setMultilineValue(e.target.value)}
                placeholder="Escribe varias líneas..."
              />
            </div>

            <div>
              <TextField
                label="Multiline con min/max rows"
                variant="outlined"
                multiline
                minRows={3}
                maxRows={6}
                placeholder="Se expande automáticamente"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-theme-primary mb-4">TextField - Tamaños</h1>
          <div className="space-y-4">
            <div>
              <TextField
                label="Small"
                variant="outlined"
                size="small"
                placeholder="Tamaño pequeño"
              />
            </div>

            <div>
              <TextField
                label="Medium (por defecto)"
                variant="outlined"
                size="medium"
                placeholder="Tamaño mediano"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-theme-primary mb-4">TextField - Full Width</h1>
          <TextField
            label="Full Width"
            variant="outlined"
            fullWidth
            placeholder="Ocupa todo el ancho disponible"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-theme-primary mb-4">Menu - Jerarquía de Menús</h1>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-lg font-semibold text-theme-secondary">Menú Expandido</h2>
                <button
                  onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
                  className="px-4 py-2 bg-theme-primary text-theme-inverse rounded hover-theme-primary-hover transition-colors"
                >
                  {isMenuCollapsed ? "Expandir" : "Colapsar"}
                </button>
              </div>
              <div className="border border-theme rounded-lg p-4 bg-theme-surface">
                <aside
                  className={`bg-theme-surface border-r border-theme transition-all duration-300 ${
                    isMenuCollapsed ? "w-20" : "w-64"
                  }`}
                >
                  <Menu items={menuItems} isCollapsed={isMenuCollapsed} />
                </aside>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-theme-secondary mb-2">Características</h2>
              <ul className="list-disc list-inside space-y-1 text-theme-secondary ml-4">
                <li>Soporta múltiples niveles de submenús (jerarquía anidada)</li>
                <li>Expandir/colapsar submenús con animaciones suaves</li>
                <li>Indicadores visuales de items activos</li>
                <li>Detección automática de padres activos cuando un hijo está activo</li>
                <li>Compatible con React Router</li>
                <li>Adaptable al modo colapsado del sidebar</li>
                <li>Soporte para iconos en cualquier nivel</li>
                <li>Indentación automática para submenús</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-theme-secondary mb-2">Ejemplo de Estructura</h2>
              <pre className="bg-theme-surface-secondary p-4 rounded-lg border border-theme overflow-x-auto text-sm text-theme-secondary">
{`const menuItems: MenuItemData[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <ChartBarIcon />,
  },
  {
    label: "Usuarios",
    path: "/usuarios",
    icon: <UsersIcon />,
    children: [
      {
        label: "Lista",
        path: "/usuarios/lista",
      },
      {
        label: "Permisos",
        path: "/usuarios/permisos",
        children: [
          {
            label: "Roles",
            path: "/usuarios/permisos/roles",
          },
        ],
      },
    ],
  },
];`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Componentes;