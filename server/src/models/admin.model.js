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
    unique:true
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