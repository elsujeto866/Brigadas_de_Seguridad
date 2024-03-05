import { z } from "zod";
//Validación para registrar un usuario
export const registerSchema = z.object({
  firstName: z.string({
    required_error: "Llene el campo Nombre del usuario",
  }),
  lastName: z.string({
    required_error: "Llene el campo Apellido del usuario",
  }),
  email: z
    .string({
      required_error: "Llene el campo Correo electrónico",
      invalid_error: "Formato de correo electrónico inválido",
    })
    .email({
      message: "Formato de correo electrónico inválido",
    }),
  password: z
    .string({
      required_error: "Llene el campo Contraseña",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
  telephone: z
    .string({
      required_error: "Llene el campo Teléfono",
    })
    .min(10, {
      message: "El teléfono debe tener al menos 10 caracteres",
    })
    .refine((value) => /^\d+$/.test(value), {
      message: "El campo Teléfono solo puede contener números",
    }),
    cedula: z
    .string({
      required_error: "Llene el campo Cédula",
    })
    .min(10, {
      message: "La cédula debe tener al menos 10 caracteres",
    })
    .refine((value) => /^\d+$/.test(value), {
      message: "El campo Cédula solo puede contener números",
    }),
});
//Validación para ingresar
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Llene el campo Correo electrónico",
      invalid_error: "Formato de correo electrónico inválido",
    })
    .email({
      message: "Formato de correo electrónico inválido",
    }),
  password: z
    .string({
      required_error: "Llene el campo Contraseña",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});
