import { useState } from "react";
import { useNavigate } from "react-router";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { IndicadorPasos } from "../components/IndicadorPasos";
import { CajaSubida } from "../components/CajaSubida";
import { FondoBurbujas } from "../components/FondoBurbujas";
import { Sparkles } from "lucide-react";

export function PasoFotos() {
  const navigate = useNavigate();
  const [archivos, setArchivos] = useState<File[]>([]);
  const [notas, setNotas] = useState<string>("");

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
          pasoActual={4}
          totalPasos={6}
          etiquetas={["Tipo", "Horario", "Detalles", "Fotos", "Contacto", "Revisar"]}
        />

        <Tarjeta className="p-8">
          <h2 className="mb-2 text-gray-800 text-center">Fotos y Notas Especiales</h2>
          <p className="mb-8 text-gray-600 text-center">
            Sube fotos para ayudarnos a entender tu espacio (opcional)
          </p>

          <div className="space-y-6 mb-8">
            <CajaSubida archivos={archivos} alCambiarArchivos={setArchivos} />

            <div>
              <label className="block mb-2 text-sm text-gray-700">Notas Especiales o Instrucciones</label>
              <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Áreas específicas o preocupaciones que te gustaría que conociéramos..."
                rows={4}
                className="w-full px-4 py-3 backdrop-blur-xl bg-white/60 border border-white/70 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4facfe]/50 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Boton onClick={() => navigate("/reserva/paso3")} variante="simple">
              Atrás
            </Boton>
            <Boton onClick={() => navigate("/reserva/paso5")}>
              Siguiente
            </Boton>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}
