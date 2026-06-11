import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { SolicitudFormulario } from "../models/solicitud.model";

const CLAVE_STORAGE = "limpieza_formulario_solicitud";

const solicitudInicial: SolicitudFormulario = {
  tipoServicio: "",

  frecuencia: "",
  tipoRecurrente: "",
  fecha: "",
  hora: "",

  tipoEspacio: "",
  habitaciones: 1,
  tamano: "",
  tareas: [],
  urgencia: "normal",

  archivos: [],
  notas: "",

  contacto: {
    nombreCompleto: "",
    telefono: "",
    correo: "",
    direccion: "",
    metodoContacto: "",
    aceptaTerminos: false,
  },
};

interface SolicitudContextValue {
  solicitud: SolicitudFormulario;
  actualizarSolicitud: (datos: Partial<SolicitudFormulario>) => void;
  actualizarContacto: (
    datos: Partial<SolicitudFormulario["contacto"]>
  ) => void;
  reiniciarSolicitud: () => void;
}

const SolicitudContext = createContext<SolicitudContextValue | null>(null);

function cargarSolicitudGuardada(): SolicitudFormulario {
  if (typeof window === "undefined") {
    return solicitudInicial;
  }

  const datosGuardados = localStorage.getItem(CLAVE_STORAGE);

  if (!datosGuardados) {
    return solicitudInicial;
  }

  try {
    const datos = JSON.parse(datosGuardados);

    return {
      ...solicitudInicial,
      ...datos,
      archivos: [],
      contacto: {
        ...solicitudInicial.contacto,
        ...datos.contacto,
      },
    };
  } catch {
    return solicitudInicial;
  }
}

export function SolicitudProvider({ children }: { children: ReactNode }) {
  const [solicitud, setSolicitud] = useState<SolicitudFormulario>(
    cargarSolicitudGuardada
  );

  useEffect(() => {
    const { archivos, ...datosPersistibles } = solicitud;

    localStorage.setItem(
      CLAVE_STORAGE,
      JSON.stringify(datosPersistibles)
    );
  }, [solicitud]);

  function actualizarSolicitud(datos: Partial<SolicitudFormulario>) {
    setSolicitud((actual) => ({
      ...actual,
      ...datos,
    }));
  }

  function actualizarContacto(
    datos: Partial<SolicitudFormulario["contacto"]>
  ) {
    setSolicitud((actual) => ({
      ...actual,
      contacto: {
        ...actual.contacto,
        ...datos,
      },
    }));
  }

  function reiniciarSolicitud() {
    localStorage.removeItem(CLAVE_STORAGE);
    setSolicitud(solicitudInicial);
  }

  return (
    <SolicitudContext.Provider
      value={{
        solicitud,
        actualizarSolicitud,
        actualizarContacto,
        reiniciarSolicitud,
      }}
    >
      {children}
    </SolicitudContext.Provider>
  );
}

export function useSolicitud() {
  const contexto = useContext(SolicitudContext);

  if (!contexto) {
    throw new Error("useSolicitud debe usarse dentro de SolicitudProvider");
  }

  return contexto;
}