export interface MiembroEquipo {
  nombre: string;
  rol: string;
  foto: string;
  descripcion: string;
}

export const miembrosEquipo: MiembroEquipo[] = [
  {
    nombre: "Emilio Funes",
    rol: "Fundador / Coordinador general",
    foto: "/equipo/emilio.jpeg",
    descripcion:
      "Encargado de coordinar la visión general del servicio, organizar la propuesta de valor y supervisar que cada solicitud sea atendida correctamente.",
  },
  {
    nombre: "Ginger Rodríguez",
    rol: "Administración / Atención al cliente",
    foto: "/equipo/ginger.jpeg",
    descripcion:
      "Responsable de la comunicación con los clientes, el seguimiento de solicitudes y la atención personalizada durante el proceso de reserva.",
  },
  {
    nombre: "Jareck Levell",
    rol: "Coordinador operativo / Personal de limpieza",
    foto: "/equipo/jareck.jpeg",
    descripcion:
      "Encargado de la coordinación operativa del servicio, la organización del personal y el cumplimiento de las tareas de limpieza solicitadas.",
  },
];