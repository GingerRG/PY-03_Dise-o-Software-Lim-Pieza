import { useNavigate } from "react-router";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { EtiquetaEstado } from "../components/EtiquetaEstado";
import { FondoBurbujas } from "../components/FondoBurbujas";
import { motion } from "motion/react";
import { CheckCircle, Sparkles, Home } from "lucide-react";
import { useEffect, useState } from "react";

// Componente de burbujas de jabón
function BurbujasJabon() {
  const [burbujas, setBurbujas] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Crear MUCHAS más burbujas para efecto fuerte
    const nuevasBurbujas = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: 40 + Math.random() * 120, // Burbujas más grandes
      delay: Math.random() * 1,
      duration: 4 + Math.random() * 3 // Duran más tiempo
    }));
    setBurbujas(nuevasBurbujas);

    // Limpiar burbujas después de 8 segundos
    const temporizador = setTimeout(() => {
      setBurbujas([]);
    }, 8000);

    return () => clearTimeout(temporizador);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {burbujas.map((burbuja) => (
        <motion.div
          key={burbuja.id}
          initial={{
            x: `${burbuja.x}vw`,
            y: `${burbuja.y}vh`,
            scale: 0,
            opacity: 0
          }}
          animate={{
            y: [
              `${burbuja.y}vh`,
              `${burbuja.y - 25}vh`,
              `${burbuja.y - 50}vh`,
              `${burbuja.y - 80}vh`,
              '-30vh'
            ],
            x: [
              `${burbuja.x}vw`,
              `${burbuja.x + (Math.random() - 0.5) * 15}vw`,
              `${burbuja.x + (Math.random() - 0.5) * 25}vw`,
              `${burbuja.x + (Math.random() - 0.5) * 20}vw`,
              `${burbuja.x + (Math.random() - 0.5) * 30}vw`
            ],
            scale: [0, 1.2, 1.1, 1, 0.7],
            opacity: [0, 0.95, 0.9, 0.7, 0],
            rotate: [0, 180, 360, 540]
          }}
          transition={{
            duration: burbuja.duration,
            delay: burbuja.delay,
            ease: "easeOut"
          }}
          className="absolute"
          style={{
            width: burbuja.size,
            height: burbuja.size,
            filter: 'drop-shadow(0 0 8px rgba(79, 172, 254, 0.5))'
          }}
        >
          <div
            className="w-full h-full rounded-full relative"
            style={{
              background: `radial-gradient(circle at 35% 25%,
                rgba(255, 255, 255, 1) 0%,
                rgba(255, 255, 255, 0.9) 10%,
                rgba(79, 172, 254, 0.6) 30%,
                rgba(0, 210, 255, 0.5) 50%,
                rgba(79, 172, 254, 0.4) 70%,
                rgba(255, 255, 255, 0.3) 100%)`,
              boxShadow: `
                inset -4px -4px 12px rgba(255, 255, 255, 0.8),
                inset 4px 4px 12px rgba(79, 172, 254, 0.5),
                0 8px 24px rgba(79, 172, 254, 0.4),
                0 0 30px rgba(79, 172, 254, 0.3)
              `,
              border: '2px solid rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(2px)'
            }}
          >
            {/* Reflejo principal más grande y brillante */}
            <div
              className="absolute top-[12%] left-[18%] w-[40%] h-[40%] rounded-full bg-white blur-sm"
              style={{
                opacity: 0.9,
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
              }}
            />
            {/* Reflejo secundario */}
            <div
              className="absolute top-[50%] left-[60%] w-[25%] h-[25%] rounded-full bg-white/50 blur-md"
            />
            {/* Brillo de arcoíris */}
            <div
              className="absolute inset-0 rounded-full opacity-40"
              style={{
                background: `conic-gradient(from 0deg,
                  rgba(255, 0, 255, 0.2) 0deg,
                  rgba(0, 255, 255, 0.2) 120deg,
                  rgba(255, 255, 0, 0.2) 240deg,
                  rgba(255, 0, 255, 0.2) 360deg)`,
                mixBlendMode: 'overlay'
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function Confirmacion() {
  const navigate = useNavigate();
  const [mostrarBurbujas, setMostrarBurbujas] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 relative">
      <FondoBurbujas />
      {mostrarBurbujas && <BurbujasJabon />}

      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tarjeta className="p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="mb-4 text-gray-800">¡Tu solicitud de limpieza ha sido recibida!</h1>
              <p className="mb-6 text-gray-600">
                Gracias por elegir Lim-Pieza. Nuestro equipo revisará tu solicitud y te contactará
                a través de tu método de comunicación preferido para confirmar los detalles y proporcionar una cotización.
              </p>

              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="text-sm text-gray-600">Estado de la Reserva:</span>
                <EtiquetaEstado estado="Pendiente" />
              </div>

              <Tarjeta className="p-6 mb-8 text-left">
                <h3 className="mb-4 text-gray-800 text-center">¿Qué sigue?</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-[#4facfe] mt-1">1.</span>
                    <span>Revisaremos tu solicitud y las fotos que hayas subido</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#4facfe] mt-1">2.</span>
                    <span>Nuestro equipo te contactará dentro de 24 horas para confirmar detalles y proporcionar una cotización</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#4facfe] mt-1">3.</span>
                    <span>Una vez confirmado, programaremos tu cita de limpieza</span>
                  </li>
                </ul>
              </Tarjeta>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Boton onClick={() => navigate("/")} variante="secundario">
                  <Home className="w-4 h-4 inline mr-2" />
                  Volver al inicio
                </Boton>
                <Boton onClick={() => navigate("/reserva/paso1")}>
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Crear otra solicitud
                </Boton>
              </div>
            </motion.div>
          </Tarjeta>
        </motion.div>
      </div>
    </div>
  );
}
