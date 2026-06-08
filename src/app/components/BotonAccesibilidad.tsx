interface BotonAccesibilidadProps {
  reducirMovimiento: boolean;
  alCambiar: (valor: boolean) => void;
}

export function BotonAccesibilidad({
  reducirMovimiento,
  alCambiar
}: BotonAccesibilidadProps) {
  return (
    <button
      type="button"
      aria-pressed={reducirMovimiento}
      aria-label="Activar o desactivar la reducción de animaciones"
      onClick={() => alCambiar(!reducirMovimiento)}
      className="
        fixed bottom-4 right-4 z-50
        px-4 py-3 rounded-full
        backdrop-blur-xl bg-white/70
        border border-white/80
        shadow-lg text-sm text-gray-700
        hover:bg-white/90 transition-all
      "
    >
      {reducirMovimiento ? "Animaciones reducidas" : "Reducir animaciones"}
    </button>
  );
}