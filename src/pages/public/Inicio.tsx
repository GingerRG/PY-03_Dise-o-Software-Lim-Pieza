import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Sparkles,
  Calendar,
  Users,
  Camera,
  Home,
  Droplets,
  Wind,
  Star,
  Zap,
  Clock,
  Shield,
  type LucideIcon,
} from "lucide-react";

import { Boton } from "../../shared/components/Boton";
import { FondoBurbujas } from "../../shared/components/FondoBurbujas";
import { PiePagina } from "../../shared/components/PiePagina";

interface Beneficio {
  icono: LucideIcon;
  titulo: string;
  descripcion: string;
}

interface Caracteristica {
  icono: LucideIcon;
  texto: string;
}

const beneficios: Beneficio[] = [
  {
    icono: Users,
    titulo: "Personal Confiable",
    descripcion: "Profesionales verificados y con experiencia.",
  },
  {
    icono: Calendar,
    titulo: "Horarios Flexibles",
    descripcion: "Elige la fecha y hora que mejor te convenga.",
  },
  {
    icono: Camera,
    titulo: "Solicitudes con Fotos",
    descripcion: "Muéstranos lo que necesitas limpiar.",
  },
  {
    icono: Home,
    titulo: "Servicio Personalizado",
    descripcion: "Soluciones de limpieza a tu medida.",
  },
];

const caracteristicas: Caracteristica[] = [
  {
    icono: Shield,
    texto: "100% seguro y confiable",
  },
  {
    icono: Clock,
    texto: "Respuesta en 24 horas",
  },
  {
    icono: Star,
    texto: "Calidad premium",
  },
  {
    icono: Zap,
    texto: "Servicio rápido",
  },
];

export function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FondoBurbujas />

      <main className="pt-20 pb-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 relative"
          >
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-20 left-1/4"
              >
                <Sparkles className="w-8 h-8 text-[#4facfe]/40" />
              </motion.div>

              <motion.div
                animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-40 right-1/4"
              >
                <Droplets className="w-10 h-10 text-[#00d2ff]/30" />
              </motion.div>

              <motion.div
                animate={{ rotate: 360, y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-10 right-1/3"
              >
                <Wind className="w-6 h-6 text-[#4facfe]/50" />
              </motion.div>
            </div>

            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-8"
              aria-hidden="true"
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#4facfe]/20 rounded-full blur-2xl"
                />

                <Sparkles className="w-24 h-24 text-[#4facfe] relative z-10" />
              </div>
            </motion.div>

            <motion.h1
              className="mb-6 text-gray-800 text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Servicios de limpieza{" "}
              <span className="bg-gradient-to-r from-[#4facfe] to-[#00d2ff] bg-clip-text text-transparent">
                simples, claros y personales
              </span>
            </motion.h1>

            <motion.p
              className="mb-8 text-gray-600 max-w-3xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Solicita servicios de limpieza general, específica o recurrente
              desde la comodidad de tu hogar. Nuestro equipo profesional está
              listo para ayudarte a mantener un espacio impecable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            >
              <Boton onClick={() => navigate("/reserva/paso1")}>
                Reservar limpieza
              </Boton>

              <Boton
                onClick={() => navigate("/servicios")}
                variante="secundario"
              >
                Explorar servicios
              </Boton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {caracteristicas.map((caracteristica, indice) => {
                const Icono = caracteristica.icono;

                return (
                  <motion.div
                    key={caracteristica.texto}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + indice * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="px-4 py-2 flex items-center gap-2 backdrop-blur-2xl bg-white/10 border-2 border-white/30 rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.15),inset_0_1px_2px_rgba(255,255,255,0.3)]">
                      <Icono className="w-6 h-6 text-[#4facfe]" />
                      <span className="text-sm text-gray-700">
                        {caracteristica.texto}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            aria-label="Beneficios del servicio"
          >
            {beneficios.map((beneficio, indice) => {
              const Icono = beneficio.icono;

              return (
                <motion.article
                  key={beneficio.titulo}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + 0.1 * indice, duration: 0.6 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                >
                  <div className="p-8 h-full relative overflow-hidden group backdrop-blur-2xl bg-white/10 border-2 border-white/30 rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.15),inset_0_1px_2px_rgba(255,255,255,0.3)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(31,38,135,0.2),inset_0_2px_4px_rgba(255,255,255,0.4)] hover:bg-white/15">
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-[#4facfe]/10 to-[#00d2ff]/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex flex-col items-center text-center gap-4 relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.3, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="text-[#4facfe]"
                      >
                        <Icono className="w-8 h-8" />
                      </motion.div>

                      <div>
                        <h3 className="mb-2 text-gray-800">
                          {beneficio.titulo}
                        </h3>

                        <p className="text-sm text-gray-600">
                          {beneficio.descripcion}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="relative"
            aria-label="Llamado a la acción"
          >
            <div className="p-12 text-center relative overflow-hidden backdrop-blur-2xl bg-white/10 border-2 border-white/30 rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.15),inset_0_1px_2px_rgba(255,255,255,0.3)]">
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#4facfe]/10 to-[#00d2ff]/10 rounded-full blur-3xl"
              />

              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="inline-block mb-6"
                  aria-hidden="true"
                >
                  <Sparkles className="w-16 h-16 text-[#4facfe]" />
                </motion.div>

                <h2 className="mb-4 text-gray-800 text-3xl">
                  ¿Listo para un espacio más limpio?
                </h2>

                <p className="mb-8 text-gray-600 max-w-2xl mx-auto">
                  Comienza tu solicitud ahora y recibe una cotización
                  personalizada en menos de 24 horas.
                </p>

                <Boton onClick={() => navigate("/reserva/paso1")}>
                  Comenzar ahora
                </Boton>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <PiePagina />
    </div>
  );
}