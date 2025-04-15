import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importamos useNavigate
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { obtenerJugadorPorId } from "../../services/jugadoresService";
import { Jugador } from "../../types/jugador";
import { adaptarJugador } from "../../utils/adaptadores";
import EstadisticasGenerales from "../../components/jugadores/EstadisticasGenerales";
import EstadisticasJuego from "../../components/jugadores/EstadisticasJuego";

import { ArrowLeft } from "lucide-react";



export default function JugadorDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Inicializamos useNavigate
  const [jugador, setJugador] = useState<Jugador | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJugador = async () => {
      try {
        if (id) {
          const data: any = await obtenerJugadorPorId(id); // <- Devuelve un JugadorAPI
          const jugadorAdaptado = adaptarJugador(data); // <- Adaptamos al tipo Jugador
          setJugador(jugadorAdaptado);
        }
      } catch (error) {
        console.error("Error al cargar el jugador:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJugador();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!jugador) return <p>No se encontró el jugador.</p>;

  return (
    <div className="relative">
      <PageMeta title={`Detalle de ${jugador.nombre}`} description={`Información detallada de ${jugador.nombre}`} />
      <PageBreadcrumb pageTitle={`Detalle de ${jugador.nombre}`} />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <button onClick={() => navigate(-1)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-900 mb-4">
          <ArrowLeft size={15} />
        </button>

        <div className="flex items-center space-x-4">
          {/* Imagen del jugador */}
          <div className="w-32 h-32">
            <img
              src={jugador.imagen}
              alt={jugador.nombre}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Información del jugador */}
          <div>
            <h3 className="font-semibold text-gray-800 text-lg dark:text-white/90">{jugador.nombre}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{jugador.posicion}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Edad: {jugador.edad}</p>
          </div>
        </div>

        <div className="mx-auto w-full mt-6">
          <EstadisticasGenerales jugadorId={jugador.id} />
        </div>
        <div className="mx-auto w-full mt-6">
          <EstadisticasJuego jugadorId={jugador.id} />
        </div>
      </div>
    </div>
  );
}
