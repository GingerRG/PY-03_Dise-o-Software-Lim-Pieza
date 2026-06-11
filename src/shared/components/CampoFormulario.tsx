import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { combinarClases } from "../utils/combinarClases";

interface CampoFormularioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  ayuda?: string;
  mensajeError?: string;
  contenedorClassName?: string;
}

export function CampoFormulario({
  label,
  ayuda,
  mensajeError,
  contenedorClassName,
  className,
  id,
  required,
  ...props
}: CampoFormularioProps) {
  const idGenerado = useId();
  const idCampo = id ?? `campo-${idGenerado.replace(/:/g, "")}`;
  const idAyuda = ayuda ? `${idCampo}-ayuda` : undefined;
  const idError = mensajeError ? `${idCampo}-error` : undefined;

  const descripcion = [idAyuda, idError].filter(Boolean).join(" ") || undefined;

  return (
    <div className={combinarClases("w-full", contenedorClassName)}>
      {label && (
        <label htmlFor={idCampo} className="block mb-2 text-sm text-gray-700">
          {label}

          {required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <input
        id={idCampo}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-invalid={mensajeError ? "true" : undefined}
        aria-describedby={descripcion}
        className={combinarClases(
          `
            w-full px-4 py-3
            backdrop-blur-xl bg-white/60
            border border-white/70
            rounded-xl
            text-gray-700
            placeholder:text-gray-400
            focus:outline-none
            focus:ring-2 focus:ring-[#4facfe]/50
            focus:border-[#4facfe]/50
            transition-all duration-300
          `,
          mensajeError && "border-red-400 focus:ring-red-300 focus:border-red-400",
          className
        )}
        {...props}
      />

      {ayuda && (
        <p id={idAyuda} className="mt-1 text-xs text-gray-500">
          {ayuda}
        </p>
      )}

      {mensajeError && (
        <p id={idError} className="mt-1 text-xs text-red-500">
          {mensajeError}
        </p>
      )}
    </div>
  );
}