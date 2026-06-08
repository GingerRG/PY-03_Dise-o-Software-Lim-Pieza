interface IndicadorPasosProps {
  pasoActual: number;
  totalPasos: number;
  etiquetas: string[];
}

export function IndicadorPasos({ pasoActual, totalPasos, etiquetas }: IndicadorPasosProps) {
  return (
    <div className="w-full mb-12">
      <div className="flex items-center justify-center gap-4">
        {Array.from({ length: totalPasos }).map((_, indice) => {
          const numeroPaso = indice + 1;
          const estaActivo = numeroPaso === pasoActual;
          const estaCompletado = numeroPaso < pasoActual;

          return (
            <div key={numeroPaso} className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${estaActivo ? "bg-gradient-to-r from-[#4facfe] to-[#00d2ff] text-white scale-110 shadow-[0_4px_20px_rgba(79,172,254,0.4)]" : ""}
                    ${estaCompletado ? "bg-gradient-to-r from-[#4facfe] to-[#00d2ff] text-white" : ""}
                    ${!estaActivo && !estaCompletado ? "backdrop-blur-xl bg-white/30 border border-white/50 text-gray-500" : ""}
                  `}
                >
                  {numeroPaso}
                </div>
                <span className={`text-xs ${estaActivo ? "text-gray-800" : "text-gray-500"}`}>
                  {etiquetas[indice]}
                </span>
              </div>
              {numeroPaso < totalPasos && (
                <div
                  className={`
                    w-12 h-0.5
                    ${numeroPaso < pasoActual ? "bg-gradient-to-r from-[#4facfe] to-[#00d2ff]" : "bg-white/40"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
