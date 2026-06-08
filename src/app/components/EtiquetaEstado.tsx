type Estado = "Pendiente" | "Cotizada" | "Confirmada" | "Completada" | "Cancelada";

interface EtiquetaEstadoProps {
  estado: Estado;
}

export function EtiquetaEstado({ estado }: EtiquetaEstadoProps) {
  const colores = {
    Pendiente: "bg-yellow-100/80 text-yellow-700 border-yellow-300/50",
    Cotizada: "bg-blue-100/80 text-blue-700 border-blue-300/50",
    Confirmada: "bg-green-100/80 text-green-700 border-green-300/50",
    Completada: "bg-gray-100/80 text-gray-700 border-gray-300/50",
    Cancelada: "bg-red-100/80 text-red-700 border-red-300/50"
  };

  const etiquetas = {
    Pendiente: "Pendiente",
    Cotizada: "Cotizado",
    Confirmada: "Confirmado",
    Completada: "Completado",
    Cancelada: "Cancelado"
  };

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs
        backdrop-blur-sm border
        ${colores[estado]}
      `}
    >
      {etiquetas[estado]}
    </span>
  );
}
