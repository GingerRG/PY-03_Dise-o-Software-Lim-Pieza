import { useNavigate } from "react-router";

import { Tarjeta } from "../../../shared/components/Tarjeta";
import { Boton } from "../../../shared/components/Boton";
import { IndicadorPasos } from "../../../shared/components/IndicadorPasos";
import { CajaSubida } from "../../../shared/components/CajaSubida";
import { FondoBurbujas } from "../../../shared/components/FondoBurbujas";

import { useSolicitud } from "../context/SolicitudProvider";
import {
  ETIQUETAS_PASOS,
  RUTAS_RESERVA,
} from "../constants/solicitud.constants";

export function PasoFotos() {
  const navigate = useNavigate();
  const { solicitud, actualizarSolicitud } = useSolicitud();

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <FondoBurbujas />

      <div className="max-w-4xl mx-auto relative z-10">
        <IndicadorPasos
          pasoActual={4}
          totalPasos={6}
          etiquetas={ETIQUETAS_PASOS}
        />

        <Tarjeta className="p-8">
          <h2 className="mb-2 text-gray-800 text-center">
            Fotos y Notas Especiales
          </h2>

          <p className="mb-8 text-gray-600 text-center">
            Sube fotos para ayudarnos a entender tu espacio. Este paso es
            opcional.
          </p>

          <div className="space-y-6 mb-8">
            <CajaSubida
              archivos={solicitud.archivos}
              alCambiarArchivos={(archivos) =>
                actualizarSolicitud({ archivos })
              }
            />

            <div>
              <label className="block mb-2 text-sm text-gray-700">
                Notas especiales o instrucciones
              </label>

              <textarea
                value={solicitud.notas}
                onChange={(evento) =>
                  actualizarSolicitud({ notas: evento.target.value })
                }
                placeholder="Áreas específicas o indicaciones que te gustaría que conociéramos..."
                rows={4}
                className="
                  w-full px-4 py-3
                  backdrop-blur-xl bg-white/60
                  border border-white/70
                  rounded-xl text-gray-700
                  placeholder:text-gray-400
                  focus:outline-none
                  focus:ring-2 focus:ring-[#4facfe]/50
                  resize-none
                "
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Boton
              onClick={() => navigate(RUTAS_RESERVA.pasoDetalles)}
              variante="simple"
            >
              Atrás
            </Boton>

            <Boton onClick={() => navigate(RUTAS_RESERVA.pasoContacto)}>
              Siguiente
            </Boton>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}