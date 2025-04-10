export interface Estadistica {
    id: number;
    jugador: number;
    fecha: string;
    td_puesto: number;
    td_otros_puestos: number;
    ejecucion: number;
    m_defensa: number;
    m_ofensivo: number;
    pph: number;
    ppi: number;
    rph: number;
    rpi: number;
    jcabeza: number;
    conduccion: number;
    controles: number;
    finta_regate: number;
    agilidad: number;
    velocidad: number;
    resistencia: number;
    fuerza: number;
    flexibilidad: number;
    cpsi: number;
    ccog: number;
    crel: number;
    ccomp: number;
    criv: number;
    disci: number;
  }
  
  export type NuevaEstadistica = Omit<Estadistica, 'id'>;
  