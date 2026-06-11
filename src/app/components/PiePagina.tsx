import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Users,
} from "lucide-react";

const miembros = [
  {
    nombre: "Emilio Funes",
    rol: "Fundador / Coordinador general",
    foto: "/equipo/emilio.jpeg",
  },
  {
    nombre: "Ginger Rodríguez",
    rol: "Administración / Atención al cliente",
    foto: "/equipo/ginger.jpeg",
  },
  {
    nombre: "Jareck Levell",
    rol: "Coordinador operativo / Personal de limpieza",
    foto: "/equipo/jareck.jpeg",
  },
];

function CarruselEquipo() {
  const [indiceActivo, setIndiceActivo] = useState(0);
  const navigate = useNavigate();

  const miembro = miembros[indiceActivo];

  function anterior() {
    setIndiceActivo((indice) =>
      indice === 0 ? miembros.length - 1 : indice - 1
    );
  }

  function siguiente() {
    setIndiceActivo((indice) =>
      indice === miembros.length - 1 ? 0 : indice + 1
    );
  }

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-4 h-4 text-blue-300" />
        <h3 className="text-sm uppercase tracking-widest text-blue-300 font-semibold">
          Equipo
        </h3>
      </div>

      <div className="flex items-center gap-4">
        <img
          src={miembro.foto}
          alt={`Fotografía de ${miembro.nombre}`}
          className="w-20 h-20 rounded-2xl object-cover border border-blue-300/30"
        />

        <div className="min-w-0 flex-1">
          <p className="text-white font-semibold leading-tight">
            {miembro.nombre}
          </p>

          <p className="text-blue-200/70 text-xs mt-1 leading-snug">
            {miembro.rol}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <button
              type="button"
              onClick={anterior}
              aria-label="Ver integrante anterior"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-1.5">
              {miembros.map((persona, indice) => (
                <button
                  key={persona.nombre}
                  type="button"
                  onClick={() => setIndiceActivo(indice)}
                  aria-label={`Mostrar a ${persona.nombre}`}
                  className={`h-2 rounded-full transition-all ${
                    indice === indiceActivo
                      ? "w-6 bg-blue-300"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={siguiente}
              aria-label="Ver siguiente integrante"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate("/equipo")}
        className="mt-4 w-full px-4 py-2 rounded-full bg-blue-400 text-slate-950 text-sm font-medium hover:bg-blue-300 transition-colors"
      >
        Ver equipo completo
      </button>
    </div>
  );
}

export function PiePagina() {
  const navigate = useNavigate();

  const enlacesRapidos = [
    { etiqueta: "Inicio", ruta: "/" },
    { etiqueta: "Servicios", ruta: "/servicios" },
    { etiqueta: "Reservar limpieza", ruta: "/reserva/paso1" },
    { etiqueta: "Equipo", ruta: "/equipo" },
    { etiqueta: "Panel empresa", ruta: "/panel" },
  ];

  return (
    <footer className="relative z-10 w-full bg-gradient-to-br from-[#081326] via-[#0d1f46] to-[#06101f] text-white">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr_1.2fr] gap-8">
          {/* Marca */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-400/15 border border-blue-300/25 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-300" />
              </div>

              <span className="text-2xl font-bold">
                Lim-Pieza
              </span>
            </div>

            <p className="text-blue-100/70 text-sm leading-relaxed max-w-sm">
              Servicios de limpieza profesional para hogares, oficinas y espacios
              especiales.
            </p>

            <p className="text-blue-300/40 text-xs mt-4">
              Calidad, orden y atención personalizada.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h3 className="text-sm uppercase tracking-widest text-blue-300 font-semibold mb-4">
              Contacto
            </h3>

            <ul className="space-y-3 text-sm text-blue-100/75">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+506 8888-8888</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href="mailto:contacto@limpieza.com"
                  className="hover:text-blue-300 transition-colors"
                >
                  contacto@limpieza.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Costa Rica</span>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Lunes a sábado
                  <br />
                  8:00 a.m. – 5:00 p.m.
                </span>
              </li>
            </ul>
          </section>

          {/* Navegación */}
          <section>
            <h3 className="text-sm uppercase tracking-widest text-blue-300 font-semibold mb-4">
              Navegación
            </h3>

            <ul className="space-y-2">
              {enlacesRapidos.map((enlace) => (
                <li key={enlace.etiqueta}>
                  <button
                    type="button"
                    onClick={() => navigate(enlace.ruta)}
                    className="text-blue-100/70 text-sm hover:text-blue-300 transition-colors text-left"
                  >
                    <span className="mr-2 text-blue-400/60">›</span>
                    {enlace.etiqueta}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Carrusel */}
          <section>
            <CarruselEquipo />
          </section>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-blue-300/45 text-xs text-center sm:text-left">
            © 2026 Lim-Pieza. Proyecto académico de arquitectura e implementación web.
          </p>

          <p className="text-blue-300/30 text-xs">
            React + Vite + TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}