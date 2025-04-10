import { mostrarExito, mostrarError } from './notificaciones';

export const handleCrearGenerico = async <T>(
  crearFn: (data: T) => Promise<any>,
  data: T,
  onSuccess: (response: any) => void,
  mensajeOk: string = 'Registro guardado correctamente.',
  mensajeError: string = 'Error al guardar el registro.'
) => {
  try {
    const response = await crearFn(data);
    onSuccess(response);
    mostrarExito(mensajeOk);
  } catch (error) {
    console.error('Error en creación:', error);
    mostrarError(mensajeError);
  }
};

export const handleEliminarGenerico = async (
  eliminarFn: (id: number) => Promise<void>,
  id: number,
  onSuccess: () => void,
  mensajeOk: string = 'Registro eliminado correctamente.',
  mensajeError: string = 'Error al eliminar el registro.'
) => {
  try {
    await eliminarFn(id);
    onSuccess();
    mostrarExito(mensajeOk);
  } catch (error) {
    console.error('Error en eliminación:', error);
    mostrarError(mensajeError);
  }
};
