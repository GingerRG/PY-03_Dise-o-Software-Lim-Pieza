import { useState } from "react";
import { useNavigate } from "react-router";
import { Tarjeta } from "../components/Tarjeta";
import { Boton } from "../components/Boton";
import { IndicadorPasos } from "../components/IndicadorPasos";
import { TarjetaServicio } from "../components/TarjetaServicio";
import { FondoBurbujas } from "../components/FondoBurbujas";
import { Home, Car, Sparkles } from "lucide-react";

export function PasoTipoLimpieza() {
  const navigate = useNavigate();
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("");

  const irSiguiente = () => {
    if (tipoSeleccionado) {
      navigate("/reserva/paso2");
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
          pasoActual={1}
          totalPasos={6}
          etiquetas={["Tipo", "Horario", "Detalles", "Fotos", "Contacto", "Revisar"]}
        />

        <Tarjeta className="p-8">
          <h2 className="mb-2 text-gray-800 text-center">Elige el Tipo de Limpieza</h2>
          <p className="mb-8 text-gray-600 text-center">
            Selecciona el tipo de servicio de limpieza que necesitas
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <TarjetaServicio
              icon={<Home className="w-12 h-12" />}
              titulo="Limpieza General"
              descripcion="Para hogares, habitaciones, oficinas y espacios comunes"
              onClick={() => setTipoSeleccionado("general")}
              seleccionado={tipoSeleccionado === "general"}
            />
            <TarjetaServicio
              icon={<Car className="w-12 h-12" />}
              titulo="Limpieza Específica"
              descripcion="Para autos, alfombras, colchones, muebles u objetos especiales"
              onClick={() => setTipoSeleccionado("especifica")}
              seleccionado={tipoSeleccionado === "especifica"}
            />
          </div>

          <div className="flex items-center justify-between">
            <Boton onClick={() => navigate("/")} variante="simple">
              Atrás
            </Boton>
            <Boton onClick={irSiguiente} disabled={!tipoSeleccionado}>
              Siguiente
            </Boton>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}
