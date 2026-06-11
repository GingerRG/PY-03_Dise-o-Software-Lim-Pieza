import { useState } from "react";
import { useNavigate } from "react-router";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { IndicadorPasos } from "../components/IndicadorPasos";
import { CampoFormulario } from "../components/CampoFormulario";
import { FondoBurbujas } from "../components/FondoBurbujas";
import { Sparkles, Phone, Mail, MessageCircle } from "lucide-react";

export function PasoContacto() {
  const navigate = useNavigate();
  const [datosFormulario, setDatosFormulario] = useState({
    nombreCompleto: "",
    telefono: "",
    correo: "",
    direccion: ""
  });
  const [metodoContacto, setMetodoContacto] = useState<string>("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const irSiguiente = () => {
    if (datosFormulario.nombreCompleto && datosFormulario.telefono && datosFormulario.correo && datosFormulario.direccion && metodoContacto && aceptaTerminos) {
      navigate("/reserva/paso6");
    }
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
          pasoActual={5}
          totalPasos={6}
          etiquetas={["Tipo", "Horario", "Detalles", "Fotos", "Contacto", "Revisar"]}
        />

        <Tarjeta className="p-8">
          <h2 className="mb-2 text-gray-800 text-center">Información Personal y de Contacto</h2>
          <p className="mb-8 text-sm text-gray-500 text-center">
            Este formulario puede completarse usando teclado. Los campos obligatorios están marcados con asterisco.
          </p>

          <div className="space-y-6 mb-8">
            <CampoFormulario
              label="Nombre completo"
              type="text"
              placeholder="Juan Pérez"
              required
              value={datosFormulario.nombreCompleto}
              onChange={(e) => setDatosFormulario({ ...datosFormulario, nombreCompleto: e.target.value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CampoFormulario
                label="Número de Teléfono"
                type="tel"
                placeholder="+52 (555) 000-0000"
                value={datosFormulario.telefono}
                onChange={(e) => setDatosFormulario({ ...datosFormulario, telefono: e.target.value })}
              />
              <CampoFormulario
                label="Correo Electrónico"
                type="email"
                placeholder="juan@ejemplo.com"
                value={datosFormulario.correo}
                onChange={(e) => setDatosFormulario({ ...datosFormulario, correo: e.target.value })}
              />
            </div>

            <CampoFormulario
              label="Dirección Exacta"
              type="text"
              placeholder="Calle Principal 123, Ciudad, Estado 12345"
              value={datosFormulario.direccion}
              onChange={(e) => setDatosFormulario({ ...datosFormulario, direccion: e.target.value })}
            />

            <div>
              <label className="block mb-3 text-sm text-gray-700">Método de Contacto Preferido</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: "whatsapp", label: "WhatsApp", icon: <MessageCircle className="w-5 h-5" /> },
                  { value: "telefono", label: "Llamada", icon: <Phone className="w-5 h-5" /> },
                  { value: "correo", label: "Correo", icon: <Mail className="w-5 h-5" /> }
                ].map((method) => (
                  <button
                    key={method.value}
                    onClick={() => setMetodoContacto(method.value)}
                    className={`
                      p-4 rounded-xl flex items-center justify-center gap-2 transition-all backdrop-blur-xl border
                      ${metodoContacto === method.value
                        ? "bg-white/40 border-[#4facfe] text-gray-800"
                        : "bg-white/20 border-white/40 text-gray-600 hover:bg-white/30"
                      }
                    `}
                  >
                    {method.icon}
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-white/70 text-[#4facfe] focus:ring-[#4facfe]/50"
              />
              <span className="text-sm text-gray-600">
                Acepto el procesamiento de mis datos personales con el propósito de esta reserva de servicio de limpieza. Entiendo que mi información será manejada de forma segura y utilizada únicamente para proporcionar los servicios solicitados.
              </span>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <Boton onClick={() => navigate("/reserva/paso4")} variante="simple">
              Atrás
            </Boton>
            <Boton
              onClick={irSiguiente}
              disabled={!datosFormulario.nombreCompleto || !datosFormulario.telefono || !datosFormulario.correo || !datosFormulario.direccion || !metodoContacto || !aceptaTerminos}
            >
              Siguiente
            </Boton>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}
