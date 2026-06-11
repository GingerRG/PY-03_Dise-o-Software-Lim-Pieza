import { ArrowLeft, Sparkles } from "lucide-react";

const integrantes = [
  {
    nombre: "Emilio Funes",
    cargo: "Fundador / Coordinador general",
    imagen: "/equipo/emilio.jpeg",
    descripcion:
      "Encargado de coordinar la visión general del servicio, organizar la propuesta de valor y supervisar que cada solicitud sea atendida correctamente."
  },
  {
    nombre: "Ginger Rodríguez",
    cargo: "Administración / Atención al cliente",
    imagen: "/equipo/ginger.jpeg",
    descripcion:
      "Responsable de la comunicación con los clientes, el seguimiento de solicitudes y la atención personalizada durante el proceso de reserva."
  },
  {
    nombre: "Jareck Levell",
    cargo: "Coordinador operativo / Personal de limpieza",
    imagen: "/equipo/jareck.jpeg",
    descripcion:
      "Encargado de la coordinación operativa del servicio, la organización del personal y el cumplimiento de las tareas de limpieza solicitadas."
  }
];

export function Equipo() {
  return (
    <main className="min-h-screen px-6 py-10">
  
      <div className="max-w-6xl mx-auto">
    

        <section className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/70 text-blue-700 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            Nuestro equipo
          </span>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
            Personas detrás del servicio
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
            Nuestro equipo combina coordinación, atención al cliente y operación
            para brindar una experiencia de limpieza clara, confiable y personalizada.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          {integrantes.map((persona) => (
            <article
              key={persona.nombre}
              className="group backdrop-blur-xl bg-white/60 border border-white/70 rounded-[2rem] shadow-xl overflow-hidden hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-[420px] overflow-hidden">
                <img
                  src={persona.imagen}
                  alt={`Fotografía de ${persona.nombre}, ${persona.cargo}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                  {persona.nombre}
                </h2>

                <p className="text-blue-600 font-medium mb-4">
                  {persona.cargo}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {persona.descripcion}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}