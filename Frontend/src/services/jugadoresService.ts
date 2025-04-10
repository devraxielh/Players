import axios from "axios";
import { API_URL } from "./apiConfig";
import { Jugador } from "../types/jugador";

// Obtener todos los jugadores
export const obtenerJugadores = async (): Promise<Jugador[]> => {
  try {
    const response = await axios.get<Jugador[]>(`${API_URL}jugadores/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los jugadores:", error);
    throw error;
  }
};

// Obtener un jugador por ID
export const obtenerJugadorPorId = async (id: string): Promise<Jugador> => {
  try {
    const response = await axios.get<Jugador>(`${API_URL}jugadores/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el jugador con ID ${id}:`, error);
    throw error;
  }
};
