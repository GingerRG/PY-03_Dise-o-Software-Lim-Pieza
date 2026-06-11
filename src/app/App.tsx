import { BrowserRouter } from "react-router";
import { MotionConfig } from "motion/react";

import { AppRouter } from "./router/AppRouter";
import { BarraSuperior } from "../shared/components/BarraSuperior";
import { usePreferenciasAccesibilidad } from "./hooks/usePreferenciasAccesibilidad";
import { BotonAccesibilidad } from "../shared/components/BotonAccesibilidad";
import { SolicitudProvider } from "../features/solicitudes/context/SolicitudProvider";


export default function App() {
  const { reducirMovimiento, setReducirMovimiento } =
    usePreferenciasAccesibilidad();

  return (
    <MotionConfig reducedMotion={reducirMovimiento ? "always" : "user"}>
      <BrowserRouter>
        <BarraSuperior />

        <BotonAccesibilidad
          reducirMovimiento={reducirMovimiento}
          alCambiar={setReducirMovimiento}
        />

        <SolicitudProvider>
          <AppRouter />
        </SolicitudProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}