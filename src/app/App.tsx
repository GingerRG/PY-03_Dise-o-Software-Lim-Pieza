import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { MotionConfig } from "motion/react";

import { Inicio } from "./views/Inicio";
import { Servicios } from "./views/Servicios";
import { PasoTipoLimpieza } from "./views/PasoTipoLimpieza";
import { PasoAgenda } from "./views/PasoAgenda";
import { PasoDetalles } from "./views/PasoDetalles";
import { PasoFotos } from "./views/PasoFotos";
import { PasoContacto } from "./views/PasoContacto";
import { PasoResumen } from "./views/PasoResumen";
import { Confirmacion } from "./views/Confirmacion";
import { PanelEmpresa } from "./views/PanelEmpresa";
import { BotonAccesibilidad } from "./components/BotonAccesibilidad";
import { Equipo } from "./views/Equipo";
import { BarraSuperior } from "./components/BarraSuperior";


export default function App() {
  const [reducirMovimiento, setReducirMovimiento] = useState(() => {
    if (typeof window === "undefined") return false;

    const guardado = localStorage.getItem("reducirMovimiento");

    if (guardado !== null) {
      return guardado === "true";
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    document.body.classList.toggle("reducir-movimiento", reducirMovimiento);
    document.documentElement.classList.toggle("reducir-movimiento", reducirMovimiento);
    localStorage.setItem("reducirMovimiento", String(reducirMovimiento));
  }, [reducirMovimiento]);

  return (
    <MotionConfig reducedMotion={reducirMovimiento ? "always" : "user"}>
      <BrowserRouter>
        <BarraSuperior />
        <BotonAccesibilidad
          reducirMovimiento={reducirMovimiento}
          alCambiar={setReducirMovimiento}
        />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/reserva/paso1" element={<PasoTipoLimpieza />} />
          <Route path="/reserva/paso2" element={<PasoAgenda />} />
          <Route path="/reserva/paso3" element={<PasoDetalles />} />
          <Route path="/reserva/paso4" element={<PasoFotos />} />
          <Route path="/reserva/paso5" element={<PasoContacto />} />
          <Route path="/reserva/paso6" element={<PasoResumen />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/panel" element={<PanelEmpresa />} />
          <Route path="/equipo" element={<Equipo />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}