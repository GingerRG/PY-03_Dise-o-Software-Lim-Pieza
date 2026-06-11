import {
  Home,
  Car,
  Calendar,
  Repeat,
  Sun,
  Sunset,
  Moon,
  Brush,
  SprayCan,
  Wind,
  Droplets,
  Sparkles,
  Trash2,
  Sofa,
  Bed,
  CookingPot,
  Bath,
  Shirt,
  MessageCircle,
  Phone,
  Mail,
  type LucideIcon,
} from "lucide-react";

import type {
  FrecuenciaServicio,
  HoraPreferida,
  MetodoContacto,
  TamanoEspacio,
  TipoEspacio,
  TipoRecurrente,
  TipoServicio,
  UrgenciaSolicitud,
} from "../models/solicitud.model";

export const ETIQUETAS_PASOS = [
  "Tipo",
  "Horario",
  "Detalles",
  "Fotos",
  "Contacto",
  "Revisar",
];

export const RUTAS_RESERVA = {
  inicio: "/",
  pasoTipo: "/reserva/paso1",
  pasoAgenda: "/reserva/paso2",
  pasoDetalles: "/reserva/paso3",
  pasoFotos: "/reserva/paso4",
  pasoContacto: "/reserva/paso5",
  pasoResumen: "/reserva/paso6",
  confirmacion: "/confirmacion",
};

export interface OpcionConIcono<T extends string> {
  valor: T;
  etiqueta: string;
  descripcion?: string;
  icono: LucideIcon;
}

export const OPCIONES_TIPO_SERVICIO: OpcionConIcono<TipoServicio>[] = [
  {
    valor: "general",
    etiqueta: "Limpieza General",
    descripcion: "Para hogares, habitaciones, oficinas y espacios comunes",
    icono: Home,
  },
  {
    valor: "especifica",
    etiqueta: "Limpieza Específica",
    descripcion: "Para autos, alfombras, colchones, muebles u objetos especiales",
    icono: Car,
  },
];

export const OPCIONES_FRECUENCIA: OpcionConIcono<FrecuenciaServicio>[] = [
  {
    valor: "unico",
    etiqueta: "Servicio Único",
    descripcion: "Una sola cita de limpieza",
    icono: Calendar,
  },
  {
    valor: "recurrente",
    etiqueta: "Servicio Recurrente",
    descripcion: "Limpiezas programadas regularmente",
    icono: Repeat,
  },
];

export const OPCIONES_RECURRENTES: Array<{
  valor: TipoRecurrente;
  etiqueta: string;
  descripcion: string;
}> = [
  {
    valor: "semanal",
    etiqueta: "Semanal",
    descripcion: "Cada semana",
  },
  {
    valor: "quincenal",
    etiqueta: "Quincenal",
    descripcion: "Cada 2 semanas",
  },
  {
    valor: "mensual",
    etiqueta: "Mensual",
    descripcion: "Cada mes",
  },
];

export const OPCIONES_HORARIO: Array<{
  valor: HoraPreferida;
  etiqueta: string;
  horario: string;
  icono: LucideIcon;
  color: string;
}> = [
  {
    valor: "manana",
    etiqueta: "Mañana",
    horario: "8AM - 12PM",
    icono: Sun,
    color: "from-yellow-400/20 to-orange-400/10",
  },
  {
    valor: "tarde",
    etiqueta: "Tarde",
    horario: "12PM - 5PM",
    icono: Sunset,
    color: "from-orange-400/20 to-red-400/10",
  },
  {
    valor: "noche",
    etiqueta: "Noche",
    horario: "5PM - 8PM",
    icono: Moon,
    color: "from-blue-400/20 to-purple-400/10",
  },
];

export const OPCIONES_TIPO_ESPACIO: Array<{
  valor: TipoEspacio;
  etiqueta: string;
}> = [
  { valor: "casa", etiqueta: "Casa" },
  { valor: "habitacion", etiqueta: "Habitación" },
  { valor: "apartamento", etiqueta: "Apartamento" },
  { valor: "oficina", etiqueta: "Oficina" },
  { valor: "negocio", etiqueta: "Negocio" },
  { valor: "otro", etiqueta: "Otro" },
];

export const OPCIONES_TAMANO: Array<{
  valor: TamanoEspacio;
  etiqueta: string;
  rango: string;
}> = [
  { valor: "pequeno", etiqueta: "Pequeño", rango: "< 50 m²" },
  { valor: "mediano", etiqueta: "Mediano", rango: "50-100 m²" },
  { valor: "grande", etiqueta: "Grande", rango: "100-200 m²" },
  { valor: "muy-grande", etiqueta: "Muy Grande", rango: "> 200 m²" },
];

export const OPCIONES_TAREAS = [
  { nombre: "Barrer", icono: Brush },
  { nombre: "Trapear", icono: Droplets },
  { nombre: "Aspirar", icono: Wind },
  { nombre: "Limpiar polvo", icono: Sparkles },
  { nombre: "Desinfectar", icono: SprayCan },
  { nombre: "Sacar basura", icono: Trash2 },
  { nombre: "Limpiar cocina", icono: CookingPot },
  { nombre: "Limpiar baño", icono: Bath },
  { nombre: "Limpiar muebles", icono: Sofa },
  { nombre: "Lavar ropa", icono: Shirt },
  { nombre: "Limpiar colchón", icono: Bed },
  { nombre: "Limpiar vehículo", icono: Car },
];

export const OPCIONES_URGENCIA: Array<{
  valor: UrgenciaSolicitud;
  etiqueta: string;
  color: string;
}> = [
  {
    valor: "normal",
    etiqueta: "Normal",
    color: "from-green-400/20 to-green-500/10",
  },
  {
    valor: "pronto",
    etiqueta: "Pronto",
    color: "from-yellow-400/20 to-yellow-500/10",
  },
  {
    valor: "urgente",
    etiqueta: "Urgente",
    color: "from-red-400/20 to-red-500/10",
  },
];

export const OPCIONES_CONTACTO: Array<{
  valor: MetodoContacto;
  etiqueta: string;
  icono: LucideIcon;
}> = [
  { valor: "whatsapp", etiqueta: "WhatsApp", icono: MessageCircle },
  { valor: "telefono", etiqueta: "Llamada", icono: Phone },
  { valor: "correo", etiqueta: "Correo", icono: Mail },
];