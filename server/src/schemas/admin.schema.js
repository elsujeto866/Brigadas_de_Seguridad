import { z } from "zod";
//Validación para registrar un usuario
export const registerSchema = z.object({
  name: z.string({
    required_error: "Llene el campo Nombre del usuario",
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
