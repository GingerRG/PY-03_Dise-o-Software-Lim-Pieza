import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Sofa } from "lucide-react";

import { Boton } from "../../shared/components/Boton";
import { TarjetaServicio } from "../../shared/components/TarjetaServicio";
import { FondoBurbujas } from "../../shared/components/FondoBurbujas";
import { PiePagina } from "../../shared/components/PiePagina";

import { OPCIONES_TIPO_SERVICIO } from "../../features/solicitudes/constants/solicitud.constants";

export function Servicios() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      <FondoBurbujas />

      <main className="pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="mb-4 text-gray-800">Nuestros Servicios</h1>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Elige el servicio de limpieza que mejor se adapte a tus
              necesidades.
            </p>
          </motion.section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {OPCIONES_TIPO_SERVICIO.map((servicio) => {
              const Icono = servicio.icono;

              return (
                <TarjetaServicio
                  key={servicio.valor}
                  icon={<Icono className="w-12 h-12" />}
                  titulo={servicio.etiqueta}
                  descripcion={servicio.descripcion ?? ""}
                  onClick={() => navigate("/reserva/paso1")}
                />
              );
            })}
          </section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="p-8 max-w-2xl mx-auto backdrop-blur-2xl bg-white/10 border-2 border-white/30 rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.15),inset_0_1px_2px_rgba(255,255,255,0.3)]">
              <Sofa className="w-12 h-12 text-[#4facfe] mx-auto mb-4" />

              <h2 className="mb-4 text-gray-800">
                ¿No estás seguro qué servicio necesitas?
              </h2>

              <p className="mb-6 text-gray-600">
                Comienza el proceso de reserva y nuestro equipo te ayudará a
                determinar la mejor solución de limpieza para tu situación
                específica.
              </p>

              <Boton onClick={() => navigate("/reserva/paso1")}>
                Iniciar reserva
              </Boton>
            </div>
          </motion.section>
        </div>
      </main>

      <PiePagina />
    </div>
  );
}