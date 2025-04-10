import axios from 'axios';
import { Estadistica, NuevaEstadistica } from '../types/estadistica';
import { API_URL } from "./apiConfig";

export const obtenerEstadisticasPorJugador = async (jugadorId: number): Promise<Estadistica[]> => {
  const response = await axios.get<Estadistica[]>(`${API_URL}estadisticas-generales/`);
  return response.data.filter(e => e.jugador === jugadorId);
};

export const crearEstadistica = async (data: NuevaEstadistica): Promise<Estadistica> => {
  const response = await axios.post<Estadistica>(`${API_URL}estadisticas-generales/`, data);
  return response.data;
};

export const eliminarEstadistica = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}estadisticas-generales/${id}/`);
};
