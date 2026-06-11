import type { ReactNode } from "react";
import { motion } from "motion/react";
import { combinarClases } from "../utils/combinarClases";

interface TarjetaServicioProps {
  icon: ReactNode;
  titulo: string;
  descripcion: string;
  onClick?: () => void;
  seleccionado?: boolean;
  className?: string;
}

export function TarjetaServicio({
  icon,
  titulo,
  descripcion,
  onClick,
  seleccionado = false,
  className,
}: TarjetaServicioProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      aria-pressed={seleccionado}
      className={combinarClases(
        `
          w-full p-6 cursor-pointer
          backdrop-blur-2xl border-2 rounded-2xl
          transition-all duration-300
          text-left
          shadow-[0_8px_32px_rgba(31,38,135,0.15),inset_0_1px_2px_rgba(255,255,255,0.3)]
          hover:shadow-[0_12px_40px_rgba(31,38,135,0.2),inset_0_2px_4px_rgba(255,255,255,0.4)]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#4facfe]/60
          focus-visible:ring-offset-2
        `,
        seleccionado
          ? `
              bg-white/20 border-[#4facfe]
              shadow-[0_12px_40px_rgba(79,172,254,0.3),inset_0_2px_4px_rgba(255,255,255,0.5)]
            `
          : "bg-white/10 border-white/30 hover:bg-white/15",
        className
      )}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <motion.div
          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.5 }}
          className="text-[#4facfe]"
          aria-hidden="true"
        >
          {icon}
        </motion.div>

        <div>
          <h3 className="mb-2 text-gray-800">{titulo}</h3>
          <p className="text-sm text-gray-600">{descripcion}</p>
        </div>
      </div>
    </motion.button>
  );
}