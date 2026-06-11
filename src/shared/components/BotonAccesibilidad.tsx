import type { ButtonHTMLAttributes } from "react";
import { combinarClases } from "../utils/combinarClases";

interface BotonAccesibilidadProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  reducirMovimiento: boolean;
  alCambiar: (valor: boolean) => void;
}

export function BotonAccesibilidad({
  reducirMovimiento,
  alCambiar,
  className,
  ...props
}: BotonAccesibilidadProps) {
  const textoBoton = reducirMovimiento
    ? "Animaciones reducidas"
    : "Reducir animaciones";

  const etiquetaAccesible = reducirMovimiento
    ? "Desactivar la reducción de animaciones"
    : "Activar la reducción de animaciones";

  return (
    <button
      type="button"
      aria-pressed={reducirMovimiento}
      aria-label={etiquetaAccesible}
      title={etiquetaAccesible}
      onClick={() => alCambiar(!reducirMovimiento)}
      className={combinarClases(
        `
          fixed bottom-4 right-4 z-50
          px-4 py-3 rounded-full
          backdrop-blur-xl bg-white/70
          border border-white/80
          shadow-lg text-sm text-gray-700
          hover:bg-white/90
          transition-all duration-300
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-[#4facfe]/60
          focus-visible:ring-offset-2
        `,
        className
      )}
      {...props}
    >
      {textoBoton}
    </button>
  );
}