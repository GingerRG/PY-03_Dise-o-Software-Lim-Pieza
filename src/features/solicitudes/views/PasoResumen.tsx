import { useNavigate } from "react-router";
import { Edit, Calendar, Home, Clock, MessageCircle } from "lucide-react";

import { Tarjeta } from "../../../shared/components/Tarjeta";
import { Boton } from "../../../shared/components/Boton";
import { IndicadorPasos } from "../../../shared/components/IndicadorPasos";
import { FondoBurbujas } from "../../../shared/components/FondoBurbujas";

import {
  validarPasoAgenda,
  validarPasoContacto,
  validarPasoDetalles,
} from "../validators/solicitud.validators";


import { useSolicitud } from "../context/SolicitudProvider";
import { registrarSolicitud } from "../services/solicitud.service";

import {
  ETIQUETAS_PASOS,
  OPCIONES_CONTACTO,
  OPCIONES_FRECUENCIA,
  OPCIONES_HORARIO,
  OPCIONES_RECURRENTES,
  OPCIONES_TAMANO,
  OPCIONES_TIPO_ESPACIO,
  OPCIONES_TIPO_SERVICIO,
  RUTAS_RESERVA,
} from "../constants/solicitud.constants";

function buscarEtiqueta<T extends string>(
  opciones: Array<{ valor: T; etiqueta: string }>,
  valor: T
) {
  return opciones.find((opcion) => opcion.valor === valor)?.etiqueta || "No indicado";
}

function buscarHorario(valor: string) {
  const horario = OPCIONES_HORARIO.find((opcion) => opcion.valor === valor);

  if (!horario) return "No indicado";

  return `${horario.etiqueta} (${horario.horario})`;
}

function FilaResumen({
  etiqueta,
  valor,
}: {
  etiqueta: string;
  valor: string | number;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-600">{etiqueta}:</span>
      <span className="text-gray-800 text-right">{valor}</span>
    </div>
  );
}

function BotonEditar({ ruta }: { ruta: string }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(ruta)}
      aria-label="Editar esta sección"
      className="text-[#4facfe] hover:text-[#00d2ff] transition-colors"
    >
      <Edit className="w-4 h-4" />
    </button>
  );
}

