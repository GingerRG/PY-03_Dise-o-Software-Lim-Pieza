import { useNavigate } from "react-router";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { IndicadorPasos } from "../components/IndicadorPasos";
import { FondoBurbujas } from "../components/FondoBurbujas";
import { Sparkles, Edit, Calendar, Home, Clock, MessageCircle } from "lucide-react";

export function PasoResumen() {
  const navigate = useNavigate();

  const datosEjemplo = {
    tipoServicio: "Limpieza General",
    frecuencia: "Única",
    fecha: "15 de junio de 2026",
    hora: "Mañana (8AM - 12PM)",
    tipoEspacio: "Apartamento",
    habitaciones: 3,
    tamano: "Mediano (50-100 m²)",
    tareas: ["Aspirado", "Trapeado", "Limpieza de baños", "Limpieza de cocina"],
    fotos: 2,
    nombreCompleto: "Juan Pérez",
    telefono: "+52 (555) 000-0000",
    correo: "juan@ejemplo.com",
    direccion: "Calle Principal 123, Ciudad, Estado 12345",
    metodoContacto: "WhatsApp"
  };

  const enviarSolicitud = () => {
    navigate("/confirmacion");
  };

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <FondoBurbujas />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 mb-6"
          >
          </button>
        </div>

        <IndicadorPasos
          pasoActual={6}
          totalPasos={6}
          etiquetas={["Tipo", "Horario", "Detalles", "Fotos", "Contacto", "Revisar"]}
        />

        <Tarjeta className="p-8">
          <h2 className="mb-2 text-gray-800 text-center">Revisar y Enviar</h2>
          <p className="mb-8 text-gray-600 text-center">
            Por favor revisa los detalles de tu reserva antes de enviar
          </p>

          <div className="space-y-6 mb-8">
            <Tarjeta className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-[#4facfe]" />
                  <h3 className="text-gray-800">Detalles del Servicio</h3>
                </div>
                <button
                  onClick={() => navigate("/reserva/paso1")}
                  className="text-[#4facfe] hover:text-[#00d2ff] transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo de Servicio:</span>
                  <span className="text-gray-800">{datosEjemplo.tipoServicio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frecuencia:</span>
                  <span className="text-gray-800">{datosEjemplo.frecuencia}</span>
                </div>
              </div>
            </Tarjeta>

            <Tarjeta className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#4facfe]" />
                  <h3 className="text-gray-800">Horario</h3>
                </div>
                <button
                  onClick={() => navigate("/reserva/paso2")}
                  className="text-[#4facfe] hover:text-[#00d2ff] transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="text-gray-800">{datosEjemplo.fecha}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hora:</span>
                  <span className="text-gray-800">{datosEjemplo.hora}</span>
                </div>
              </div>
            </Tarjeta>

            <Tarjeta className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#4facfe]" />
                  <h3 className="text-gray-800">Detalles de Limpieza</h3>
                </div>
                <button
                  onClick={() => navigate("/reserva/paso3")}
                  className="text-[#4facfe] hover:text-[#00d2ff] transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Espacio:</span>
                  <span className="text-gray-800">{datosEjemplo.tipoEspacio} - {datosEjemplo.habitaciones} habitaciones</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tamaño:</span>
                  <span className="text-gray-800">{datosEjemplo.tamano}</span>
                </div>
                <div>
                  <span className="text-gray-600 block mb-1">Tareas:</span>
                  <div className="flex flex-wrap gap-2">
                    {datosEjemplo.tareas.map((tarea) => (
                      <span key={tarea} className="px-2 py-1 bg-white/50 rounded text-xs text-gray-700">
                        {tarea}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fotos:</span>
                  <span className="text-gray-800">{datosEjemplo.fotos} subidas</span>
                </div>
              </div>
            </Tarjeta>

            <Tarjeta className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#4facfe]" />
                  <h3 className="text-gray-800">Información de Contacto</h3>
                </div>
                <button
                  onClick={() => navigate("/reserva/paso5")}
                  className="text-[#4facfe] hover:text-[#00d2ff] transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="text-gray-800">{datosEjemplo.nombreCompleto}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Teléfono:</span>
                  <span className="text-gray-800">{datosEjemplo.telefono}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Correo:</span>
                  <span className="text-gray-800">{datosEjemplo.correo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dirección:</span>
                  <span className="text-gray-800">{datosEjemplo.direccion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contactar vía:</span>
                  <span className="text-gray-800">{datosEjemplo.metodoContacto}</span>
                </div>
              </div>
            </Tarjeta>
          </div>

          <div className="flex items-center justify-between">
            <Boton onClick={() => navigate("/reserva/paso5")} variante="simple">
              Atrás
            </Boton>
            <Boton onClick={enviarSolicitud}>
              Enviar solicitud
            </Boton>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}
