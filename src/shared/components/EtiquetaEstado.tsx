import type { HTMLAttributes } from "react";
import { combinarClases } from "../utils/combinarClases";

export type EstadoSolicitud =
  | "Pendiente"
  | "Cotizada"
  | "Confirmada"
  | "Completada"
  | "Cancelada";

interface EtiquetaEstadoProps extends HTMLAttributes<HTMLSpanElement> {
  estado: EstadoSolicitud;
}

const estilosPorEstado: Record<EstadoSolicitud, string> = {
  Pendiente: "bg-yellow-100/80 text-yellow-700 border-yellow-300/50",
  Cotizada: "bg-blue-100/80 text-blue-700 border-blue-300/50",
  Confirmada: "bg-green-100/80 text-green-700 border-green-300/50",
  Completada: "bg-gray-100/80 text-gray-700 border-gray-300/50",
  Cancelada: "bg-red-100/80 text-red-700 border-red-300/50",
};

const textoPorEstado: Record<EstadoSolicitud, string> = {
  Pendiente: "Pendiente",
  Cotizada: "Cotizado",
  Confirmada: "Confirmado",
  Completada: "Completado",
  Cancelada: "Cancelado",
};

export function EtiquetaEstado({
  estado,
  className,
  ...props
}: EtiquetaEstadoProps) {
  return (
    <span
      className={combinarClases(
        `
          inline-flex items-center justify-center
          px-3 py-1 rounded-full
          text-xs font-medium
          backdrop-blur-sm border
        `,
        estilosPorEstado[estado],
        className
      )}
      aria-label={`Estado de la solicitud: ${textoPorEstado[estado]}`}
      {...props}
    >
      {textoPorEstado[estado]}
    </span>
  );
}