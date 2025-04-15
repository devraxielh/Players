import React from "react";
import { Trash2 } from "lucide-react";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../components/ui/table";
import { EstadisticaJuego } from "../../types/estadisticaJuego";

type Props = {
  estadisticas: EstadisticaJuego[];
  onEliminar: (id: number) => void;
};
// Colores según valor
const getColorClass = (valor: number) => {
  if (valor >= 8) return "text-green-600 font-semibold";
  if (valor >= 6) return "text-yellow-600 font-semibold";
  return "text-red-600 font-semibold";
};

// Lista de columnas a mostrar
const columnas = [
  "fecha",
  "pase_corto",
  "pase_largo",
  "pase_efectivo",
  "pase_errado",
  "control",
  "conducciones",
  "remate",
  "regate",
  "juego_aereo",
  "vision",
  "concentracion",
  "ritmo_intensidad",
  "duelos_ofensivos",
  "duelos_defensivos",
];

const formatText = (text: string) =>
  text.replace(/_/g, " ").replace(/^\w/, (l) => l.toUpperCase());

const EstadisticasTabla: React.FC<Props> = ({ estadisticas, onEliminar }) => {
  console.log(estadisticas);
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="border-b border-gray-100 dark:border-gray-800">
          <TableRow>
            {columnas.map((col) => (
              <TableCell
                key={col}
                isHeader
                className="px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
              >
                {formatText(col)}
              </TableCell>
            ))}
            <TableCell
              isHeader
              className="px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
            >
              Acciones
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
          {estadisticas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="px-5 py-4 text-center text-gray-500 dark:text-gray-400">
                No hay estadísticas registradas.
              </TableCell>
            </TableRow>
          ) : (
            estadisticas.map((estJuego) => (
              <TableRow key={estJuego.fecha + estJuego.jugador}>
                {columnas.map((col) => (
                  <TableCell key={col} className="text-center py-3 dark:text-white">
                    <span className={typeof estJuego[col as keyof Estadistica] === 'number' ? getColorClass(estJuego[col as keyof Estadistica] as number) : ""}>
                      {estJuego[col as keyof Estadistica]}
                    </span>
                  </TableCell>
                ))}
                <TableCell className="text-center">
                  <button
                    onClick={() => onEliminar((estJuego as any).id)}
                    className="text-red-600 hover:text-red-800"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

      </Table>
    </div>
  );
};

export default EstadisticasTabla;