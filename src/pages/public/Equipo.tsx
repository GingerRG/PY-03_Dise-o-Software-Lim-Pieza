import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

import { FondoBurbujas } from "../../shared/components/FondoBurbujas";
import { PiePagina } from "../../shared/components/PiePagina";
import { miembrosEquipo } from "../../shared/constants/equipo";

export function Equipo() {
  return (
    <div className="min-h-screen relative">
      <FondoBurbujas />

      <main className="min-h-screen px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/70 text-blue-700 text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Nuestro equipo
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
              Personas detrás del servicio
            </h1>

            <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
              Nuestro equipo combina coordinación, atención al cliente y
              operación para brindar una experiencia de limpieza clara,
              confiable y personalizada.
            </p>
          </motion.section>

          <section
            className="grid gap-8 md:grid-cols-3"
            aria-label="Integrantes del equipo"
          >
            {miembrosEquipo.map((persona, indice) => (
              <motion.article
                key={persona.nombre}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: indice * 0.1 }}
                className="
                  group backdrop-blur-xl bg-white/60
                  border border-white/70
                  rounded-[2rem] shadow-xl
                  overflow-hidden
                  hover:-translate-y-2
                  transition-all duration-300
                "
              >
                <div className="h-[420px] overflow-hidden">
                  <img
                    src={persona.foto}
                    alt={`Fotografía de ${persona.nombre}, ${persona.rol}`}
                    className="
                      w-full h-full object-cover object-center
                      group-hover:scale-105
                      transition-transform duration-500
                    "
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                    {persona.nombre}
                  </h2>

                  <p className="text-blue-600 font-medium mb-4">
                    {persona.rol}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {persona.descripcion}
                  </p>
                </div>
              </motion.article>
            ))}
          </section>
        </div>
      </main>

      <PiePagina />
    </div>
  );
}