export function PasoResumen() {
  const navigate = useNavigate();
  const { solicitud, reiniciarSolicitud } = useSolicitud();

  const contacto = solicitud.contacto;

  function enviarSolicitud() {
    const validacionAgenda = validarPasoAgenda(solicitud);
    const validacionDetalles = validarPasoDetalles(solicitud);
    const validacionContacto = validarPasoContacto(solicitud);

    const formularioValido =
      validacionAgenda.valido &&
      validacionDetalles.valido &&
      validacionContacto.valido;

    if (!formularioValido) {
      alert("Hay datos incompletos o inválidos. Por favor revise la solicitud.");
      return;
    }

    const solicitudRegistrada = registrarSolicitud(solicitud);

    reiniciarSolicitud();

    navigate(RUTAS_RESERVA.confirmacion, {
      state: {
        solicitudId: solicitudRegistrada.id,
      },
    });
  }

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <FondoBurbujas />

      <div className="max-w-4xl mx-auto relative z-10">
        <IndicadorPasos
          pasoActual={6}
          totalPasos={6}
          etiquetas={ETIQUETAS_PASOS}
        />

        <Tarjeta className="p-8">
          <h2 className="mb-2 text-gray-800 text-center">Revisar y Enviar</h2>

          <p className="mb-8 text-gray-600 text-center">
            Por favor revisa los detalles de tu reserva antes de enviar.
          </p>

          <div className="space-y-6 mb-8">
            <Tarjeta className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-[#4facfe]" />
                  <h3 className="text-gray-800">Detalles del Servicio</h3>
                </div>

                <BotonEditar ruta={RUTAS_RESERVA.pasoTipo} />
              </div>

              <div className="space-y-2 text-sm">
                <FilaResumen
                  etiqueta="Tipo de Servicio"
                  valor={buscarEtiqueta(
                    OPCIONES_TIPO_SERVICIO,
                    solicitud.tipoServicio
                  )}
                />

                <FilaResumen
                  etiqueta="Frecuencia"
                  valor={buscarEtiqueta(
                    OPCIONES_FRECUENCIA,
                    solicitud.frecuencia
                  )}
                />

                {solicitud.frecuencia === "recurrente" && (
                  <FilaResumen
                    etiqueta="Tipo recurrente"
                    valor={buscarEtiqueta(
                      OPCIONES_RECURRENTES,
                      solicitud.tipoRecurrente
                    )}
                  />
                )}
              </div>
            </Tarjeta>

            <Tarjeta className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#4facfe]" />
                  <h3 className="text-gray-800">Horario</h3>
                </div>

                <BotonEditar ruta={RUTAS_RESERVA.pasoAgenda} />
              </div>

              <div className="space-y-2 text-sm">
                <FilaResumen
                  etiqueta="Fecha"
                  valor={solicitud.fecha || "No indicada"}
                />

                <FilaResumen
                  etiqueta="Hora"
                  valor={buscarHorario(solicitud.hora)}
                />
              </div>
            </Tarjeta>

            <Tarjeta className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#4facfe]" />
                  <h3 className="text-gray-800">Detalles de Limpieza</h3>
                </div>

                <BotonEditar ruta={RUTAS_RESERVA.pasoDetalles} />
              </div>

              <div className="space-y-2 text-sm">
                <FilaResumen
                  etiqueta="Espacio"
                  valor={buscarEtiqueta(
                    OPCIONES_TIPO_ESPACIO,
                    solicitud.tipoEspacio
                  )}
                />

                <FilaResumen
                  etiqueta="Habitaciones"
                  valor={solicitud.habitaciones}
                />

                <FilaResumen
                  etiqueta="Tamaño"
                  valor={
                    OPCIONES_TAMANO.find(
                      (opcion) => opcion.valor === solicitud.tamano
                    )
                      ? `${
                          OPCIONES_TAMANO.find(
                            (opcion) => opcion.valor === solicitud.tamano
                          )?.etiqueta
                        } (${
                          OPCIONES_TAMANO.find(
                            (opcion) => opcion.valor === solicitud.tamano
                          )?.rango
                        })`
                      : "No indicado"
                  }
                />

                <div>
                  <span className="text-gray-600 block mb-1">Tareas:</span>

                  {solicitud.tareas.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {solicitud.tareas.map((tarea) => (
                        <span
                          key={tarea}
                          className="px-2 py-1 bg-white/50 rounded text-xs text-gray-700"
                        >
                          {tarea}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-800">
                      Sin tareas específicas
                    </span>
                  )}
                </div>

                <FilaResumen
                  etiqueta="Fotos"
                  valor={`${solicitud.archivos.length} subidas`}
                />

                <FilaResumen
                  etiqueta="Notas"
                  valor={solicitud.notas || "Sin notas especiales"}
                />
              </div>
            </Tarjeta>

            <Tarjeta className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#4facfe]" />
                  <h3 className="text-gray-800">Información de Contacto</h3>
                </div>

                <BotonEditar ruta={RUTAS_RESERVA.pasoContacto} />
              </div>

              <div className="space-y-2 text-sm">
                <FilaResumen
                  etiqueta="Nombre"
                  valor={contacto.nombreCompleto || "No indicado"}
                />

                <FilaResumen
                  etiqueta="Teléfono"
                  valor={contacto.telefono || "No indicado"}
                />

                <FilaResumen
                  etiqueta="Correo"
                  valor={contacto.correo || "No indicado"}
                />

                <FilaResumen
                  etiqueta="Dirección"
                  valor={contacto.direccion || "No indicada"}
                />

                <FilaResumen
                  etiqueta="Contactar vía"
                  valor={buscarEtiqueta(
                    OPCIONES_CONTACTO,
                    contacto.metodoContacto
                  )}
                />
              </div>
            </Tarjeta>
          </div>

          <div className="flex items-center justify-between">
            <Boton
              onClick={() => navigate(RUTAS_RESERVA.pasoContacto)}
              variante="simple"
            >
              Atrás
            </Boton>

            <Boton onClick={enviarSolicitud}>Enviar solicitud</Boton>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}