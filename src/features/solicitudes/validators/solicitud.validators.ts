import type { SolicitudFormulario } from "../models/solicitud.model";

export interface ResultadoValidacion {
  valido: boolean;
  errores: Record<string, string>;
}

function fechaActualISO() {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");

  return `${año}-${mes}-${dia}`;
}

export function obtenerFechaMinimaReserva() {
  return fechaActualISO();
}

export function validarNombre(nombre: string): string {
  const valor = nombre.trim();

  if (!valor) {
    return "El nombre es obligatorio.";
  }

  if (valor.length < 3) {
    return "El nombre debe tener al menos 3 caracteres.";
  }

  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(valor)) {
    return "El nombre solo debe contener letras y espacios.";
  }

  return "";
}

export function validarTelefono(telefono: string): string {
  const valor = telefono.trim();

  if (!valor) {
    return "El teléfono es obligatorio.";
  }

  if (!/^[0-9+\-\s()]+$/.test(valor)) {
    return "El teléfono solo debe contener números y símbolos como +, -, ( ).";
  }

  const soloNumeros = valor.replace(/\D/g, "");

  if (soloNumeros.length < 8) {
    return "El teléfono debe tener al menos 8 números.";
  }

  return "";
}

export function validarCorreo(correo: string): string {
  const valor = correo.trim();

  if (!valor) {
    return "El correo es obligatorio.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
    return "Ingrese un correo electrónico válido.";
  }

  return "";
}

export function validarDireccion(direccion: string): string {
  const valor = direccion.trim();

  if (!valor) {
    return "La dirección es obligatoria.";
  }

  if (valor.length < 8) {
    return "La dirección debe ser más específica.";
  }

  return "";
}

export function validarFechaReserva(fecha: string): string {
  if (!fecha) {
    return "La fecha es obligatoria.";
  }

  const fechaMinima = obtenerFechaMinimaReserva();

  if (fecha < fechaMinima) {
    return "No se puede agendar una fecha anterior a hoy.";
  }

  return "";
}

export function validarPasoAgenda(solicitud: SolicitudFormulario): ResultadoValidacion {
  const errores: Record<string, string> = {};

  const errorFecha = validarFechaReserva(solicitud.fecha);

  if (errorFecha) {
    errores.fecha = errorFecha;
  }

  if (!solicitud.frecuencia) {
    errores.frecuencia = "Debe seleccionar una frecuencia.";
  }

  if (solicitud.frecuencia === "recurrente" && !solicitud.tipoRecurrente) {
    errores.tipoRecurrente = "Debe seleccionar cada cuánto se repetirá el servicio.";
  }

  if (!solicitud.hora) {
    errores.hora = "Debe seleccionar una hora preferida.";
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores,
  };
}

export function validarPasoDetalles(solicitud: SolicitudFormulario): ResultadoValidacion {
  const errores: Record<string, string> = {};

  if (!solicitud.tipoEspacio) {
    errores.tipoEspacio = "Debe seleccionar el tipo de espacio.";
  }

  if (!solicitud.tamano) {
    errores.tamano = "Debe seleccionar el tamaño aproximado.";
  }

  if (solicitud.habitaciones < 1 || solicitud.habitaciones > 10) {
    errores.habitaciones = "El número de habitaciones debe estar entre 1 y 10.";
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores,
  };
}

export function validarPasoContacto(solicitud: SolicitudFormulario): ResultadoValidacion {
  const errores: Record<string, string> = {};
  const contacto = solicitud.contacto;

  const errorNombre = validarNombre(contacto.nombreCompleto);
  const errorTelefono = validarTelefono(contacto.telefono);
  const errorCorreo = validarCorreo(contacto.correo);
  const errorDireccion = validarDireccion(contacto.direccion);

  if (errorNombre) errores.nombreCompleto = errorNombre;
  if (errorTelefono) errores.telefono = errorTelefono;
  if (errorCorreo) errores.correo = errorCorreo;
  if (errorDireccion) errores.direccion = errorDireccion;

  if (!contacto.metodoContacto) {
    errores.metodoContacto = "Debe seleccionar un método de contacto.";
  }

  if (!contacto.aceptaTerminos) {
    errores.aceptaTerminos = "Debe aceptar el uso de sus datos para continuar.";
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores,
  };
}