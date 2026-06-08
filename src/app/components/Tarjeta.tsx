import { ReactNode } from "react";

interface TarjetaProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Tarjeta({ children, className = "", hover = false, onClick }: TarjetaProps) {
  return (
    <div
      onClick={onClick}
      className={`
        backdrop-blur-xl bg-white/25
        border border-white/40
        rounded-2xl
        shadow-[0_8px_32px_rgba(31,38,135,0.15)]
        transition-all duration-300
        ${hover ? "hover:bg-white/35 hover:shadow-[0_12px_40px_rgba(31,38,135,0.2)] hover:-translate-y-1 cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
