import Swal from 'sweetalert2';

export const confirmarEliminacion = async (
  titulo: string = '¿Estás seguro?',
  texto: string = 'Esta acción no se puede deshacer.',
  textoConfirmar: string = 'Sí, eliminar',
  textoCancelar: string = 'Cancelar'
): Promise<boolean> => {
  const result = await Swal.fire({
    title: titulo,
    text: texto,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: textoConfirmar,
    cancelButtonText: textoCancelar,
  });

  return result.isConfirmed;
};
