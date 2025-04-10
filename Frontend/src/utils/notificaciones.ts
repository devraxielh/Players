import { toast } from "react-toastify";

export const mostrarExito = (mensaje: string) => {
  toast.success(mensaje, {
    position: "bottom-right",
    autoClose: 3000,
  });
};

export const mostrarError = (mensaje: string) => {
  toast.error(mensaje, {
    position: "bottom-right",
    autoClose: 3000,
  });
};
