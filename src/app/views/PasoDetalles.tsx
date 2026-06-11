import { useState } from "react";
import { useNavigate } from "react-router";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { IndicadorPasos } from "../components/IndicadorPasos";
import { FondoBurbujas } from "../components/FondoBurbujas";
import {
  Home,
  Brush,
  SprayCan,
  Wind,
  Droplets,
  Sparkles,
  Trash2,
  Sofa,
  Car,
  Bed,
  CookingPot,
  Bath,
  Shirt,
  Plus,
  Minus
} from "lucide-react";
import { motion } from "motion/react";


export function PasoDetalles() {
  const navigate = useNavigate();
  const [tipoEspacio, setTipoEspacio] = useState<string>("");
  const [habitaciones, setHabitaciones] = useState<number>(1);
  const [tamano, setTamano] = useState<string>("");
  const [tareas, setTareas] = useState<string[]>([]);
  const [urgencia, setUrgencia] = useState<string>("normal");

  const tareasLimpieza = [
  {
    nombre: "Barrer",
    icono: Brush
  },
  {
    nombre: "Trapear",
    icono: Droplets
  },
  {
    nombre: "Aspirar",
    icono: Wind
  },
  {
    nombre: "Limpiar polvo",
    icono: Sparkles
  },
  {
    nombre: "Desinfectar",
    icono: SprayCan
  },
  {
    nombre: "Sacar basura",
    icono: Trash2
  },
  {
    nombre: "Limpiar cocina",
    icono: CookingPot
  },
  {
    nombre: "Limpiar baño",
    icono: Bath
  },
  {
    nombre: "Limpiar muebles",
    icono: Sofa
  },
  {
    nombre: "Lavar ropa",
    icono: Shirt
  },
  {
    nombre: "Limpiar colchón",
    icono: Bed
  },
  {
    nombre: "Limpiar vehículo",
    icono: Car
  }
];

  const alternarTarea = (tarea: string) => {
    setTareas((anteriores) =>
      anteriores.includes(tarea) ? anteriores.filter((actual) => actual !== tarea) : [...anteriores, tarea]
    );
  };

  const irSiguiente = () => {
    if (tipoEspacio && tamano) {
      navigate("/reserva/paso4");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <FondoBurbujas />
      <div className="max-w-4xl mx-auto relative z-10">
        <IndicadorPasos
          pasoActual={3}
          totalPasos={6}
          etiquetas={["Tipo", "Horario", "Detalles", "Fotos", "Contacto", "Revisar"]}
        />

        <Tarjeta className="p-8">
          <h2 className="mb-2 text-gray-800 text-center">Detalles de Limpieza</h2>
          <p className="mb-8 text-gray-600 text-center">
            Cuéntanos sobre tu espacio y necesidades de limpieza
          </p>

          <div className="space-y-8 mb-8">
            <div>
              <label className="block mb-3 text-sm text-gray-700 font-medium">Tipo de Espacio</label>
              <select
                value={tipoEspacio}
                onChange={(e) => setTipoEspacio(e.target.value)}
                className="w-full px-4 py-3 backdrop-blur-xl bg-white/60 border-2 border-white/70 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4facfe]/50 focus:border-[#4facfe]/50 transition-all shadow-[0_2px_8px_rgba(79,172,254,0.1)]"
              >
                <option value="">Selecciona el tipo de espacio</option>
                <option value="house">Casa</option>
                <option value="room">Habitación</option>
                <option value="apartment">Apartamento</option>
                <option value="office">Oficina</option>
                <option value="business">Negocio</option>
                <option value="other">Otro</option>
              </select>
            </div>

            <div>
              <label className="block mb-4 text-sm text-gray-700 font-medium">Número de Habitaciones</label>
              <Tarjeta className="p-6">
                <div className="flex items-center justify-between gap-6">
                  <button
                    onClick={() => setHabitaciones(Math.max(1, habitaciones - 1))}
                    disabled={habitaciones <= 1}
                    className="w-12 h-12 rounded-full backdrop-blur-xl bg-white/40 border-2 border-white/60 flex items-center justify-center text-[#4facfe] hover:bg-white/50 hover:scale-110 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(79,172,254,0.2)]"
                  >
                    <Minus className="w-5 h-5" />
                  </button>

                  <div className="flex-1 flex items-center justify-center gap-3">
                    <Home className="w-6 h-6 text-[#4facfe]" />
                    <motion.div
                      key={habitaciones}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl font-bold text-gray-800"
                    >
                      {habitaciones}
                    </motion.div>
                    <span className="text-gray-600">habitación{habitaciones !== 1 ? "es" : ""}</span>
                  </div>

                  <button
                    onClick={() => setHabitaciones(Math.min(10, habitaciones + 1))}
                    disabled={habitaciones >= 10}
                    className="w-12 h-12 rounded-full backdrop-blur-xl bg-white/40 border-2 border-white/60 flex items-center justify-center text-[#4facfe] hover:bg-white/50 hover:scale-110 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(79,172,254,0.2)]"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </Tarjeta>
            </div>

            <div>
              <label className="block mb-3 text-sm text-gray-700 font-medium">Tamaño Aproximado</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { valor: "pequeno", etiqueta: "Pequeño", rango: "< 50 m²" },
                  { valor: "mediano", etiqueta: "Mediano", rango: "50-100 m²" },
                  { valor: "grande", etiqueta: "Grande", rango: "100-200 m²" },
                  { valor: "muy-grande", etiqueta: "Muy Grande", rango: "> 200 m²" }
                ] .map((opcion) => (
                  <button
                    key={opcion.valor}
                    onClick={() => setTamano(opcion.valor)}
                    className={`
                      p-4 rounded-xl transition-all backdrop-blur-xl border-2 text-center
                      ${tamano === opcion.valor
                        ? "bg-white/50 border-[#4facfe] shadow-[0_4px_16px_rgba(79,172,254,0.3)] scale-105"
                        : "bg-white/25 border-white/50 hover:bg-white/35 hover:border-white/60 hover:scale-102"
                      }
                    `}
                  >
                    <div className="font-medium text-gray-800">{opcion.etiqueta}</div>
                    <div className="text-xs text-gray-600 mt-1">{opcion.rango}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-4 text-sm text-gray-700 font-medium">Tareas Específicas de Limpieza</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {tareasLimpieza.map((tarea) => {
                  const Icono = tarea.icono;
                  const estaSeleccionada = tareas.includes(tarea.nombre);

                  return (
                    <button
                      key={tarea.nombre}
                      type="button"
                      onClick={() => alternarTarea(tarea.nombre)}
                      aria-pressed={estaSeleccionada}
                      className={`
                        flex flex-col items-center justify-center gap-3
                        min-h-[120px] p-4 rounded-2xl
                        backdrop-blur-xl border transition-all duration-300
                        hover:-translate-y-1 hover:shadow-lg
                        ${
                          estaSeleccionada
                            ? "bg-blue-500/20 border-blue-400 text-blue-700 shadow-md"
                            : "bg-white/50 border-white/70 text-gray-700 hover:bg-white/70"
                        }
                      `}
                    >
                      <div
                        className={`
                          w-12 h-12 rounded-2xl flex items-center justify-center
                          ${
                            estaSeleccionada
                              ? "bg-blue-500 text-white"
                              : "bg-white/70 text-blue-500"
                          }
                        `}
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
              <label className="block mb-4 text-sm text-gray-700 font-medium">Nivel de Urgencia</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { valor: "normal", etiqueta: "Normal", color: "from-green-400/20 to-green-500/10" },
                  { valor: "pronto", etiqueta: "Pronto", color: "from-yellow-400/20 to-yellow-500/10" },
                  { valor: "urgente", etiqueta: "Urgente", color: "from-red-400/20 to-red-500/10" }
                ] .map((nivel) => (
                  <motion.button
                    key={nivel.valor}
                    onClick={() => setUrgencia(nivel.valor)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      p-4 rounded-xl transition-all backdrop-blur-xl border-2 relative overflow-hidden
                      ${urgencia === nivel.valor
                        ? "bg-white/50 border-[#4facfe] text-gray-800 shadow-[0_4px_16px_rgba(79,172,254,0.3)]"
                        : "bg-white/25 border-white/50 text-gray-600 hover:bg-white/35 hover:border-white/60"
                      }
                    `}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${nivel.color} opacity-50`} />
                    <span className="relative z-10 font-medium">{nivel.etiqueta}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Boton onClick={() => navigate("/reserva/paso2")} variante="simple">
              Atrás
            </Boton>
            <Boton onClick={irSiguiente} disabled={!tipoEspacio || !tamano}>
              Siguiente
            </Boton>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}
