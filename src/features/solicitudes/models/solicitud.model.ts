export type TipoServicio = "" | "general" | "especifica";

export type FrecuenciaServicio = "" | "unico" | "recurrente";

export type TipoRecurrente = "" | "semanal" | "quincenal" | "mensual";

export type HoraPreferida = "" | "manana" | "tarde" | "noche";

export type TipoEspacio =
  | ""
  | "casa"
  | "habitacion"
  | "apartamento"
  | "oficina"
  | "negocio"
  | "otro";

export type TamanoEspacio =
  | ""
  | "pequeno"
  | "mediano"
  | "grande"
  | "muy-grande";

export type UrgenciaSolicitud = "normal" | "pronto" | "urgente";

export type MetodoContacto = "" | "whatsapp" | "telefono" | "correo";

export interface DatosContacto {
  nombreCompleto: string;
  telefono: string;
  correo: string;
  direccion: string;
  metodoContacto: MetodoContacto;
  aceptaTerminos: boolean;
}

export interface SolicitudFormulario {
  tipoServicio: TipoServicio;

  frecuencia: FrecuenciaServicio;
  tipoRecurrente: TipoRecurrente;
  fecha: string;
  hora: HoraPreferida;

  tipoEspacio: TipoEspacio;
  habitaciones: number;
  tamano: TamanoEspacio;
  tareas: string[];
  urgencia: UrgenciaSolicitud;

  archivos: File[];
  notas: string;

  contacto: DatosContacto;
}

export type EstadoSolicitud =
  | "Pendiente"
  | "Cotizada"
  | "Confirmada"
  | "Completada"
  | "Cancelada";

export interface SolicitudRegistrada
  extends Omit<SolicitudFormulario, "archivos"> {
  id: string;
  estado: EstadoSolicitud;
  fechaCreacion: string;
  cantidadFotos: number;
  nombresFotos: string[];
}