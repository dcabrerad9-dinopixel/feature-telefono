import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuItem, { MenuItemData } from "./MenuItem";

interface MenuProps {
  items: MenuItemData[];
  isCollapsed: boolean;
}

// Función helper para encontrar todos los paths padres de una ruta
const findAllParentPaths = (items: MenuItemData[], targetPath: string): string[] => {
  const parentPaths: string[] = [];
  
  // Función recursiva para buscar el path y rastrear sus padres
  const findPath = (items: MenuItemData[], currentParentPath: string | null = null): boolean => {
    for (const item of items) {
      // Si encontramos el path objetivo
      if (item.path === targetPath) {
        // Agregar el path padre si existe
        if (currentParentPath) {
          parentPaths.push(currentParentPath);
        }
        return true;
      }
      
      // Si este item tiene hijos, buscar recursivamente
      if (item.children) {
        // El path padre para los hijos será el path de este item (si existe) o el padre actual
        const nextParentPath = item.path || currentParentPath;
        if (findPath(item.children, nextParentPath)) {
          // Si encontramos el path en los hijos, agregar este item como padre si tiene path
          if (item.path && !parentPaths.includes(item.path)) {
            parentPaths.push(item.path);
          }
          return true;
        }
      }
    }
    return false;
  };
  
  findPath(items);
  return parentPaths;
};

/**
 * Componente Menu que maneja una jerarquía de menús con submenús
 * 
 * @param items - Array de items del menú con estructura jerárquica
 * @param isCollapsed - Indica si el menú está colapsado
 * 
 * @example
 * const menuItems = [
 *   {
 *     label: "Dashboard",
 *     path: "/dashboard",
 *     icon: <ChartBarIcon />,
 *   },
 *   {
 *     label: "Configuración",
 *     path: "/configuracion",
 *     icon: <CogIcon />,
 *     children: [
 *       {
 *         label: "General",
 *         path: "/configuracion/general",
 *       },
 *       {
 *         label: "Avanzado",
 *         path: "/configuracion/avanzado",
 *       },
 *     ],
 *   },
 * ];
 * 
 * <Menu items={menuItems} isCollapsed={false} />
 */
const Menu = ({ items, isCollapsed }: MenuProps) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Cuando cambia la ruta, expandir solo los menús relevantes y colapsar los demás
  useEffect(() => {
    if (isCollapsed) return;

    const currentPath = location.pathname;
    const parentPaths = findAllParentPaths(items, currentPath);
    
    // Crear un nuevo Set con solo los paths padres de la ruta actual
    const newExpandedItems = new Set<string>(parentPaths);
    
    // También incluir el path actual si tiene hijos (es decir, si es un menú con submenús)
    const checkIfPathHasChildren = (items: MenuItemData[], targetPath: string): boolean => {
      for (const item of items) {
        if (item.path === targetPath && item.children && item.children.length > 0) {
          return true;
        }
        if (item.children) {
          if (checkIfPathHasChildren(item.children, targetPath)) {
            return true;
          }
        }
      }
      return false;
    };
    
    if (checkIfPathHasChildren(items, currentPath)) {
      newExpandedItems.add(currentPath);
    }
    
    setExpandedItems(newExpandedItems);
  }, [location.pathname, items, isCollapsed]);

  // Función helper para obtener todos los paths del nivel principal (nivel 0)
  const getTopLevelPaths = (items: MenuItemData[]): string[] => {
    const paths: string[] = [];
    items.forEach((item) => {
      if (item.path) {
        paths.push(item.path);
      }
    });
    return paths;
  };

  const handleToggle = (itemPath: string | undefined) => {
    if (!itemPath) return;
    
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      
      // Si el item ya está expandido, colapsarlo
      if (newSet.has(itemPath)) {
        newSet.delete(itemPath);
        return newSet;
      }
      
      // Si el item no está expandido, expandirlo
      // Primero, obtener todos los paths del nivel principal
      const topLevelPaths = getTopLevelPaths(items);
      
      // Si el item está en el nivel principal, colapsar todos los demás del nivel principal
      if (topLevelPaths.includes(itemPath)) {
        // Remover todos los paths del nivel principal excepto el que se está expandiendo
        topLevelPaths.forEach((path) => {
          if (path !== itemPath) {
            newSet.delete(path);
          }
        });
      }
      
      // Expandir el item seleccionado
      newSet.add(itemPath);
      
      return newSet;
    });
  };

  const isExpanded = (itemPath: string | undefined): boolean => {
    if (!itemPath) return false;
    return expandedItems.has(itemPath);
  };

  return (
    <nav className="space-y-1">
      {items.map((item, index) => (
        <MenuItem
          key={index}
          item={item}
          isCollapsed={isCollapsed}
          level={0}
          isExpanded={isExpanded(item.path)}
          onToggle={handleToggle}
        />
      ))}
    </nav>
  );
};

export default Menu;
export type { MenuItemData };
