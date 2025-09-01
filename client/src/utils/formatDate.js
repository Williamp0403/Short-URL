import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

export function formatLast7DaysDate(dateInput) {
  // Parseamos la cadena "YYYY-MM-DD" como local
  const date = dayjs(dateInput, 'YYYY-MM-DD').startOf('day');
  return date.format('D MMMM');
}

export function formatDate(dateInput, showTime = true) {
  // Detectar si la cadena incluye hora
  const hasTime = typeof dateInput === 'string' && dateInput.includes(':');

  const date = dayjs(dateInput);

  // Si tiene hora y el caller quiere mostrarla
  if (hasTime && showTime) {
    return date.format('D [de] MMMM [de] YYYY, h:mm A');
  }

  // Si no tiene hora o no quieres mostrarla
  return date.format('D [de] MMMM [de] YYYY');
}


