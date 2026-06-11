import { useState } from "react";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { EtiquetaEstado } from "../components/EtiquetaEstado";
import { FondoBurbujas } from "../components/FondoBurbujas";
import { Calendar, AlertCircle, MessageCircle, Eye, ChevronLeft, ChevronRight } from "lucide-react";

type Estado = "Pendiente" | "Cotizada" | "Confirmada" | "Completada" | "Cancelada";

interface Reserva {
  id: string;
  nombreCliente: string;
  tipoServicio: string;
  fechaSolicitada: string;
  urgencia: string;
  metodoContacto: string;
  estado: Estado;
  direccion: string;
  telefono: string;
  correo: string;
}

export function PanelEmpresa() {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>("todos");
  const [reservaSeleccionada, setReservaSeleccionada] = useState<Reserva | null>(null);
  const [resultadosPorPagina, setResultadosPorPagina] = useState(5);
  const [paginaActual, setPaginaActual] = useState(1);

  const reservasEjemplo: Reserva[] = [
    {
      id: "1",
      nombreCliente: "Juan Pérez",
      tipoServicio: "Limpieza General",
      fechaSolicitada: "15 de junio de 2026",
      urgencia: "normal",
      metodoContacto: "WhatsApp",
      estado: "Pendiente",
      direccion: "Calle Principal 123, Ciudad, Estado 12345",
      telefono: "+52 (555) 000-0000",
      correo: "juan@ejemplo.com"
    },
    {
      id: "2",
      nombreCliente: "María García",
      tipoServicio: "Limpieza Específica",
      fechaSolicitada: "18 de junio de 2026",
      urgencia: "urgente",
      metodoContacto: "Llamada",
      estado: "Cotizada",
      direccion: "Avenida Roble 456, Ciudad, Estado 12345",
      telefono: "+52 (555) 111-1111",
      correo: "maria@ejemplo.com"
    },
    {
      id: "3",
      nombreCliente: "Roberto López",
      tipoServicio: "Limpieza General",
      fechaSolicitada: "20 de junio de 2026",
      urgencia: "pronto",
      metodoContacto: "Correo",
      estado: "Confirmada",
      direccion: "Calle Pino 789, Ciudad, Estado 12345",
      telefono: "+52 (555) 222-2222",
      correo: "roberto@ejemplo.com"
    }
  ];

  const reservasFiltradas = estadoSeleccionado === "todos"
    ? reservasEjemplo
    : reservasEjemplo.filter(r => r.estado === estadoSeleccionado);
    const totalPaginas = Math.ceil(reservasFiltradas.length / resultadosPorPagina);
    const indiceInicial = (paginaActual - 1) * resultadosPorPagina;
    const indiceFinal = indiceInicial + resultadosPorPagina;

    const reservasPagina = reservasFiltradas.slice(indiceInicial, indiceFinal);

  const etiquetasEstado: Record<string, string> = {
    "todos": "Todos",
    "Pendiente": "Pendiente",
    "Cotizada": "Cotizado",
    "Confirmada": "Confirmado",
    "Completada": "Completado",
    "Cancelada": "Cancelado"
  };

  return (
    <div className="min-h-screen relative">
      <FondoBurbujas />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="mb-2 text-gray-800">Solicitudes de Limpieza</h1>
            <p className="text-gray-600">Gestiona y revisa las solicitudes de servicio entrantes</p>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {["todos", "Pendiente", "Cotizada", "Confirmada", "Completada", "Cancelada"].map((estado) => (
              <button
                key={estado}
                onClick={() => {
                  setEstadoSeleccionado(estado);
                  setPaginaActual(1);
                }}
                className={`
                  px-4 py-2 rounded-lg transition-all backdrop-blur-xl border
                  ${estadoSeleccionado === estado
                    ? "bg-white/40 border-[#4facfe] text-gray-800"
                    : "bg-white/20 border-white/40 text-gray-600 hover:bg-white/30"
                  }
                `}
              >
                {etiquetasEstado[estado]}
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
                      Mostrando {indiceInicial + 1} - {Math.min(indiceFinal, reservasFiltradas.length)} de {reservasFiltradas.length}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <label htmlFor="resultadosPorPagina" className="text-sm text-gray-600">
                      Resultados por página:
                    </label>

                    <select
                      id="resultadosPorPagina"
                      value={resultadosPorPagina}
                      onChange={(evento) => {
                        setResultadosPorPagina(Number(evento.target.value));
                        setPaginaActual(1);
                      }}
                      className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4facfe]/50"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                </div>
              </Tarjeta>

              {reservasPagina.map((reservation) => (


                <Tarjeta
                  key={reservation.id}
                  hover
                  onClick={() => setReservaSeleccionada(reservation)}
                  className={`p-6 cursor-pointer ${reservaSeleccionada?.id === reservation.id ? "ring-2 ring-[#4facfe]" : ""}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-gray-800 mb-1">{reservation.nombreCliente}</h3>
                      <p className="text-sm text-gray-600">{reservation.tipoServicio}</p>
                    </div>
                    <EtiquetaEstado estado={reservation.estado} />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {reservation.fechaSolicitada}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageCircle className="w-4 h-4" />
                      {reservation.metodoContacto}
                    </div>
                    {reservation.urgencia !== "normal" && (
                      <div className="flex items-center gap-2 text-orange-600">
                        <AlertCircle className="w-4 h-4" />
                        Urgencia: {reservation.urgencia}
                      </div>
                    )}
                  </div>
                </Tarjeta>
              ))}
              <Tarjeta className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setPaginaActual(paginaActual - 1)}
                    disabled={paginaActual === 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 border border-white/70 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/80 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </button>

                  <span className="text-sm text-gray-600">
                    Página {paginaActual} de {totalPaginas}
                  </span>

                  <button
                    type="button"
                    onClick={() => setPaginaActual(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 border border-white/70 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/80 transition-colors"
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

                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      Número de reserva
                    </label>
                    <p className="text-gray-800">
                      {reservaSeleccionada?.id ?? "—"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      Nombre del Cliente
                    </label>
                    <p className="text-gray-800">
                      {reservaSeleccionada?.nombreCliente ?? "—"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      Tipo de Servicio
                    </label>
                    <p className="text-gray-800">
                      {reservaSeleccionada?.tipoServicio ?? "—"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      Fecha Solicitada
                    </label>
                    <p className="text-gray-800">
                      {reservaSeleccionada?.fechaSolicitada ?? "—"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      Dirección
                    </label>
                    <p className="text-gray-800">
                      {reservaSeleccionada?.direccion ?? "—"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">
                        Teléfono
                      </label>
                      <p className="text-gray-800 text-sm">
                        {reservaSeleccionada?.telefono ?? "—"}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">
                        Correo
                      </label>
                      <p className="text-gray-800 text-sm">
                        {reservaSeleccionada?.correo ?? "—"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      Contacto Preferido
                    </label>
                    <p className="text-gray-800">
                      {reservaSeleccionada?.metodoContacto ?? "—"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      Urgencia
                    </label>
                    <p className="text-gray-800">
                      {reservaSeleccionada?.urgencia ?? "—"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 block mb-2">
                      Estado
                    </label>

                    {reservaSeleccionada ? (
                      <select
                        value={reservaSeleccionada.estado}
                        onChange={(e) => {
                          setReservaSeleccionada({
                            ...reservaSeleccionada,
                            estado: e.target.value as Estado
                          });
                        }}
                        className="w-full px-4 py-2 backdrop-blur-xl bg-white/60 border border-white/70 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4facfe]/50"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Cotizada">Cotizado</option>
                        <option value="Confirmada">Confirmado</option>
                        <option value="Completada">Completado</option>
                        <option value="Cancelada">Cancelado</option>
                      </select>
                    ) : (
                      <p className="text-gray-800">—</p>
                    )}
                  </div>

                  <Boton
                    className={`w-full ${!reservaSeleccionada ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Actualizar Estado
                  </Boton>
                </div>
              </Tarjeta>
            </div>
              
          </div>
        </div>
      </div>
    </div>
  );
}
