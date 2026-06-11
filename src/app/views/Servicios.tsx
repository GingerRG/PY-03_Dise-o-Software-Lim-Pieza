import { useNavigate } from "react-router";
import { Boton } from "../components/Boton";
import { TarjetaServicio } from "../components/TarjetaServicio";
import { FondoBurbujas } from "../components/FondoBurbujas";
import { motion } from "motion/react";
import { Home, Car, Sofa } from "lucide-react";


export function Servicios() {
  const navigate = useNavigate();
 

  return (
    <div className="min-h-screen relative">
      <FondoBurbujas />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="mb-4 text-gray-800">Nuestros Servicios</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elige el servicio de limpieza que mejor se adapte a tus necesidades
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TarjetaServicio
              icon={<Home className="w-12 h-12" />}
              titulo="Limpieza General"
              descripcion="Limpieza completa para hogares, habitaciones, oficinas y espacios comunes. Perfecta para mantenimiento regular y limpieza profunda."
              onClick={() => navigate("/reserva/paso1")}
            />
            <TarjetaServicio
              icon={<Car className="w-12 h-12" />}
              titulo="Limpieza Específica"
              descripcion="Limpieza especializada para autos, alfombras, colchones, muebles y objetos especiales. Soluciones personalizadas para necesidades únicas."
              onClick={() => navigate("/reserva/paso1")}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="p-8 max-w-2xl mx-auto backdrop-blur-2xl bg-white/10 border-2 border-white/30 rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.15),inset_0_1px_2px_rgba(255,255,255,0.3)]">
              <Sofa className="w-12 h-12 text-[#4facfe] mx-auto mb-4" />
              <h2 className="mb-4 text-gray-800">¿No estás seguro qué servicio necesitas?</h2>
              <p className="mb-6 text-gray-600">
                Comienza el proceso de reserva y nuestro equipo te ayudará a determinar la mejor solución de limpieza para tu situación específica.
              </p>
              <Boton onClick={() => navigate("/reserva/paso1")}>
                Iniciar reserva
              </Boton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
