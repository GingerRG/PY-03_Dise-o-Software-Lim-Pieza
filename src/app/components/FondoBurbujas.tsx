import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Burbuja {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export function FondoBurbujas() {
  const [burbujas, setBurbujas] = useState<Burbuja[]>([]);

  useEffect(() => {
    // Crear burbujas más notorias para el fondo
    const createBurbujas = () => {
      return Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 50 + Math.random() * 120, // Burbujas más grandes
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 10
      }));
    };

    setBurbujas(createBurbujas());

    // Regenerar burbujas periódicamente
    const interval = setInterval(() => {
      setBurbujas(createBurbujas());
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
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
              `${burbuja.y - 10}vh`,
              `${burbuja.y - 25}vh`,
              `${burbuja.y - 40}vh`,
              `${burbuja.y - 60}vh`,
              `${burbuja.y - 100}vh`
            ],
            x: [
              `${burbuja.x}vw`,
              `${burbuja.x + (Math.random() - 0.5) * 8}vw`,
              `${burbuja.x + (Math.random() - 0.5) * 12}vw`,
              `${burbuja.x + (Math.random() - 0.5) * 10}vw`,
              `${burbuja.x + (Math.random() - 0.5) * 15}vw`,
              `${burbuja.x + (Math.random() - 0.5) * 20}vw`
            ],
            scale: [0, 0.9, 1.1, 1, 0.8, 0],
            opacity: [0, 0.4, 0.5, 0.45, 0.3, 0], // Mucho más opacas
            rotate: [0, 90, 180, 270, 360, 450]
          }}
          transition={{
            duration: burbuja.duration,
            delay: burbuja.delay,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="absolute"
          style={{
            width: burbuja.size,
            height: burbuja.size,
            filter: 'drop-shadow(0 0 6px rgba(79, 172, 254, 0.25))'
          }}
        >
          <div
            className="w-full h-full rounded-full relative"
            style={{
              background: `radial-gradient(circle at 35% 25%,
                rgba(255, 255, 255, 0.85) 0%,
                rgba(255, 255, 255, 0.6) 15%,
                rgba(79, 172, 254, 0.4) 35%,
                rgba(0, 210, 255, 0.35) 55%,
                rgba(79, 172, 254, 0.25) 75%,
                rgba(255, 255, 255, 0.15) 100%)`,
              boxShadow: `
                inset -3px -3px 10px rgba(255, 255, 255, 0.6),
                inset 3px 3px 10px rgba(79, 172, 254, 0.4),
                0 6px 20px rgba(79, 172, 254, 0.25),
                0 0 15px rgba(79, 172, 254, 0.2)
              `,
              border: '2px solid rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(2px)'
            }}
          >
            {/* Reflejo principal más notorio */}
            <div
              className="absolute top-[15%] left-[20%] w-[35%] h-[35%] rounded-full bg-white/70 blur-sm"
              style={{
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)'
              }}
            />
            {/* Reflejo secundario */}
            <div
              className="absolute top-[50%] left-[55%] w-[20%] h-[20%] rounded-full bg-white/40 blur-md"
            />
            {/* Toque de arcoíris sutil */}
            <div
              className="absolute inset-0 rounded-full opacity-25"
              style={{
                background: `conic-gradient(from 0deg,
                  rgba(255, 200, 255, 0.3) 0deg,
                  rgba(200, 255, 255, 0.3) 120deg,
                  rgba(255, 255, 200, 0.3) 240deg,
                  rgba(255, 200, 255, 0.3) 360deg)`,
                mixBlendMode: 'overlay'
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
