import { useMemo, useState } from "react";
import {
  Calendar,
  AlertCircle,
  MessageCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  Phone,
  Mail,
  MapPin,
  Trash2,
} from "lucide-react";

import { Tarjeta } from "../../shared/components/Tarjeta";
import { Boton } from "../../shared/components/Boton";
import { EtiquetaEstado } from "../../shared/components/EtiquetaEstado";
import { FondoBurbujas } from "../../shared/components/FondoBurbujas";
import { combinarClases } from "../../shared/utils/combinarClases";

import {
  borrarSolicitud,
  cambiarEstadoSolicitud,
  listarSolicitudes,
} from "../../features/solicitudes/services/solicitud.service";

import type {
  EstadoSolicitud,
  SolicitudRegistrada,
} from "../../features/solicitudes/models/solicitud.model";

import {
  OPCIONES_CONTACTO,
  OPCIONES_FRECUENCIA,
  OPCIONES_HORARIO,
  OPCIONES_RECURRENTES,
  OPCIONES_TAMANO,
  OPCIONES_TIPO_ESPACIO,
  OPCIONES_TIPO_SERVICIO,
  OPCIONES_URGENCIA,
} from "../../features/solicitudes/constants/solicitud.constants";

type EstadoFiltro = "todos" | EstadoSolicitud;

const ESTADOS_SOLICITUD: EstadoSolicitud[] = [
  "Pendiente",
  "Cotizada",
  "Confirmada",
  "Completada",
  "Cancelada",
];

const FILTROS_ESTADO: EstadoFiltro[] = ["todos", ...ESTADOS_SOLICITUD];

const ETIQUETAS_ESTADO: Record<EstadoFiltro, string> = {
  todos: "Todos",
  Pendiente: "Pendiente",
  Cotizada: "Cotizado",
  Confirmada: "Confirmado",
  Completada: "Completado",
  Cancelada: "Cancelado",
};

function buscarEtiqueta<T extends string>(
  opciones: Array<{ valor: T; etiqueta: string }>,
  valor: T
) {
  return (
    opciones.find((opcion) => opcion.valor === valor)?.etiqueta ||
    "No indicado"
  );
}

function obtenerHorario(valor: string) {
  const horario = OPCIONES_HORARIO.find((opcion) => opcion.valor === valor);

  if (!horario) return "No indicado";

  return `${horario.etiqueta} (${horario.horario})`;
}

function obtenerTamano(valor: string) {
  const tamano = OPCIONES_TAMANO.find((opcion) => opcion.valor === valor);

  if (!tamano) return "No indicado";

  return `${tamano.etiqueta} (${tamano.rango})`;
}

function formatearFecha(fecha: string) {
  if (!fecha) return "No indicada";

  const fechaNormalizada = fecha.includes("T")
    ? new Date(fecha)
    : new Date(`${fecha}T00:00:00`);

  if (Number.isNaN(fechaNormalizada.getTime())) {
    return fecha;
  }

  return new Intl.DateTimeFormat("es-CR", {
    dateStyle: "medium",
  }).format(fechaNormalizada);
}

function CampoDetalle({
  etiqueta,
  valor,
}: {
  etiqueta: string;
  valor: string | number;
}) {
  return (
    <div>
      <label className="text-sm text-gray-600 block mb-1">{etiqueta}</label>
      <p className="text-gray-800 break-words">{valor || "—"}</p>
    </div>
  );
}

