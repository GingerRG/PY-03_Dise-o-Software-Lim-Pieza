import { useNavigate } from "react-router";
import { Home, Plus, Minus } from "lucide-react";
import { motion } from "motion/react";

import { Tarjeta } from "../../../shared/components/Tarjeta";
import { Boton } from "../../../shared/components/Boton";
import { IndicadorPasos } from "../../../shared/components/IndicadorPasos";
import { FondoBurbujas } from "../../../shared/components/FondoBurbujas";
import { combinarClases } from "../../../shared/utils/combinarClases";

import { useState } from "react";
import { validarPasoDetalles } from "../validators/solicitud.validators";

import { useSolicitud } from "../context/SolicitudProvider";
import {
  ETIQUETAS_PASOS,
  OPCIONES_TAMANO,
  OPCIONES_TAREAS,
  OPCIONES_TIPO_ESPACIO,
  OPCIONES_URGENCIA,
  RUTAS_RESERVA,
} from "../constants/solicitud.constants";
import type {
  TamanoEspacio,
  TipoEspacio,
  UrgenciaSolicitud,
} from "../models/solicitud.model";

export function PasoDetalles() {
  const navigate = useNavigate();
  const { solicitud, actualizarSolicitud } = useSolicitud();

  const puedeContinuar =
    solicitud.tipoEspacio !== "" && solicitud.tamano !== "";

  function alternarTarea(tarea: string) {
    const tareasActualizadas = solicitud.tareas.includes(tarea)
      ? solicitud.tareas.filter((actual) => actual !== tarea)
      : [...solicitud.tareas, tarea];

    actualizarSolicitud({ tareas: tareasActualizadas });
  }

  function cambiarHabitaciones(cantidad: number) {
    actualizarSolicitud({
      habitaciones: Math.min(10, Math.max(1, cantidad)),
    });
  }

  const [errores, setErrores] = useState<Record<string, string>>({});
  
  function irSiguiente() {
    const resultado = validarPasoDetalles(solicitud);

    setErrores(resultado.errores);

    if (!resultado.valido) return;

    navigate(RUTAS_RESERVA.pasoFotos);
  }

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <FondoBurbujas />

      <div className="max-w-4xl mx-auto relative z-10">
        <IndicadorPasos
          pasoActual={3}
          totalPasos={6}
          etiquetas={ETIQUETAS_PASOS}
        />

        <Tarjeta className="p-8">
          <h2 className="mb-2 text-gray-800 text-center">
            Detalles de Limpieza
          </h2>

          <p className="mb-8 text-gray-600 text-center">
            Cuéntanos sobre tu espacio y necesidades de limpieza.
          </p>

          <div className="space-y-8 mb-8">
            <div>
              <label className="block mb-3 text-sm text-gray-700 font-medium">
                Tipo de espacio
              </label>

              <select
                value={solicitud.tipoEspacio}
                onChange={(evento) =>
                  actualizarSolicitud({
                    tipoEspacio: evento.target.value as TipoEspacio,
                  })
                }
                className="
                  w-full px-4 py-3
                  backdrop-blur-xl bg-white/60
                  border-2 border-white/70
                  rounded-xl text-gray-700
                  focus:outline-none
                  focus:ring-2 focus:ring-[#4facfe]/50
                  focus:border-[#4facfe]/50
                  transition-all
                  shadow-[0_2px_8px_rgba(79,172,254,0.1)]
                "
              >
                <option value="">Selecciona el tipo de espacio</option>

                {OPCIONES_TIPO_ESPACIO.map((opcion) => (
                  <option key={opcion.valor} value={opcion.valor}>
                    {opcion.etiqueta}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-4 text-sm text-gray-700 font-medium">
                Número de habitaciones
              </label>

              <Tarjeta className="p-6">
                <div className="flex items-center justify-between gap-6">
                  <button
                    type="button"
                    onClick={() =>
                      cambiarHabitaciones(solicitud.habitaciones - 1)
                    }
                    disabled={solicitud.habitaciones <= 1}
                    aria-label="Disminuir número de habitaciones"
                    className="
                      w-12 h-12 rounded-full
                      backdrop-blur-xl bg-white/40
                      border-2 border-white/60
                      flex items-center justify-center
                      text-[#4facfe]
                      hover:bg-white/50 hover:scale-110
                      active:scale-95 transition-all
                      disabled:opacity-30 disabled:cursor-not-allowed
                      shadow-[0_4px_12px_rgba(79,172,254,0.2)]
                    "
                  >
                    <Minus className="w-5 h-5" />
                  </button>

                  <div className="flex-1 flex items-center justify-center gap-3">
                    <Home className="w-6 h-6 text-[#4facfe]" />

                    <motion.div
                      key={solicitud.habitaciones}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl font-bold text-gray-800"
                    >
                      {solicitud.habitaciones}
                    </motion.div>

                    <span className="text-gray-600">
                      habitación
                      {solicitud.habitaciones !== 1 ? "es" : ""}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      cambiarHabitaciones(solicitud.habitaciones + 1)
                    }
                    disabled={solicitud.habitaciones >= 10}
                    aria-label="Aumentar número de habitaciones"
                    className="
                      w-12 h-12 rounded-full
                      backdrop-blur-xl bg-white/40
                      border-2 border-white/60
                      flex items-center justify-center
                      text-[#4facfe]
                      hover:bg-white/50 hover:scale-110
                      active:scale-95 transition-all
                      disabled:opacity-30 disabled:cursor-not-allowed
                      shadow-[0_4px_12px_rgba(79,172,254,0.2)]
                    "
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </Tarjeta>
            </div>

            <div>
              <label className="block mb-3 text-sm text-gray-700 font-medium">
                Tamaño aproximado
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {OPCIONES_TAMANO.map((opcion) => (
                  <button
                    type="button"
                    key={opcion.valor}
                    onClick={() =>
                      actualizarSolicitud({
                        tamano: opcion.valor as TamanoEspacio,
                      })
                    }
                    aria-pressed={solicitud.tamano === opcion.valor}
                    className={combinarClases(
                      `
                        p-4 rounded-xl
                        transition-all backdrop-blur-xl
                        border-2 text-center
                      `,
                      solicitud.tamano === opcion.valor
                        ? "bg-white/50 border-[#4facfe] shadow-[0_4px_16px_rgba(79,172,254,0.3)] scale-105"
                        : "bg-white/25 border-white/50 hover:bg-white/35 hover:border-white/60 hover:scale-[1.02]"
                    )}
                  >
                    <div className="font-medium text-gray-800">
                      {opcion.etiqueta}
                    </div>

                    <div className="text-xs text-gray-600 mt-1">
                      {opcion.rango}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-4 text-sm text-gray-700 font-medium">
                Tareas específicas de limpieza
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {OPCIONES_TAREAS.map((tarea) => {
                  const Icono = tarea.icono;
                  const estaSeleccionada = solicitud.tareas.includes(
                    tarea.nombre
                  );

                  return (
                    <button
                      key={tarea.nombre}
                      type="button"
                      onClick={() => alternarTarea(tarea.nombre)}
                      aria-pressed={estaSeleccionada}
                      className={combinarClases(
                        `
                          flex flex-col items-center justify-center gap-3
                          min-h-[120px] p-4 rounded-2xl
                          backdrop-blur-xl border
                          transition-all duration-300
                          hover:-translate-y-1 hover:shadow-lg
                        `,
                        estaSeleccionada
                          ? "bg-blue-500/20 border-blue-400 text-blue-700 shadow-md"
                          : "bg-white/50 border-white/70 text-gray-700 hover:bg-white/70"
                      )}
                    >
                      <div
                        className={combinarClases(
                          `
                            w-12 h-12 rounded-2xl
                            flex items-center justify-center
                          `,
                          estaSeleccionada
                            ? "bg-blue-500 text-white"
                            : "bg-white/70 text-blue-500"
                        )}
                      >
                        <Icono className="w-6 h-6" />
                      </div>

                      <span className="text-sm font-medium text-center">
                        {tarea.nombre}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block mb-4 text-sm text-gray-700 font-medium">
                Nivel de urgencia
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {OPCIONES_URGENCIA.map((nivel) => (
                  <motion.button
                    type="button"
                    key={nivel.valor}
                    onClick={() =>
                      actualizarSolicitud({
                        urgencia: nivel.valor as UrgenciaSolicitud,
                      })
                    }
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={combinarClases(
                      `
                        p-4 rounded-xl
                        transition-all backdrop-blur-xl
                        border-2 relative overflow-hidden
                      `,
                      solicitud.urgencia === nivel.valor
                        ? "bg-white/50 border-[#4facfe] text-gray-800 shadow-[0_4px_16px_rgba(79,172,254,0.3)]"
                        : "bg-white/25 border-white/50 text-gray-600 hover:bg-white/35 hover:border-white/60"
                    )}
                  >
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${nivel.color} opacity-50`}
                    />

                    <span className="relative z-10 font-medium">
                      {nivel.etiqueta}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Boton
              onClick={() => navigate(RUTAS_RESERVA.pasoAgenda)}
              variante="simple"
            >
              Atrás
            </Boton>

            <Boton onClick={irSiguiente} disabled={!puedeContinuar}>
              Siguiente
            </Boton>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}