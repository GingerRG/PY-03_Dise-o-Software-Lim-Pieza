import { InputHTMLAttributes, useId } from "react";

interface CampoFormularioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function CampoFormulario({
  label,
  className = "",
  id,
  required,
  ...props
}: CampoFormularioProps) {
  const idGenerado = useId();
  const idCampo = id ?? `campo-${idGenerado.replace(/:/g, "")}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={idCampo} className="block mb-2 text-sm text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        id={idCampo}
        required={required}
        aria-required={required ? "true" : undefined}
        {...props}
        className={`
          w-full px-4 py-3
          backdrop-blur-xl bg-white/60
          border border-white/70
          rounded-xl
          text-gray-700
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-[#4facfe]/50 focus:border-[#4facfe]/50
          transition-all duration-300
          ${className}
        `}
      />
    </div>
  );
}