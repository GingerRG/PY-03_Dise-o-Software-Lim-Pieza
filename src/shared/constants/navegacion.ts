export interface EnlaceNavegacion {
  etiqueta: string;
  ruta: string;
  mostrarEnBarra?: boolean;
  mostrarEnFooter?: boolean;
}

export const enlacesNavegacion: EnlaceNavegacion[] = [
  {
    etiqueta: "Inicio",
    ruta: "/",
    mostrarEnBarra: true,
    mostrarEnFooter: true,
  },
  {
    etiqueta: "Servicios",
    ruta: "/servicios",
    mostrarEnBarra: true,
    mostrarEnFooter: true,
  },
  {
    etiqueta: "Reservar limpieza",
    ruta: "/reserva/paso1",
    mostrarEnBarra: false,
    mostrarEnFooter: true,
  },
  {
    etiqueta: "Equipo",
    ruta: "/equipo",
    mostrarEnBarra: true,
    mostrarEnFooter: true,
  },
  {
    etiqueta: "Panel empresa",
    ruta: "/panel",
    mostrarEnBarra: true,
    mostrarEnFooter: true,
  },
];