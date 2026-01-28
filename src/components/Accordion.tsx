import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react";

export interface AccordionItemProps {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItemProps[];
  /** Índice del ítem abierto por defecto. -1 = ninguno. */
  defaultOpen?: number;
  className?: string;
}

/**
 * Acordeón simple: un solo panel abierto a la vez.
 * Estilos con Tailwind y clases del tema.
 */
const Accordion = ({
  items,
  defaultOpen = -1,
  className = "",
}: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div
      className={`overflow-hidden bg-theme-surface ${className}`}
      role="region"
      aria-label="Acordeón"
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const id = `accordion-${index}`;
        const panelId = `accordion-panel-${index}`;

        return (
          <div
            key={index}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              id={id}
              className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-theme-secondary hover-theme transition-colors duration-200 focus:outline-none"
            >
              <span className="font-medium">{item.title}</span>
              {isOpen ? (
                <ChevronRightIcon className="h-4 w-4 shrink-0 transition-transform duration-200 text-theme-secondary" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200 text-theme-secondary" />
              )}
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={id}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 py-3 text-sm text-theme-secondary">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
