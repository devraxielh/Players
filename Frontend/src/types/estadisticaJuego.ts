export interface EstadisticaJuego {
  id: number;
  jugador: number;
  fecha: string;
  pase_corto: number;
  pase_largo: number;
  pase_efectivo: number;
  pase_errado: number;
  control: number;
  conducciones: number;
  remate: number;
  regate: number;
  juego_aereo: number;
  vision: number;
  concentracion: number;
  ritmo_intensidad: number;
  duelos_ofensivos: number;
  duelos_defensivos: number;
  }
  export type NuevaEstadistica = Omit<EstadisticaJuego, 'id'>;
