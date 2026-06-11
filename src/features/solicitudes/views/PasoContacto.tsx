import { useNavigate } from "react-router";

import { Tarjeta } from "../../../shared/components/Tarjeta";
import { Boton } from "../../../shared/components/Boton";
import { IndicadorPasos } from "../../../shared/components/IndicadorPasos";
import { CampoFormulario } from "../../../shared/components/CampoFormulario";
import { FondoBurbujas } from "../../../shared/components/FondoBurbujas";
import { combinarClases } from "../../../shared/utils/combinarClases";

import { useState } from "react";
import { validarPasoContacto } from "../validators/solicitud.validators";

import { useSolicitud } from "../context/SolicitudProvider";
import {
  ETIQUETAS_PASOS,
  OPCIONES_CONTACTO,
  RUTAS_RESERVA,
} from "../constants/solicitud.constants";
import type { MetodoContacto } from "../models/solicitud.model";

export function PasoContacto() {
  const navigate = useNavigate();
  const { solicitud, actualizarContacto } = useSolicitud();

  const contacto = solicitud.contacto;

  const puedeContinuar =
    contacto.nombreCompleto.trim() !== "" &&
    contacto.telefono.trim() !== "" &&
    contacto.correo.trim() !== "" &&
    contacto.direccion.trim() !== "" &&
    contacto.metodoContacto !== "" &&
    contacto.aceptaTerminos;

  function seleccionarMetodoContacto(metodoContacto: MetodoContacto) {
    actualizarContacto({ metodoContacto });
  }

  const [errores, setErrores] = useState<Record<string, string>>({});

  function irSiguiente() {
    const resultado = validarPasoContacto(solicitud);

    setErrores(resultado.errores);

    if (!resultado.valido) return;

    navigate(RUTAS_RESERVA.pasoResumen);
  }

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <FondoBurbujas />

      <div className="max-w-4xl mx-auto relative z-10">
        <IndicadorPasos
          pasoActual={5}
          totalPasos={6}
          etiquetas={ETIQUETAS_PASOS}
        />

        <Tarjeta className="p-8">
          <h2 className="mb-2 text-gray-800 text-center">
            Información Personal y de Contacto
          </h2>

          <p className="mb-8 text-sm text-gray-500 text-center">
            Este formulario puede completarse usando teclado. Los campos
            obligatorios están marcados con asterisco.
          </p>

          <div className="space-y-6 mb-8">
            <CampoFormulario
              label="Nombre completo"
              type="text"
              placeholder="Juan Pérez"
              required
              value={contacto.nombreCompleto}
              mensajeError={errores.nombreCompleto}
              onChange={(evento) =>
                actualizarContacto({
                  nombreCompleto: evento.target.value,
                })
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CampoFormulario
                label="Número de teléfono"
                type="tel"
                placeholder="8888-8888"
                required
                value={contacto.telefono}
                mensajeError={errores.telefono}
                onChange={(evento) =>
                  actualizarContacto({ telefono: evento.target.value })
                }
              />

              <CampoFormulario
                label="Correo electrónico"
                type="email"
                placeholder="correo@ejemplo.com"
                required
                value={contacto.correo}
                mensajeError={errores.correo}
                onChange={(evento) =>
                  actualizarContacto({ correo: evento.target.value })
                }
              />
            </div>

            <CampoFormulario
              label="Dirección exacta"
              type="text"
              placeholder="Provincia, cantón, distrito y señas"
              required
              value={contacto.direccion}
              mensajeError={errores.direccion}
              onChange={(evento) =>
                actualizarContacto({ direccion: evento.target.value })
              }
            />

            <div>
              <label className="block mb-3 text-sm text-gray-700">
                Método de contacto preferido
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {OPCIONES_CONTACTO.map((opcion) => {
                  const Icono = opcion.icono;
                  const seleccionado =
                    contacto.metodoContacto === opcion.valor;

                  return (
                    <button
                      key={opcion.valor}
                      type="button"
                      onClick={() =>
                        seleccionarMetodoContacto(opcion.valor)
                      }
                      aria-pressed={seleccionado}
                      className={combinarClases(
                        `
                          p-4 rounded-xl
                          flex items-center justify-center gap-2
                          transition-all backdrop-blur-xl border
                        `,
                        seleccionado
                          ? "bg-white/40 border-[#4facfe] text-gray-800"
                          : "bg-white/20 border-white/40 text-gray-600 hover:bg-white/30"
                      )}
                    >
                      <Icono className="w-5 h-5" />
                      {opcion.etiqueta}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={contacto.aceptaTerminos}
                onChange={(evento) =>
                  actualizarContacto({
                    aceptaTerminos: evento.target.checked,
                  })
                }
                className="
                  mt-1 w-5 h-5 rounded
                  border-white/70 text-[#4facfe]
                  focus:ring-[#4facfe]/50
                "
              />

              <span className="text-sm text-gray-600">
                Acepto el procesamiento de mis datos personales con el propósito
                de esta reserva de servicio de limpieza. Entiendo que mi
                información será manejada de forma segura y utilizada únicamente
                para proporcionar los servicios solicitados.
              </span>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <Boton
              onClick={() => navigate(RUTAS_RESERVA.pasoFotos)}
              variante="simple"
            >
              Atrás
            </Boton>

            <Boton onClick={irSiguiente} disabled={!puedeContinuar}>
              Siguiente
            </Boton>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}