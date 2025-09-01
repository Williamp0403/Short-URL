import z from 'zod'

export const SchemaLogin = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: 'Campo requerido' })
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(15, { message: 'Maximo 15 caracteres' }),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Campo requerido' })
    .min(3, { message: 'Mínimo 3 caracteres' })
})

export const SchemaRegister = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Campo requerido' })
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(20, { message: 'Maximo 20 caracteres' }),
  username: z
    .string()
    .trim()
    .min(1, { message: 'Campo requerido' })
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(15, { message: 'Maximo 15 caracteres' }),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Campo requerido' })
    .min(3, { message: 'Mínimo 3 caracteres' })
})