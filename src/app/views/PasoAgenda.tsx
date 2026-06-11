import { useState } from "react";
import { useNavigate } from "react-router";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { IndicadorPasos } from "../components/IndicadorPasos";
import { TarjetaServicio } from "../components/TarjetaServicio";
import { FondoBurbujas } from "../components/FondoBurbujas";
import { Calendar, Repeat, Clock, Sparkles, Sun, Sunset, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function PasoAgenda() {
  const navigate = useNavigate();
  const [frecuencia, setFrecuencia] = useState<string>("");
  const [tipoRecurrente, setTipoRecurrente] = useState<string>("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("");
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>("");

  const irSiguiente = () => {
    if (frecuencia && fechaSeleccionada && horaSeleccionada) {
      navigate("/reserva/paso3");
    }
  };

  const horarios = [
    { value: "manana", label: "Mañana", time: "8AM - 12PM", icon: <Sun className="w-5 h-5" />, color: "from-yellow-400/20 to-orange-400/10" },
    { value: "tarde", label: "Tarde", time: "12PM - 5PM", icon: <Sunset className="w-5 h-5" />, color: "from-orange-400/20 to-red-400/10" },
    { value: "noche", label: "Noche", time: "5PM - 8PM", icon: <Moon className="w-5 h-5" />, color: "from-blue-400/20 to-purple-400/10" }
  ];

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
          pasoActual={2}
          totalPasos={6}
          etiquetas={["Tipo", "Horario", "Detalles", "Fotos", "Contacto", "Revisar"]}
        />

        <Tarjeta className="p-8">
          <h2 className="mb-2 text-gray-800 text-center">Frecuencia y Horario</h2>
          <p className="mb-8 text-gray-600 text-center">
            Elige cuándo necesitas el servicio de limpieza
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <TarjetaServicio
              icon={<Calendar className="w-10 h-10" />}
              titulo="Servicio Único"
              descripcion="Una sola cita de limpieza"
              onClick={() => {
                setFrecuencia("unico");
                setTipoRecurrente("");
              }}
              seleccionado={frecuencia === "unico"}
            />
            <TarjetaServicio
              icon={<Repeat className="w-10 h-10" />}
              titulo="Servicio Recurrente"
              descripcion="Limpiezas programadas regularmente"
              onClick={() => setFrecuencia("recurrente")}
              seleccionado={frecuencia === "recurrente"}
            />
          </div>

          <AnimatePresence>
            {frecuencia === "recurrente" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <Tarjeta className="p-6">
                  <h3 className="mb-4 text-gray-800 text-center font-medium">Selecciona la Frecuencia</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: "semanal", label: "Semanal", desc: "Cada semana" },
                      { value: "quincenal", label: "Quincenal", desc: "Cada 2 semanas" },
                      { value: "mensual", label: "Mensual", desc: "Cada mes" }
                    ].map((type) => (
                      <motion.button
                        key={type.value}
                        onClick={() => setTipoRecurrente(type.value)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`
                          p-4 rounded-xl backdrop-blur-xl border-2 transition-all text-center
                          ${tipoRecurrente === type.value
                            ? "bg-white/50 border-[#4facfe] shadow-[0_4px_16px_rgba(79,172,254,0.3)] scale-105"
                            : "bg-white/25 border-white/50 hover:bg-white/35 hover:border-white/60"
                          }
                        `}
                      >
                        <div className="font-medium text-gray-800">{type.label}</div>
                        <div className="text-xs text-gray-600 mt-1">{type.desc}</div>
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
                Selecciona la Fecha
              </label>
              <input
                type="date"
                value={fechaSeleccionada}
                onChange={(e) => setFechaSeleccionada(e.target.value)}
                className="w-full px-4 py-3 backdrop-blur-xl bg-white/60 border-2 border-white/70 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4facfe]/50 focus:border-[#4facfe]/50 transition-all shadow-[0_2px_8px_rgba(79,172,254,0.1)]"
              />
            </div>

            <div>
              <label className="block mb-3 text-sm text-gray-700 font-medium">
                <Clock className="inline w-4 h-4 mr-2" />
                Hora Preferida
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {horarios.map((slot) => (
                  <motion.button
                    key={slot.value}
                    onClick={() => setHoraSeleccionada(slot.value)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      p-4 rounded-xl backdrop-blur-xl border-2 transition-all relative overflow-hidden
                      ${horaSeleccionada === slot.value
                        ? "bg-white/50 border-[#4facfe] shadow-[0_4px_16px_rgba(79,172,254,0.3)] scale-105"
                        : "bg-white/25 border-white/50 hover:bg-white/35 hover:border-white/60"
                      }
                    `}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${slot.color} opacity-50`} />
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="text-[#4facfe]">{slot.icon}</div>
                      <div className="font-medium text-gray-800">{slot.label}</div>
                      <div className="text-xs text-gray-600">{slot.time}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Boton onClick={() => navigate("/reserva/paso1")} variante="simple">
              Atrás
            </Boton>
            <Boton onClick={irSiguiente} disabled={!frecuencia || !fechaSeleccionada || !horaSeleccionada}>
              Siguiente
            </Boton>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}
