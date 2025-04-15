import React, { useEffect, useState } from 'react';
import Modal from "../common/Modal";
import EstadisticasForm from "./EstadisticasJuegoForm";
import EstadisticasTabla from "./EstadisticasJuegoTabla";
import { Estadistica, NuevaEstadistica } from '../../types/estadisticaJuego';
import {
  obtenerEstadisticasPorJugador,
  crearEstadistica,
  eliminarEstadistica
} from '../../services/estadisticasJuegoService';
import {
  handleCrearGenerico,
  handleEliminarGenerico,
} from '../../utils/handlers';
import { mostrarError } from '../../utils/notificaciones';
import { confirmarEliminacion } from '../../utils/confirmacion';
import { Save, Plus } from "lucide-react";

type EstadisticasGeneralesProps = {
  jugadorId: number;
};

const EstadisticasJuego: React.FC<EstadisticasGeneralesProps> = ({ jugadorId }) => {
  const [estadisticas, setEstadisticas] = useState<Estadistica[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoRegistro, setNuevoRegistro] = useState<NuevaEstadistica>(getRegistroInicial(jugadorId));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerEstadisticasPorJugador(jugadorId);
        setEstadisticas(data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        mostrarError('No se pudieron cargar las estadísticas.');
      }
    };
    fetchData();
  }, [jugadorId]);

  const handleCrear = async () => {
    await handleCrearGenerico<NuevaEstadistica>(
      crearEstadistica,
      nuevoRegistro,
      (nuevaEstadistica) => {
        setEstadisticas((prev) => [...prev, nuevaEstadistica]);
        resetNuevoRegistro();
        setMostrarFormulario(false);
      },
      'Estadística guardada correctamente.',
      'Error al guardar la estadística.'
    );
  };

  const handleEliminar = async (id: number) => {
    const confirmado = await confirmarEliminacion(
      '¿Eliminar estadística?',
      'Esta acción eliminará la estadística de forma permanente.',
      'Eliminar',
      'Cancelar'
    );
    if (!confirmado) return;

    await handleEliminarGenerico(
      eliminarEstadistica,
      id,
      () => {
        setEstadisticas((prev) => prev.filter((e) => e.id !== id));
      },
      'Estadística eliminada correctamente.',
      'No se pudo eliminar la estadística.'
    );
  };

  const resetNuevoRegistro = () => {
    setNuevoRegistro(getRegistroInicial(jugadorId));
  };

  const handleInputChange = (field: keyof NuevaEstadistica, value: string | number) => {
    if (field === 'jugador') return;
    setNuevoRegistro(prev => ({
      ...prev,
      [field]: typeof value === 'string' && !isNaN(Number(value)) ? Number(value) : value,
    }));
  };

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">
        Estadísticas de Juego <button onClick={() => setMostrarFormulario(true)} className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
          <Plus size={15} />
        </button>
      </h3>
      <Modal
        isOpen={mostrarFormulario}
        title="Agregar Estadística Juego"
        onClose={() => setMostrarFormulario(false)}
      >
        <EstadisticasForm
          nuevoRegistro={nuevoRegistro}
          onInputChange={handleInputChange}
          onGuardar={handleCrear}
        />
      </Modal>

      <EstadisticasTabla
        estadisticas={estadisticas}
        nuevoRegistro={nuevoRegistro}
        onEliminar={handleEliminar}
      />
    </div>
  );
};

export default EstadisticasJuego;

function getRegistroInicial(jugadorId: number): NuevaEstadistica {
  return {
    jugador: jugadorId,
    fecha: '',
    pase_corto: 0,
    pase_largo: 0,
    pase_efectivo: 0,
    pase_errado: 0,
    control: 0,
    conducciones: 0,
    remate: 0,
    regate: 0,
    juego_aereo: 0,
    vision: 0,
    concentracion: 0,
    ritmo_intensidad: 0,
    duelos_ofensivos: 0,
    duelos_defensivos: 0,
  };
}
