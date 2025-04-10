// Estructura del jugador ya adaptado para mostrar
export interface Jugador {
    id: number;
    nombre: string;
    edad: number;
    posicion: string;
    imagen: string;
  }
  
  // Estructura del jugador como llega desde la API
  export interface JugadorAPI {
    id: number;
    nombre_completo: string;
    fecha_nacimiento: string;
    posicion: string;
    foto?: string;
  }
  