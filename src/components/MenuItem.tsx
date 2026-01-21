import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export interface MenuItemData {
  label: string;
  path?: string;
  icon?: ReactElement;
  collapsedIcon?: ReactElement;
  children?: MenuItemData[];
}

interface MenuItemProps {
  item: MenuItemData;
  isCollapsed: boolean;
  level?: number;
  isExpanded?: boolean;
  onToggle?: (itemPath: string | undefined) => void;
}

const MenuItem = ({ 
  item, 
  isCollapsed, 
  level = 0, 
  isExpanded = false, 
  onToggle 
}: MenuItemProps) => {
  const location = useLocation();

  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.path ? location.pathname === item.path : false;
  const isParentActive = hasChildren
    ? item.children?.some((child) => {
        if (child.path) {
          return location.pathname === child.path;
        }
        return child.children?.some((grandchild) => grandchild.path === location.pathname);
      })
    : false;

  const handleToggle = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (hasChildren && onToggle) {
      onToggle(item.path);
    }
  };

  const itemContent = (
    <div
      className={`w-full flex items-center gap-3 transition-colors duration-200 ${
        isCollapsed
          ? "flex-col items-center justify-center px-2 py-3 gap-1"
          : "px-4 py-3 text-left"
      } ${
        (isActive || isParentActive) && !isCollapsed
          ? "bg-theme-surface-secondary border-r-2 border-theme-primary"
          : ""
      } hover-theme`}
      style={{
        paddingLeft: !isCollapsed && level > 0 ? `${1 + level * 1.5}rem` : undefined,
      }}
    >
      <span
        className={`flex items-center ${isCollapsed ? "w-full justify-center" : ""}`}
        style={{ color: "var(--color-text-secondary)" }}
      >
        {isCollapsed ? item.collapsedIcon || item.icon : item.icon}
      </span>

      {!isCollapsed && (
        <>
          <span
            className={`flex-1 font-medium text-theme-secondary transition-all duration-300 ${
              isActive ? "text-theme-primary" : ""
            }`}
          >
            {item.label}
          </span>

          {hasChildren && (
            <button
              onClick={handleToggle}
              className="flex items-center justify-center p-1 rounded hover-theme transition-transform duration-200"
              aria-label={isExpanded ? "Colapsar" : "Expandir"}
            >
              {isExpanded ? (
                <ChevronDownIcon className="w-4 h-4 text-theme-secondary" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 text-theme-secondary" />
              )}
            </button>
          )}
        </>
      )}
    </div>
  );

  // Cuando está colapsado y tiene hijos, mostrar solo el link principal si tiene path
  if (isCollapsed && hasChildren && item.path) {
    return (
      <Link to={item.path} className="block">
        {itemContent}
      </Link>
    );
  }

  // Cuando está colapsado y no tiene hijos pero tiene path
  if (isCollapsed && !hasChildren && item.path) {
    return (
      <Link to={item.path} className="block">
        {itemContent}
      </Link>
    );
  }

  // Cuando está colapsado y no tiene path (solo icono)
  if (isCollapsed) {
    return <div>{itemContent}</div>;
  }

  // Lógica para cuando NO está colapsado
  return (
    <div>
      {item.path && !hasChildren ? (
        // Item simple con path
        <Link to={item.path} className="block">
          {itemContent}
        </Link>
      ) : hasChildren && !item.path ? (
        // Item con hijos pero sin path (solo expande)
        <div
          onClick={handleToggle}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleToggle(e);
            }
          }}
        >
          {itemContent}
        </div>
      ) : hasChildren && item.path ? (
        // Item con hijos Y path (expande al hacer clic)
        <div
          onClick={handleToggle}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleToggle(e);
            }
          }}
        >
          {itemContent}
        </div>
      ) : (
        // Item sin hijos ni path (solo texto)
        itemContent
      )}

      {/* Submenús (solo cuando no está colapsado) */}
      {hasChildren && !isCollapsed && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pl-0">
            {item.children?.map((child, index) => (
              <MenuItem
                key={index}
                item={child}
                isCollapsed={isCollapsed}
                level={level + 1}
                isExpanded={onToggle ? isExpanded : false}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
