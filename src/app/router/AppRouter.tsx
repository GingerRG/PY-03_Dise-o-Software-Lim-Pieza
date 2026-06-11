import { Routes, Route } from "react-router";

import { Inicio } from "../../pages/public/Inicio";
import { Servicios } from "../../pages/public/Servicios";
import { Equipo } from "../../pages/public/Equipo";
import { Confirmacion } from "../../pages/public/Confirmacion";

import { PanelEmpresa } from "../../pages/private/PanelEmpresa";

import { PasoTipoLimpieza } from "../../features/solicitudes/views/PasoTipoLimpieza";
import { PasoAgenda } from "../../features/solicitudes/views/PasoAgenda";
import { PasoDetalles } from "../../features/solicitudes/views/PasoDetalles";
import { PasoFotos } from "../../features/solicitudes/views/PasoFotos";
import { PasoContacto } from "../../features/solicitudes/views/PasoContacto";
import { PasoResumen } from "../../features/solicitudes/views/PasoResumen";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/equipo" element={<Equipo />} />

      <Route path="/reserva/paso1" element={<PasoTipoLimpieza />} />
      <Route path="/reserva/paso2" element={<PasoAgenda />} />
      <Route path="/reserva/paso3" element={<PasoDetalles />} />
      <Route path="/reserva/paso4" element={<PasoFotos />} />
      <Route path="/reserva/paso5" element={<PasoContacto />} />
      <Route path="/reserva/paso6" element={<PasoResumen />} />

      <Route path="/confirmacion" element={<Confirmacion />} />
      <Route path="/panel" element={<PanelEmpresa />} />

      
    </Routes>
  );
}