import type { ButtonHTMLAttributes, ReactNode } from "react";
import { combinarClases } from "../utils/combinarClases";

type VarianteBoton = "principal" | "secundario" | "simple";

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variante?: VarianteBoton;
}

const estilosBase = `
  inline-flex items-center justify-center gap-2
  px-6 py-3 rounded-xl
  transition-all duration-300
  disabled:opacity-50 disabled:cursor-not-allowed
  disabled:hover:scale-100
  focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-[#4facfe]/60
  focus-visible:ring-offset-2
`;

const estilosPorVariante: Record<VarianteBoton, string> = {
  principal: `
    relative overflow-hidden
    backdrop-blur-2xl
    bg-gradient-to-br from-[#4facfe]/35 via-[#00d2ff]/25 to-[#4facfe]/30
    border-2 border-white/70
    text-gray-800 font-semibold
    shadow-[0_8px_32px_rgba(79,172,254,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)]
    hover:from-[#4facfe]/50 hover:via-[#00d2ff]/40 hover:to-[#4facfe]/45
    hover:shadow-[0_12px_40px_rgba(79,172,254,0.6),inset_0_2px_4px_rgba(255,255,255,0.6)]
    hover:scale-105 hover:border-white/80
    active:scale-95
    before:content-[''] before:absolute before:inset-0
    before:bg-gradient-to-tr before:from-white/30 before:via-transparent before:to-white/20
    before:opacity-0 hover:before:opacity-100
    before:transition-opacity before:duration-300
    after:content-[''] after:absolute after:inset-0 after:rounded-xl
    after:bg-gradient-to-b after:from-white/20 after:to-transparent after:pointer-events-none
  `,

  secundario: `
    relative overflow-hidden
    backdrop-blur-2xl bg-white/25
    border-2 border-white/60
    text-gray-700 font-medium
    shadow-[0_4px_24px_rgba(255,255,255,0.3),inset_0_1px_2px_rgba(255,255,255,0.4)]
    hover:bg-white/35
    hover:shadow-[0_8px_32px_rgba(255,255,255,0.4),inset_0_2px_4px_rgba(255,255,255,0.5)]
    hover:border-white/70
    hover:scale-[1.02]
    active:scale-95
    before:content-[''] before:absolute before:inset-0
    before:bg-gradient-to-tr before:from-white/40 before:via-transparent before:to-white/30
    before:opacity-0 hover:before:opacity-100
    before:transition-opacity before:duration-300
    after:content-[''] after:absolute after:inset-0 after:rounded-xl
    after:bg-gradient-to-b after:from-white/15 after:to-transparent after:pointer-events-none
  `,

  simple: `
    text-gray-600 font-medium
    hover:bg-white/25
    backdrop-blur-xl
    hover:shadow-[0_4px_16px_rgba(255,255,255,0.2)]
    border border-transparent hover:border-white/40
    active:scale-95
  `,
};

export function Boton({
  children,
  variante = "principal",
  className,
  type = "button",
  ...props
}: BotonProps) {
  return (
    <button
      type={type}
      className={combinarClases(
        estilosBase,
        estilosPorVariante[variante],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}