import { toast } from "sonner";

const httpStatusMessages = {
  400: "Datos incorrectos",
  401: "No autorizado, inicia sesión nuevamente",
  403: "Acceso denegado",
  404: "Recurso no encontrado",
  408: "Tiempo de espera agotado",
  409: "Conflicto en la solicitud",
  422: "Datos inválidos o incompletos",
  500: "Error interno del servidor",
  503: "Servicio no disponible"
};

export const handleError = (error, query) => {
  // Ignorar validaciones silenciosas específicas
  if (query?.queryKey?.[0] === "auth-validation") return;

  let message = "Ocurrió un error inesperado";

  if (error?.response) {
    // Extraer status y mensaje del servidor
    const status = error.response.status;
    message =
      error.response.data?.message ||
      httpStatusMessages[status] ||
      message;
  }
  else if (error?.request) {
    // El request se hizo, pero no hubo respuesta
    message = "No se pudo conectar al servidor";
  }
  else if (error?.message) {
    // Error manual en el código
    message = error.message;
  }

  toast.error(message);
};
