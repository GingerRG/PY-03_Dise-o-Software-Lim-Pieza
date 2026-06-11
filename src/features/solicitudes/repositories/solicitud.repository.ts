import type {
  EstadoSolicitud,
  SolicitudRegistrada,
} from "../models/solicitud.model";

const CLAVE_SOLICITUDES = "limpieza_solicitudes_registradas";

function leerStorage(): SolicitudRegistrada[] {
  const datosGuardados = localStorage.getItem(CLAVE_SOLICITUDES);

  if (!datosGuardados) {
    return [];
  }

  try {
    const datos = JSON.parse(datosGuardados);

    if (!Array.isArray(datos)) {
      return [];
    }

    return datos;
  } catch {
    return [];
  }
}

function escribirStorage(solicitudes: SolicitudRegistrada[]) {
  localStorage.setItem(CLAVE_SOLICITUDES, JSON.stringify(solicitudes));
}

export function obtenerSolicitudes(): SolicitudRegistrada[] {
  return leerStorage();
}

export function guardarSolicitud(solicitud: SolicitudRegistrada) {
  const solicitudes = obtenerSolicitudes();

  const solicitudesActualizadas = [solicitud, ...solicitudes];

  escribirStorage(solicitudesActualizadas);
}

export function obtenerSolicitudPorId(id: string): SolicitudRegistrada | null {
  const solicitudes = obtenerSolicitudes();

  return solicitudes.find((solicitud) => solicitud.id === id) ?? null;
}

export function actualizarEstadoSolicitud(
  id: string,
  nuevoEstado: EstadoSolicitud
) {
  const solicitudes = obtenerSolicitudes();

  const solicitudesActualizadas = solicitudes.map((solicitud) =>
    solicitud.id === id
      ? {
          ...solicitud,
          estado: nuevoEstado,
        }
      : solicitud
  );

  escribirStorage(solicitudesActualizadas);
}

export function eliminarSolicitud(id: string) {
  const solicitudes = obtenerSolicitudes();

  const solicitudesActualizadas = solicitudes.filter(
    (solicitud) => solicitud.id !== id
  );

  escribirStorage(solicitudesActualizadas);
}