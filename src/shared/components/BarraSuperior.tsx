import { NavLink } from "react-router";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

import { enlacesNavegacion } from "../constants/navegacion";
import { combinarClases } from "../utils/combinarClases";

const enlacesBarra = enlacesNavegacion.filter(
  (enlace) => enlace.mostrarEnBarra
);

export function BarraSuperior() {
  return (
    <motion.nav
      className="
        fixed top-4 left-4 z-50 group
        w-[58px] hover:w-[500px] focus-within:w-[500px]
        max-w-[calc(100vw-2rem)]
        overflow-hidden
        transition-all duration-500 ease-in-out
      "
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-label="Menú principal"
    >
      <div
        className="
          h-[64px] px-4
          backdrop-blur-2xl bg-white/20
          border-2 border-white/40
          rounded-2xl
          shadow-[0_8px_32px_rgba(31,38,135,0.15),inset_0_1px_2px_rgba(255,255,255,0.3)]
          flex items-center gap-4
          whitespace-nowrap
        "
      >
        <NavLink
          to="/"
          aria-label="Ir a inicio"
          className="
            flex items-center justify-center min-w-[28px]
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-[#4facfe]/60
            focus-visible:ring-offset-2 rounded-lg
          "
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-7 h-7 text-[#4facfe]" />
          </motion.div>
        </NavLink>

        <div
          className="
            flex items-center gap-3
            opacity-0 translate-x-[-12px]
            group-hover:opacity-100 group-hover:translate-x-0
            group-focus-within:opacity-100 group-focus-within:translate-x-0
            transition-all duration-500 ease-in-out
          "
        >
          <span className="text-xl text-gray-800 font-medium">Lim-Pieza</span>

          {enlacesBarra.map((enlace) => (
            <NavLink
              key={enlace.ruta}
              to={enlace.ruta}
              end={enlace.ruta === "/"}
              className={({ isActive }) =>
                combinarClases(
                  `
                    px-3 py-2 rounded-lg
                    backdrop-blur-xl
                    border border-white/40
                    text-gray-700
                    hover:bg-white/35 hover:text-gray-800
                    transition-all hover:scale-105 active:scale-95
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-[#4facfe]/60
                    focus-visible:ring-offset-2
                  `,
                  isActive
                    ? "bg-white/40 text-gray-900"
                    : "bg-white/20"
                )
              }
            >
              {enlace.etiqueta}
            </NavLink>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}