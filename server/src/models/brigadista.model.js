import mongoose from "mongoose";

const brigadistaSchema = new mongoose.Schema({
  name: {
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
    required: true,
    trim: true,
  },
  role: String,
  status: Boolean,
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Brigadista", brigadistaSchema);
