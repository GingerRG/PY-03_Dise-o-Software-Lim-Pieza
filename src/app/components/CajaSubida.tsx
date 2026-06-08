import { Upload, X } from "lucide-react";
import { useState, DragEvent, ChangeEvent } from "react";
import { Tarjeta } from "./Tarjeta";
import { motion, AnimatePresence } from "motion/react";

interface CajaSubidaProps {
  alCambiarArchivos: (archivos: File[]) => void;
  archivos: File[];
}

export function CajaSubida({ alCambiarArchivos, archivos }: CajaSubidaProps) {
  const [estaArrastrando, setEstaArrastrando] = useState(false);

  const manejarArrastre = (evento: DragEvent<HTMLDivElement>) => {
    evento.preventDefault();
    setEstaArrastrando(true);
  };

  const terminarArrastre = () => {
    setEstaArrastrando(false);
  };

  const soltarArchivos = (evento: DragEvent<HTMLDivElement>) => {
    evento.preventDefault();
    setEstaArrastrando(false);

    const archivosSoltados = Array.from(evento.dataTransfer.files).filter((archivo) =>
      archivo.type.startsWith("image/")
    );

    alCambiarArchivos([...archivos, ...archivosSoltados]);
  };

  const seleccionarArchivos = (evento: ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files) {
      const archivosSeleccionados = Array.from(evento.target.files);
      alCambiarArchivos([...archivos, ...archivosSeleccionados]);
    }
  };

  const eliminarArchivo = (indice: number) => {
    alCambiarArchivos(archivos.filter((_, posicion) => posicion !== indice));
  };

  return (
    <div>
      <Tarjeta
        className={`
          p-8 transition-all duration-300
          ${estaArrastrando ? "ring-2 ring-[#4facfe] bg-white/40" : ""}
        `}
      >
        <div
          onDragOver={manejarArrastre}
          onDragLeave={terminarArrastre}
          onDrop={soltarArchivos}
          className="text-center"
        >
          <motion.div
            animate={{ y: estaArrastrando ? -10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Upload className="mx-auto mb-4 w-12 h-12 text-[#4facfe]" />
          </motion.div>
          <h3 className="mb-2 text-gray-800">Subir fotos</h3>
          <p className="mb-4 text-sm text-gray-600">
            Arrastra y suelta imágenes aquí o haz clic para buscar
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={seleccionarArchivos}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-block px-4 py-2 rounded-lg backdrop-blur-xl bg-white/30 border border-white/50 text-gray-700 cursor-pointer hover:bg-white/40 transition-all"
          >
            Elegir archivos
          </label>
        </div>
      </Tarjeta>

      <AnimatePresence>
        {archivos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-3 gap-4 mt-4"
          >
            {archivos.map((archivo, indice) => (
              <motion.div
                key={indice}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Tarjeta className="relative p-2">
                  <img
                    src={URL.createObjectURL(archivo)}
                    alt={archivo.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => eliminarArchivo(indice)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </Tarjeta>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
