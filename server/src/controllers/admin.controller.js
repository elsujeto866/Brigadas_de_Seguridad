import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import { createToken } from "../libs/jwt.js";

export const registerAdmin = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    // Verificar si el admin ya existe
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Este correo ya esta en uso" });
    }
    //encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      email,
      name,
      password: passwordHash,
      role: "admin",
    });

    const adminSaved = await newAdmin.save();
    //crear token
    const token = await createToken({
      id: adminSaved._id,
      role: adminSaved.role,
    });

    res.cookie("token", token);
    //respuesta del servidor con un objeto json
    res.json({
      _id: adminSaved._id,
      name: adminSaved.name,
      email: adminSaved.email,
      role: adminSaved.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //buscar el admin por email
    const adminFound = await Admin.findOne({ email });
    //si no existe el admin
    if (!adminFound)
      return res.status(400).json({ message: "Admin not found" });
    //comparar contraseñas
    const matchPassword = await bcrypt.compare(password, adminFound.password);
    // si la contraseña no coincide
    if (!matchPassword)
      return res.status(401).json({ message: "Invalid password" });
    //crear token
    const token = await createToken({
      id: adminFound._id,
      role: adminFound.role,
    });
    res.cookie("token", token);
    //respuesta del servidor con un objeto json
    res.json({
      _id: adminFound._id,
      name: adminFound.name,
      email: adminFound.email,
      role: adminFound.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutAdmin = async (req, res) => {
  res.clearCookie("token");
  return res.sendStatus(200);
};

export const profileAdmin = async (req, res) => {
  //Obtengo el administrador validado sin el password
  const userFound = await Admin.findById(req.user.id).select("-password");
  //Si no encuentro el administrador
  if (!userFound) return res.status(404).json({ message: "User not found" });

  return res.json(userFound);
};
