import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { EtiquetaEstado } from "../components/EtiquetaEstado";
import { FondoBurbujas } from "../components/FondoBurbujas";
import { Sparkles, Calendar, AlertCircle, MessageCircle, Eye } from "lucide-react";
import { motion } from "motion/react";

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
  const navigate = useNavigate();
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>("todos");
  const [reservaSeleccionada, setReservaSeleccionada] = useState<Reserva | null>(null);
  const [mostrarMenu, setMostrarMenu] = useState(true);
  const [ultimoScrollY, setUltimoScrollY] = useState(0);

  useEffect(() => {
    const manejarScroll = () => {
      const scrollActual = window.scrollY;

      if (scrollActual > ultimoScrollY && scrollActual > 100) {
        setMostrarMenu(false);
      } else {
        setMostrarMenu(true);
      }

      setUltimoScrollY(scrollActual);
    };

    window.addEventListener('scroll', manejarScroll, { passive: true });
    return () => window.removeEventListener('scroll', manejarScroll);
  }, [ultimoScrollY]);

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
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: 0 }}
        animate={{ y: mostrarMenu ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="mx-4 my-4 px-6 py-4 backdrop-blur-2xl bg-white/10 border-2 border-white/30 rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.15),inset_0_1px_2px_rgba(255,255,255,0.3)]">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-6 h-6 text-[#4facfe]" />
              <span className="text-xl text-gray-800">Lim-Pieza - Panel</span>
            </button>
            <Boton onClick={() => navigate("/")} variante="secundario">
              Volver al inicio
            </Boton>
          </div>
        </div>
      </motion.nav>

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
                onClick={() => setEstadoSeleccionado(estado)}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {reservasFiltradas.map((reservation) => (
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
            </div>

            <div>
              {reservaSeleccionada ? (
                <Tarjeta className="p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-gray-800">Detalles de la Reserva</h2>
                    <Eye className="w-5 h-5 text-[#4facfe]" />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Nombre del Cliente</label>
                      <p className="text-gray-800">{reservaSeleccionada.nombreCliente}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Tipo de Servicio</label>
                      <p className="text-gray-800">{reservaSeleccionada.tipoServicio}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Fecha Solicitada</label>
                      <p className="text-gray-800">{reservaSeleccionada.fechaSolicitada}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Dirección</label>
                      <p className="text-gray-800">{reservaSeleccionada.direccion}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Teléfono</label>
                        <p className="text-gray-800 text-sm">{reservaSeleccionada.telefono}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Correo</label>
                        <p className="text-gray-800 text-sm">{reservaSeleccionada.correo}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Contacto Preferido</label>
                      <p className="text-gray-800">{reservaSeleccionada.metodoContacto}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-2">Estado</label>
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
                    </div>

                    <Boton className="w-full">
                      Actualizar Estado
                    </Boton>
                  </div>
                </Tarjeta>
              ) : (
                <Tarjeta className="p-12 text-center sticky top-24">
                  <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Selecciona una reserva para ver los detalles
                  </p>
                </Tarjeta>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
