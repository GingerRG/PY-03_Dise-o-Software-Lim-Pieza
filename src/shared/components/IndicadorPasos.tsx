import { combinarClases } from "../utils/combinarClases";

interface IndicadorPasosProps {
  pasoActual: number;
  totalPasos: number;
  etiquetas: string[];
  className?: string;
}

export function IndicadorPasos({
  pasoActual,
  totalPasos,
  etiquetas,
  className,
}: IndicadorPasosProps) {
  const pasos = Array.from({ length: totalPasos }, (_, indice) => {
    const numeroPaso = indice + 1;

    return {
      numero: numeroPaso,
      etiqueta: etiquetas[indice] ?? `Paso ${numeroPaso}`,
      estaActivo: numeroPaso === pasoActual,
      estaCompletado: numeroPaso < pasoActual,
    };
  });

  return (
    <nav
      className={combinarClases("w-full mb-12", className)}
      aria-label="Progreso de la reserva"
    >
      <ol className="flex items-center justify-center gap-4 overflow-x-auto pb-2">
        {pasos.map((paso) => (
          <li key={paso.numero} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2 min-w-16">
              <div
                aria-current={paso.estaActivo ? "step" : undefined}
                className={combinarClases(
                  `
                    w-10 h-10 rounded-full
                    flex items-center justify-center
                    text-sm font-semibold
                    transition-all duration-300
                  `,
                  paso.estaActivo &&
                    `
                      bg-linear-to-r from-[#4facfe] to-[#00d2ff]
                      text-white scale-110
                      shadow-[0_4px_20px_rgba(79,172,254,0.4)]
                    `,
                  paso.estaCompletado &&
                    `
                      bg-linear-to-r from-[#4facfe] to-[#00d2ff]
                      text-white
                    `,
                  !paso.estaActivo &&
                    !paso.estaCompletado &&
                    `
                      backdrop-blur-xl bg-white/30
                      border border-white/50
                      text-gray-500
                    `
                )}
              >
                {paso.numero}
              </div>

              <span
                className={combinarClases(
                  "text-xs text-center whitespace-nowrap",
                  paso.estaActivo ? "text-gray-800" : "text-gray-500"
                )}
              >
                {paso.etiqueta}
              </span>
            </div>

            {paso.numero < totalPasos && (
              <div
                aria-hidden="true"
                className={combinarClases(
                  "w-12 h-0.5 shrink-0",
                  paso.numero < pasoActual
                    ? "bg-linear-to-r from-[#4facfe] to-[#00d2ff]"
                    : "bg-white/40"
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}