export function PanelEmpresa() {
  const [solicitudes, setSolicitudes] = useState<SolicitudRegistrada[]>(() =>
    listarSolicitudes()
  );

  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState<EstadoFiltro>("todos");

  const [solicitudSeleccionadaId, setSolicitudSeleccionadaId] =
    useState<string | null>(null);

  const [estadoEditado, setEstadoEditado] = useState<EstadoSolicitud | "">("");

  const [resultadosPorPagina, setResultadosPorPagina] = useState(5);
  const [paginaActual, setPaginaActual] = useState(1);

  const solicitudesFiltradas = useMemo(() => {
    if (estadoSeleccionado === "todos") {
      return solicitudes;
    }

    return solicitudes.filter(
      (solicitud) => solicitud.estado === estadoSeleccionado
    );
  }, [solicitudes, estadoSeleccionado]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(solicitudesFiltradas.length / resultadosPorPagina)
  );

  const indiceInicial = (paginaActual - 1) * resultadosPorPagina;
  const indiceFinal = indiceInicial + resultadosPorPagina;

  const solicitudesPagina = solicitudesFiltradas.slice(
    indiceInicial,
    indiceFinal
  );

  const solicitudSeleccionada =
    solicitudes.find((solicitud) => solicitud.id === solicitudSeleccionadaId) ??
    null;

  const inicioMostrado =
    solicitudesFiltradas.length === 0 ? 0 : indiceInicial + 1;

  const finalMostrado = Math.min(indiceFinal, solicitudesFiltradas.length);

  function seleccionarFiltro(estado: EstadoFiltro) {
    setEstadoSeleccionado(estado);
    setPaginaActual(1);
  }

  function seleccionarSolicitud(solicitud: SolicitudRegistrada) {
    setSolicitudSeleccionadaId(solicitud.id);
    setEstadoEditado(solicitud.estado);
  }

  function actualizarEstado() {
    if (!solicitudSeleccionada || !estadoEditado) return;

    cambiarEstadoSolicitud(solicitudSeleccionada.id, estadoEditado);

    setSolicitudes((actuales) =>
      actuales.map((solicitud) =>
        solicitud.id === solicitudSeleccionada.id
          ? { ...solicitud, estado: estadoEditado }
          : solicitud
      )
    );
  }

  function eliminarSolicitudSeleccionada() {
    if (!solicitudSeleccionada) return;

    borrarSolicitud(solicitudSeleccionada.id);

    setSolicitudes((actuales) =>
      actuales.filter(
        (solicitud) => solicitud.id !== solicitudSeleccionada.id
      )
    );

    setSolicitudSeleccionadaId(null);
    setEstadoEditado("");
  }

  return (
    <div className="min-h-screen relative">
      <FondoBurbujas />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="mb-2 text-gray-800">Solicitudes de Limpieza</h1>

            <p className="text-gray-600">
              Gestiona y revisa las solicitudes de servicio entrantes.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {FILTROS_ESTADO.map((estado) => (
              <button
                key={estado}
                type="button"
                onClick={() => seleccionarFiltro(estado)}
                className={combinarClases(
                  `
                    px-4 py-2 rounded-lg
                    transition-all backdrop-blur-xl border
                  `,
                  estadoSeleccionado === estado
                    ? "bg-white/40 border-[#4facfe] text-gray-800"
                    : "bg-white/20 border-white/40 text-gray-600 hover:bg-white/30"
                )}
              >
                {ETIQUETAS_ESTADO[estado]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="space-y-4 flex flex-col h-full">
              <Tarjeta className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-gray-800">Reservas</h2>

                    <p className="text-sm text-gray-600">
                      Mostrando {inicioMostrado} - {finalMostrado} de{" "}
                      {solicitudesFiltradas.length}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="resultadosPorPagina"
                      className="text-sm text-gray-600"
                    >
                      Resultados por página:
                    </label>

                    <select
                      id="resultadosPorPagina"
                      value={resultadosPorPagina}
                      onChange={(evento) => {
                        setResultadosPorPagina(Number(evento.target.value));
                        setPaginaActual(1);
                      }}
                      className="
                        px-3 py-2 rounded-xl
                        bg-white/60 border border-white/70
                        text-gray-700
                        focus:outline-none
                        focus:ring-2 focus:ring-[#4facfe]/50
                      "
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                </div>
              </Tarjeta>

              {solicitudesPagina.length === 0 ? (
                <Tarjeta className="p-8 text-center">
                  <h3 className="text-gray-800 mb-2">
                    No hay solicitudes para mostrar
                  </h3>

                  <p className="text-sm text-gray-600">
                    Cuando un cliente complete el formulario, la solicitud
                    aparecerá en este panel.
                  </p>
                </Tarjeta>
              ) : (
                solicitudesPagina.map((solicitud) => {
                  const contacto = solicitud.contacto;

                  const tipoServicio = buscarEtiqueta(
                    OPCIONES_TIPO_SERVICIO,
                    solicitud.tipoServicio
                  );

                  const metodoContacto = buscarEtiqueta(
                    OPCIONES_CONTACTO,
                    contacto.metodoContacto
                  );

                  const urgencia = buscarEtiqueta(
                    OPCIONES_URGENCIA,
                    solicitud.urgencia
                  );

                  return (
                    <Tarjeta
                      key={solicitud.id}
                      hover
                      onClick={() => seleccionarSolicitud(solicitud)}
                      className={combinarClases(
                        "p-6 cursor-pointer",
                        solicitudSeleccionada?.id === solicitud.id &&
                          "ring-2 ring-[#4facfe]"
                      )}
                    >
                      <div className="flex items-start justify-between mb-4 gap-4">
                        <div>
                          <h3 className="text-gray-800 mb-1">
                            {contacto.nombreCompleto || "Cliente sin nombre"}
                          </h3>

                          <p className="text-sm text-gray-600">
                            {tipoServicio}
                          </p>
                        </div>

                        <EtiquetaEstado estado={solicitud.estado} />
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {formatearFecha(solicitud.fecha)}
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <MessageCircle className="w-4 h-4" />
                          {metodoContacto}
                        </div>

                        {solicitud.urgencia !== "normal" && (
                          <div className="flex items-center gap-2 text-orange-600">
                            <AlertCircle className="w-4 h-4" />
                            Urgencia: {urgencia}
                          </div>
                        )}
                      </div>
                    </Tarjeta>
                  );
                })
              )}

              <Tarjeta className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setPaginaActual((pagina) => Math.max(1, pagina - 1))
                    }
                    disabled={paginaActual === 1}
                    className="
                      flex items-center gap-2
                      px-4 py-2 rounded-xl
                      bg-white/60 border border-white/70
                      text-gray-700
                      disabled:opacity-40 disabled:cursor-not-allowed
                      hover:bg-white/80 transition-colors
                    "
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </button>

                  <span className="text-sm text-gray-600">
                    Página {paginaActual} de {totalPaginas}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setPaginaActual((pagina) =>
                        Math.min(totalPaginas, pagina + 1)
                      )
                    }
                    disabled={paginaActual === totalPaginas}
                    className="
                      flex items-center gap-2
                      px-4 py-2 rounded-xl
                      bg-white/60 border border-white/70
                      text-gray-700
                      disabled:opacity-40 disabled:cursor-not-allowed
                      hover:bg-white/80 transition-colors
                    "
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </Tarjeta>
            </div>

            <div className="h-full">
              <Tarjeta className="p-6 h-full sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-800">Detalles de la Reserva</h2>
                  <Eye className="w-5 h-5 text-[#4facfe]" />
                </div>

                {!solicitudSeleccionada ? (
                  <div className="h-full flex items-center justify-center text-center">
                    <div>
                      <Eye className="w-10 h-10 text-[#4facfe] mx-auto mb-4" />

                      <h3 className="text-gray-800 mb-2">
                        Selecciona una solicitud
                      </h3>

                      <p className="text-sm text-gray-600">
                        Haz clic en una reserva para ver sus detalles completos.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <CampoDetalle
                      etiqueta="Número de reserva"
                      valor={solicitudSeleccionada.id}
                    />

                    <CampoDetalle
                      etiqueta="Fecha de creación"
                      valor={formatearFecha(
                        solicitudSeleccionada.fechaCreacion
                      )}
                    />

                    <CampoDetalle
                      etiqueta="Nombre del cliente"
                      valor={solicitudSeleccionada.contacto.nombreCompleto}
                    />

                    <CampoDetalle
                      etiqueta="Tipo de servicio"
                      valor={buscarEtiqueta(
                        OPCIONES_TIPO_SERVICIO,
                        solicitudSeleccionada.tipoServicio
                      )}
                    />

                    <CampoDetalle
                      etiqueta="Frecuencia"
                      valor={buscarEtiqueta(
                        OPCIONES_FRECUENCIA,
                        solicitudSeleccionada.frecuencia
                      )}
                    />

                    {solicitudSeleccionada.frecuencia === "recurrente" && (
                      <CampoDetalle
                        etiqueta="Tipo recurrente"
                        valor={buscarEtiqueta(
                          OPCIONES_RECURRENTES,
                          solicitudSeleccionada.tipoRecurrente
                        )}
                      />
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <CampoDetalle
                        etiqueta="Fecha solicitada"
                        valor={formatearFecha(solicitudSeleccionada.fecha)}
                      />

                      <CampoDetalle
                        etiqueta="Hora preferida"
                        valor={obtenerHorario(solicitudSeleccionada.hora)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <CampoDetalle
                        etiqueta="Tipo de espacio"
                        valor={buscarEtiqueta(
                          OPCIONES_TIPO_ESPACIO,
                          solicitudSeleccionada.tipoEspacio
                        )}
                      />

                      <CampoDetalle
                        etiqueta="Habitaciones"
                        valor={solicitudSeleccionada.habitaciones}
                      />
                    </div>

                    <CampoDetalle
                      etiqueta="Tamaño"
                      valor={obtenerTamano(solicitudSeleccionada.tamano)}
                    />

                    <CampoDetalle
                      etiqueta="Dirección"
                      valor={solicitudSeleccionada.contacto.direccion}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-[#4facfe] mt-1 shrink-0" />
                        <CampoDetalle
                          etiqueta="Teléfono"
                          valor={solicitudSeleccionada.contacto.telefono}
                        />
                      </div>

                      <div className="flex items-start gap-2">
                        <Mail className="w-4 h-4 text-[#4facfe] mt-1 shrink-0" />
                        <CampoDetalle
                          etiqueta="Correo"
                          valor={solicitudSeleccionada.contacto.correo}
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#4facfe] mt-1 shrink-0" />
                      <CampoDetalle
                        etiqueta="Contacto preferido"
                        valor={buscarEtiqueta(
                          OPCIONES_CONTACTO,
                          solicitudSeleccionada.contacto.metodoContacto
                        )}
                      />
                    </div>

                    <CampoDetalle
                      etiqueta="Urgencia"
                      valor={buscarEtiqueta(
                        OPCIONES_URGENCIA,
                        solicitudSeleccionada.urgencia
                      )}
                    />

                    <div>
                      <label className="text-sm text-gray-600 block mb-2">
                        Tareas solicitadas
                      </label>

                      {solicitudSeleccionada.tareas.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {solicitudSeleccionada.tareas.map((tarea) => (
                            <span
                              key={tarea}
                              className="px-2 py-1 bg-white/50 rounded text-xs text-gray-700"
                            >
                              {tarea}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-800">
                          Sin tareas específicas
                        </p>
                      )}
                    </div>

                    <CampoDetalle
                      etiqueta="Fotos"
                      valor={`${solicitudSeleccionada.cantidadFotos} subidas`}
                    />

                    {solicitudSeleccionada.nombresFotos.length > 0 && (
                      <div>
                        <label className="text-sm text-gray-600 block mb-2">
                          Nombres de archivos
                        </label>

                        <ul className="text-sm text-gray-800 list-disc pl-5 space-y-1">
                          {solicitudSeleccionada.nombresFotos.map(
                            (nombreFoto) => (
                              <li key={nombreFoto}>{nombreFoto}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    <CampoDetalle
                      etiqueta="Notas"
                      valor={
                        solicitudSeleccionada.notas || "Sin notas especiales"
                      }
                    />

                    <div>
                      <label className="text-sm text-gray-600 block mb-2">
                        Estado
                      </label>

                      <select
                        value={estadoEditado}
                        onChange={(evento) =>
                          setEstadoEditado(
                            evento.target.value as EstadoSolicitud
                          )
                        }
                        className="
                          w-full px-4 py-2
                          backdrop-blur-xl bg-white/60
                          border border-white/70
                          rounded-xl text-gray-700
                          focus:outline-none
                          focus:ring-2 focus:ring-[#4facfe]/50
                        "
                      >
                        {ESTADOS_SOLICITUD.map((estado) => (
                          <option key={estado} value={estado}>
                            {ETIQUETAS_ESTADO[estado]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Boton
                        onClick={actualizarEstado}
                        disabled={
                          !estadoEditado ||
                          estadoEditado === solicitudSeleccionada.estado
                        }
                        className="w-full"
                      >
                        Actualizar Estado
                      </Boton>

                      <Boton
                        variante="secundario"
                        onClick={eliminarSolicitudSeleccionada}
                        className="w-full text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </Boton>
                    </div>
                  </div>
                )}
              </Tarjeta>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}