import mongoose from "mongoose";

const brigadistaSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: [
      {
        validator: function (value) {
          // Expresión regular para validar el formato del email
          return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(value);
        },
        message: "Formato de correo electrónico inválido",
      },
      {
        validator: async function (value) {
          const document = await this.model("Brigadista").findOne({
            email: value,
          });
          if (document) {
            return false;
          }
          return true;
        },
        message: "El correo electrónico ya está en uso",
      },
    ],
  },
  password: {
    type: String,
    required: [true],
  },
  telephone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Expresión regular para permitir solo números y longitud de 10 dígitos
        return /^\d{10}$/.test(value);
      },
      message:
        "El teléfono debe contener solo números y tener una longitud de 10 dígitos",
    },
  },
  cedula: {
    type: String,
    required: [true, "Cedula es Requerida"],
    validate: [
      {
        validator: function (value) {
          // Expresión regular para permitir solo números y longitud de 10 dígitos
          return /^\d{10}$/.test(value);
        },
        message:
          "La cédula debe contener solo números y tener una longitud de 10 dígitos",
      },
      {
        validator: async function (value) {
          // Verificar si ya existe un brigadista con la misma cédula
          const brigadista = await this.constructor.findOne({ cedula: value });
          return !brigadista;
        },
        message: "Ya existe un brigadista con esta cédula",
      },
    ],
  },
  validation: {
    type: Boolean,
    default: false,
  },
  rol: {
    type: String,
    default: "brigadista",
  },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
});

export default mongoose.model("Brigadista", brigadistaSchema);
