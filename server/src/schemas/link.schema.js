import z from 'zod';

export const SchemaLink = z.object({
  long_url: z.string()
    .trim()
    .min(1, { message: "La URL no puede estar vacía" })
    .refine(value => {
      try {
        const url = new URL(value);
        // Todas las validaciones adicionales dentro del mismo refine
        const isValidProtocol = ['http:', 'https:'].includes(url.protocol);
        const isNotLocal = !['localhost', '127.0.0.1'].some(domain => 
          url.hostname.includes(domain)
        );
        return isValidProtocol && isNotLocal;
      } catch {
        return false;
      }
    }, {
      message: "Debe ser una URL válida (https://ejemplo.com)"
    }),
  name: z.string()
    .trim()
    .transform(val => val === '' ? undefined : val) // convierte string vacío en undefined
    .optional()
    .refine(val => !val || val.length >= 3, {
      message: "Mínimo 3 caracteres",
    })
    .refine(val => !val || val.length <= 30, {
      message: "Máximo 30 caracteres",
    }),
});