import { useNavigate } from "react-router";
import { Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Tarjeta } from "../../../shared/components/Tarjeta";
import { Boton } from "../../../shared/components/Boton";
import { IndicadorPasos } from "../../../shared/components/IndicadorPasos";
import { TarjetaServicio } from "../../../shared/components/TarjetaServicio";
import { FondoBurbujas } from "../../../shared/components/FondoBurbujas";
import { CampoFormulario } from "../../../shared/components/CampoFormulario";
import { combinarClases } from "../../../shared/utils/combinarClases";

import { useState } from "react";
import {
  obtenerFechaMinimaReserva,
  validarPasoAgenda,
} from "../validators/solicitud.validators";

import { useSolicitud } from "../context/SolicitudProvider";
import {
  ETIQUETAS_PASOS,
  OPCIONES_FRECUENCIA,
  OPCIONES_HORARIO,
  OPCIONES_RECURRENTES,
  RUTAS_RESERVA,
} from "../constants/solicitud.constants";
import type {
  FrecuenciaServicio,
  HoraPreferida,
  TipoRecurrente,
} from "../models/solicitud.model";

export function PasoAgenda() {
  const navigate = useNavigate();
  const { solicitud, actualizarSolicitud } = useSolicitud();

  const frecuenciaValida =
    solicitud.frecuencia === "unico" ||
    (solicitud.frecuencia === "recurrente" &&
      solicitud.tipoRecurrente !== "");

  const puedeContinuar =
    frecuenciaValida && solicitud.fecha !== "" && solicitud.hora !== "";

  
  function seleccionarFrecuencia(frecuencia: FrecuenciaServicio) {
    actualizarSolicitud({
      frecuencia,
      tipoRecurrente: frecuencia === "unico" ? "" : solicitud.tipoRecurrente,
    });
  }

  function seleccionarTipoRecurrente(tipoRecurrente: TipoRecurrente) {
    actualizarSolicitud({ tipoRecurrente });
  }

  
  function seleccionarHora(hora: HoraPreferida) {
    actualizarSolicitud({ hora });
  }

  const [errores, setErrores] = useState<Record<string, string>>({});
  function irSiguiente() {
    const resultado = validarPasoAgenda(solicitud);

    setErrores(resultado.errores);

    if (!resultado.valido) return;

    navigate(RUTAS_RESERVA.pasoDetalles);
  }

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <FondoBurbujas />

      <div className="max-w-4xl mx-auto relative z-10">
        <IndicadorPasos
          pasoActual={2}
          totalPasos={6}
          etiquetas={ETIQUETAS_PASOS}
        />

        <Tarjeta className="p-8">
          <h2 className="mb-2 text-gray-800 text-center">
            Frecuencia y Horario
          </h2>
          
          <p className="mb-8 text-gray-600 text-center">
            Elige cuándo necesitas el servicio de limpieza.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {OPCIONES_FRECUENCIA.map((opcion) => {
              const Icono = opcion.icono;

              return (
                <TarjetaServicio
                  key={opcion.valor}
                  icon={<Icono className="w-10 h-10" />}
                  titulo={opcion.etiqueta}
                  descripcion={opcion.descripcion ?? ""}
                  onClick={() => seleccionarFrecuencia(opcion.valor)}
                  seleccionado={solicitud.frecuencia === opcion.valor}
                />
              );
            })}
          </div>

          <AnimatePresence>
            {solicitud.frecuencia === "recurrente" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <Tarjeta className="p-6">
                  <h3 className="mb-4 text-gray-800 text-center font-medium">
                    Selecciona la frecuencia
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {OPCIONES_RECURRENTES.map((opcion) => (
                      <motion.button
                        type="button"
                        key={opcion.valor}
                        onClick={() =>
                          seleccionarTipoRecurrente(opcion.valor)
                        }
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={combinarClases(
                          `
                            p-4 rounded-xl
                            backdrop-blur-xl border-2
                            transition-all text-center
                          `,
                          solicitud.tipoRecurrente === opcion.valor
                            ? "bg-white/50 border-[#4facfe] shadow-[0_4px_16px_rgba(79,172,254,0.3)] scale-105"
                            : "bg-white/25 border-white/50 hover:bg-white/35 hover:border-white/60"
                        )}
                      >
                        <div className="font-medium text-gray-800">
                          {opcion.etiqueta}
                        </div>

                        <div className="text-xs text-gray-600 mt-1">
                          {opcion.descripcion}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </Tarjeta>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block mb-3 text-sm text-gray-700 font-medium">
                <Calendar className="inline w-4 h-4 mr-2" />
                Selecciona la fecha
              </label>

              <CampoFormulario
                type="date"
                value={solicitud.fecha}
                min={obtenerFechaMinimaReserva()}
                mensajeError={errores.fecha}
                onChange={(evento) =>
                  actualizarSolicitud({ fecha: evento.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block mb-3 text-sm text-gray-700 font-medium">
                <Clock className="inline w-4 h-4 mr-2" />
                Hora preferida
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {OPCIONES_HORARIO.map((opcion) => {
                  const Icono = opcion.icono;

                  return (
                    <motion.button
                      type="button"
                      key={opcion.valor}
                      onClick={() => seleccionarHora(opcion.valor)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={combinarClases(
                        `
                          p-4 rounded-xl
                          backdrop-blur-xl border-2
                          transition-all relative overflow-hidden
                        `,
                        solicitud.hora === opcion.valor
                          ? "bg-white/50 border-[#4facfe] shadow-[0_4px_16px_rgba(79,172,254,0.3)] scale-105"
                          : "bg-white/25 border-white/50 hover:bg-white/35 hover:border-white/60"
                      )}
                    >
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${opcion.color} opacity-50`}
                      />

                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="text-[#4facfe]">
                          <Icono className="w-5 h-5" />
                        </div>

                        <div className="font-medium text-gray-800">
                          {opcion.etiqueta}
                        </div>

                        <div className="text-xs text-gray-600">
                          {opcion.horario}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Boton
              onClick={() => navigate(RUTAS_RESERVA.pasoTipo)}
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