import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
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
          validator: function(value) {
              // Expresión regular para validar el formato del email
              return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(value);
          },
          message: "Formato de correo electrónico inválido"
      },
      {
          validator: async function(value) {
              const document = await this.model("Brigadista").findOne({ email: value });
              if (document) {
                  return false;
              }
              return true;
          },
          message: "El correo electrónico ya está en uso"
      }]
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: String,
  status: Boolean,
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Admin', adminSchema)