import { useNavigate } from "react-router";

import { Tarjeta } from "../../../shared/components/Tarjeta";
import { Boton } from "../../../shared/components/Boton";
import { IndicadorPasos } from "../../../shared/components/IndicadorPasos";
import { TarjetaServicio } from "../../../shared/components/TarjetaServicio";
import { FondoBurbujas } from "../../../shared/components/FondoBurbujas";

import { useSolicitud } from "../context/SolicitudProvider";
import {
  ETIQUETAS_PASOS,
  OPCIONES_TIPO_SERVICIO,
  RUTAS_RESERVA,
} from "../constants/solicitud.constants";
import type { TipoServicio } from "../models/solicitud.model";

export function PasoTipoLimpieza() {
  const navigate = useNavigate();
  const { solicitud, actualizarSolicitud } = useSolicitud();

  const puedeContinuar = solicitud.tipoServicio !== "";

  function seleccionarTipo(tipoServicio: TipoServicio) {
    actualizarSolicitud({ tipoServicio });
  }

  function irSiguiente() {
    if (!puedeContinuar) return;

    navigate(RUTAS_RESERVA.pasoAgenda);
  }

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <FondoBurbujas />

      <div className="max-w-4xl mx-auto relative z-10">
        <IndicadorPasos
          pasoActual={1}
          totalPasos={6}
          etiquetas={ETIQUETAS_PASOS}
        />

        <Tarjeta className="p-8">
          <h2 className="mb-2 text-gray-800 text-center">
            Elige el Tipo de Limpieza
          </h2>

          <p className="mb-8 text-gray-600 text-center">
            Selecciona el tipo de servicio de limpieza que necesitas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {OPCIONES_TIPO_SERVICIO.map((opcion) => {
              const Icono = opcion.icono;

              return (
                <TarjetaServicio
                  key={opcion.valor}
                  icon={<Icono className="w-12 h-12" />}
                  titulo={opcion.etiqueta}
                  descripcion={opcion.descripcion ?? ""}
                  onClick={() => seleccionarTipo(opcion.valor)}
                  seleccionado={solicitud.tipoServicio === opcion.valor}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <Boton
              onClick={() => navigate(RUTAS_RESERVA.inicio)}
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