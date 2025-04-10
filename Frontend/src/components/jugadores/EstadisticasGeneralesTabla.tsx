import React from "react";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../components/ui/table";
import { Estadistica, NuevaEstadistica } from "../../types/estadistica";

type EstadisticasTablaProps = {
  estadisticas: Estadistica[];
  nuevoRegistro: NuevaEstadistica;
  onEliminar: (id: number) => void;
};

const categorias = {
  TACTICA: ['td_puesto', 'td_otros_puestos', 'ejecucion', 'm_defensa', 'm_ofensivo'],
  TECNICA: ['pph', 'ppi', 'rph', 'rpi', 'jcabeza', 'conduccion', 'controles', 'finta_regate'],
  FISICA: ['agilidad', 'velocidad', 'resistencia', 'fuerza', 'flexibilidad'],
  PSICOLOGICA: ['cpsi', 'ccog', 'crel', 'ccomp', 'criv', 'disci'],
};

// Colores según valor
const getColorClass = (valor: number) => {
  if (valor >= 8) return "text-green-600 font-semibold";
  if (valor >= 6) return "text-yellow-600 font-semibold";
  return "text-red-600 font-semibold";
};

// Función para formatear texto (primera letra en mayúscula y el resto en minúscula)
const formatText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Promedios por categoría
const calcularPromedioPorCategoria = (registro: Estadistica) => {
  const promedios: Record<string, number> = {};
  Object.entries(categorias).forEach(([categoria, variables]) => {
    const suma = variables.reduce((acc, varName) => acc + (registro[varName as keyof Estadistica] as number), 0);
    promedios[categoria] = parseFloat((suma / variables.length).toFixed(2));
  });
  promedios['Rendimiento'] = parseFloat(
    (Object.values(promedios).reduce((a, b) => a + b, 0) / 4).toFixed(2)
  );
  return promedios;
};

// Promedios generales
const calcularPromediosGenerales = (registros: Estadistica[]) => {
  const sumaPorCategoria: Record<string, number> = {
    TACTICA: 0,
    TECNICA: 0,
    FISICA: 0,
    PSICOLOGICA: 0,
    Rendimiento: 0,
  };

  registros.forEach((reg) => {
    const promedios = calcularPromedioPorCategoria(reg);
    Object.keys(sumaPorCategoria).forEach((cat) => {
      sumaPorCategoria[cat] += promedios[cat];
    });
  });

  const total = registros.length;
  const promediosFinales: Record<string, number> = {};
  Object.entries(sumaPorCategoria).forEach(([cat, suma]) => {
    promediosFinales[cat] = parseFloat((suma / total).toFixed(2));
  });

  return promediosFinales;
};

// Modal SweetAlert2 con tabla
const mostrarModalCategoria = (categoria: string, registro: Estadistica) => {
  if (!(categoria in categorias)) return;

  const variables = categorias[categoria as keyof typeof categorias];
  const contenido = `
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <thead>
        <tr style="background-color: #f5f5f5;">
          <th style="padding: 6px; border: 1px solid #ddd; text-align: left;">Variable</th>
          <th style="padding: 6px; border: 1px solid #ddd; text-align: center;">Valor</th>
        </tr>
      </thead>
      <tbody>
        ${variables
          .map(
            (v) => `
              <tr>
                <td style="padding: 6px; border: 1px solid #ddd;">${v.replace(/_/g, " ")}</td>
                <td style="padding: 6px; border: 1px solid #ddd; text-align: center;">${registro[v as keyof Estadistica]}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;

  Swal.fire({
    title: `Valores de ${categoria}`,
    html: contenido,
    icon: "info",
    confirmButtonText: "Cerrar",
    customClass: {
      popup: 'text-sm',
    },
  });
};

const EstadisticasTabla: React.FC<EstadisticasTablaProps> = ({
  estadisticas,
  nuevoRegistro,
  onEliminar,
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="border-b border-gray-100 dark:border-gray-800">
          <TableRow>
            {['fecha', 'Rendimiento', 'TACTICA', 'TECNICA', 'FISICA', 'PSICOLOGICA'].map((cat) => (
              <TableCell
                key={cat}
                isHeader
                className="px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
              >
                {formatText(cat)} {/* Aplicar formato */}
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
            <>
              {estadisticas.map((est) => {
                const promedios = calcularPromedioPorCategoria(est);
                return (
                  <TableRow key={est.id}>
                    <TableCell className="px-5 py-4 text-center dark:text-white">
                      {est.fecha}
                    </TableCell>
                    {['Rendimiento', 'TACTICA', 'TECNICA', 'FISICA', 'PSICOLOGICA'].map((cat) => (
                      <TableCell key={cat} className="px-5 py-4 text-center">
                        {cat !== 'Rendimiento' ? (
                          <div
                            onClick={() => mostrarModalCategoria(cat, est)}
                            className={`cursor-pointer hover:underline ${getColorClass(promedios[cat])} inline-block`}
                          >
                            {promedios[cat]} <span className="text-xs text-blue-400">(detalles)</span>
                          </div>
                        ) : (
                          <span className={getColorClass(promedios[cat])}>{promedios[cat]}</span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="px-5 py-4 text-center">
                      <button
                        onClick={() => onEliminar(est.id)}
                        className="text-red-600 hover:text-red-800 transition duration-200"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </TableCell>
                  </TableRow>

                );
              })}

              {/* Fila de promedios generales */}
              <TableRow className="bg-gray-50 dark:bg-gray-700 font-semibold">
                <TableCell className="px-5 py-4 text-center  dark:text-white">Promedios</TableCell>
                {(() => {
                  const promedioGlobal = calcularPromediosGenerales(estadisticas);
                  return ['Rendimiento', 'TACTICA', 'TECNICA', 'FISICA', 'PSICOLOGICA'].map((cat) => (
                    <TableCell key={cat} className="px-5 py-4 text-center">
                      <span className={getColorClass(promedioGlobal[cat])}>
                        {promedioGlobal[cat].toFixed(2)}
                      </span>
                    </TableCell>
                  ));
                })()}
                <TableCell />
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EstadisticasTabla;
