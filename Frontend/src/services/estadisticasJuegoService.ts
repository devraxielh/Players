import axios from 'axios';
import { EstadisticaJuego, NuevaEstadistica } from '../types/estadisticaJuego';
import { API_URL } from "./apiConfig";

export const obtenerEstadisticasPorJugador = async (jugadorId: number): Promise<EstadisticaJuego[]> => {
  const response = await axios.get<EstadisticaJuego[]>(`${API_URL}estadisticas-juego/`);
  console.log(response.data);
  return response.data.filter(e => e.jugador === jugadorId);
};

export const crearEstadistica = async (data: NuevaEstadistica): Promise<EstadisticaJuego> => {
  const response = await axios.post<EstadisticaJuego>(`${API_URL}estadisticas-juego/`, data);
  return response.data;
};

export const eliminarEstadistica = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}estadisticas-juego/${id}/`);
};