import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { obtenerJugadores } from "../../services/jugadoresService";
import { Jugador, JugadorAPI } from "../../types/jugador";
import { adaptarJugador } from "../../utils/adaptadores";
import { Eye, UserPlus } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export default function Jugadores() {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroPosicion, setFiltroPosicion] = useState("");

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const data = await obtenerJugadores();
        const jugadoresAdaptados = data.map(adaptarJugador);
        setJugadores(jugadoresAdaptados);
      } catch (error) {
        console.error("Error al cargar los jugadores:", error);
      }
    };

    fetchJugadores();
  }, []);

  const jugadoresFiltrados = jugadores.filter((jugador) =>
    jugador.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
    (filtroPosicion === "" || jugador.posicion === filtroPosicion)
  );

  return (
    <div>
      <PageMeta title="Jugadores" description="Listado de jugadores" />
      <PageBreadcrumb pageTitle="Jugadores" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-gray-900 xl:px-10 xl:py-12">
        <div className="mx-auto w-full">
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-4 sm:w-2/3">
              <input
                type="text"
                placeholder="Filtrar por nombre"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
              <select
                value={filtroPosicion}
                onChange={(e) => setFiltroPosicion(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              >
                <option value="">Todas las posiciones</option>
                <option value="ARQ">Arquero</option>
                <option value="DEF">Defensa</option>
                <option value="MED">Mediocampista</option>
                <option value="DEL">Delantero</option>
              </select>
            </div>
            <Link
              to="/jugadores/nuevo"
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors"
            >
              <UserPlus size={20} />
              Crear Jugador
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell isHeader className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                      Jugador
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                      Edad
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                      Posición
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {jugadoresFiltrados.length === 0 ? (
                    <TableRow>
                      <TableCell className="px-5 py-4 text-center text-gray-500 dark:text-gray-400" colSpan={4}>
                        No se encontraron jugadores.
                      </TableCell>
                    </TableRow>
                  ) : (
                    jugadoresFiltrados.map((jugador) => (
                      <TableRow key={jugador.id}>
                        <TableCell className="px-5 py-4 text-start">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 overflow-hidden rounded-full">
                              <img
                                src={jugador.imagen}
                                alt={jugador.nombre}
                                className="w-10 h-10 object-cover rounded-full"
                              />
                            </div>
                            <div>
                              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                {jugador.nombre}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 dark:text-gray-400">
                          {jugador.edad}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 dark:text-gray-400">
                          {jugador.posicion}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-start">
                          <Link
                            to={`/jugadores/${jugador.id}`}
                            className="text-blue-500 hover:underline text-sm"
                          >
                            <button
                              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-900"
                            >
                              <Eye size={15} />
                            </button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
