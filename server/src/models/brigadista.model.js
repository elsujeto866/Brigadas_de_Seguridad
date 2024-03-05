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
    unique: true,
  },
    password: {
      type: String,
      required: [true],
    },
  
    telephone: {
      type: String,
      required: true,
    },
    cedula: {
      type: String,
      required: [true, "Cedula es Requerida"],
      unique: true,
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
