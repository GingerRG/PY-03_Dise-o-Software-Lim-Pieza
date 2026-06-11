import { useEffect, useState } from "react";

export function usePreferenciasAccesibilidad() {
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
    document.documentElement.classList.toggle(
      "reducir-movimiento",
      reducirMovimiento
    );

    localStorage.setItem("reducirMovimiento", String(reducirMovimiento));
  }, [reducirMovimiento]);

  return {
    reducirMovimiento,
    setReducirMovimiento,
  };
}