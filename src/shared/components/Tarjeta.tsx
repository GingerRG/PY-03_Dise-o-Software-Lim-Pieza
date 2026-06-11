import type { KeyboardEvent, ReactNode } from "react";
import { combinarClases } from "../utils/combinarClases";

interface TarjetaProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Tarjeta({
  children,
  className,
  hover = false,
  onClick,
}: TarjetaProps) {
  const esInteractiva = Boolean(onClick);

  function manejarTeclado(evento: KeyboardEvent<HTMLDivElement>) {
    if (!onClick) return;

    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      onClick();
    }
  }

  return (
    <div
      role={esInteractiva ? "button" : undefined}
      tabIndex={esInteractiva ? 0 : undefined}
      onClick={onClick}
      onKeyDown={manejarTeclado}
      className={combinarClases(
        `
          backdrop-blur-xl bg-white/25
          border border-white/40
          rounded-2xl
          shadow-[0_8px_32px_rgba(31,38,135,0.15)]
          transition-all duration-300
        `,
        hover &&
          `
            hover:bg-white/35
            hover:shadow-[0_12px_40px_rgba(31,38,135,0.2)]
            hover:-translate-y-1
          `,
        esInteractiva &&
          `
            cursor-pointer
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#4facfe]/60
            focus-visible:ring-offset-2
          `,
        className
      )}
    >
      {children}
    </div>
  );
}