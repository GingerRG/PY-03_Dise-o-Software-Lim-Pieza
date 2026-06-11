import type {
  EstadoSolicitud,
  SolicitudFormulario,
  SolicitudRegistrada,
} from "../models/solicitud.model";

import {
  actualizarEstadoSolicitud,
  eliminarSolicitud,
  guardarSolicitud,
  obtenerSolicitudPorId,
  obtenerSolicitudes,
} from "../repositories/solicitud.repository";

function generarIdSolicitud() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `SOL-${Date.now()}`;
}

export function registrarSolicitud(
  solicitudFormulario: SolicitudFormulario
): SolicitudRegistrada {
  const solicitudRegistrada: SolicitudRegistrada = {
    ...solicitudFormulario,
    id: generarIdSolicitud(),
    estado: "Pendiente",
    fechaCreacion: new Date().toISOString(),
    cantidadFotos: solicitudFormulario.archivos.length,
    nombresFotos: solicitudFormulario.archivos.map((archivo) => archivo.name),
  };

  guardarSolicitud(solicitudRegistrada);

  return solicitudRegistrada;
}

export function listarSolicitudes(): SolicitudRegistrada[] {
  return obtenerSolicitudes();
}

export function buscarSolicitud(id: string): SolicitudRegistrada | null {
  return obtenerSolicitudPorId(id);
}

export function cambiarEstadoSolicitud(
  id: string,
  nuevoEstado: EstadoSolicitud
) {
  actualizarEstadoSolicitud(id, nuevoEstado);
}

export function borrarSolicitud(id: string) {
  eliminarSolicitud(id);
}