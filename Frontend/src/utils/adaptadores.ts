import { Jugador, JugadorAPI } from "../types/jugador";

export const adaptarJugador = (jugador: JugadorAPI): Jugador => ({
  id: jugador.id,
  nombre: jugador.nombre_completo,
  edad: calcularEdad(jugador.fecha_nacimiento),
  posicion: jugador.posicion,
  imagen: jugador.foto || "https://placehold.jp/150x150.png",
});

const calcularEdad = (fechaNacimiento: string): number => {
  if (!fechaNacimiento) return 0;
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  if (isNaN(nacimiento.getTime())) return 0;
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
};
