import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import { createToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    //encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      email,
      name,
      password: passwordHash,
    });

    const adminSaved = await newAdmin.save();
    //crear token
    const token = await createToken({
      id: adminSaved._id,
    });

    res.cookie("token", token);
    /*res.json({
      message: "Admin created successfully",
    });*/

    //respuesta del servidor con un objeto json
    res.json({
      _id: adminSaved._id,
      name: adminSaved.name,
      email: adminSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //buscar el admin por email
    const adminFound = await Admin.findOne({ email });
    //si no existe el admin
    if (!adminFound) return res.status(400).json({ message: "Admin not found" });
    //comparar contraseñas
    const matchPassword = await bcrypt.compare(password, adminFound.password);
    // si la contraseña no coincide
    if (!matchPassword)
      return res.status(401).json({ message: "Invalid password" });
    //crear token
    const token = await createToken({
      id: adminFound._id,
    });
    res.cookie("token", token);
    //respuesta del servidor con un objeto json
    res.json({
      _id: adminFound._id,
      name: adminFound.name,
      email: adminFound.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async(req, res) => {
    res.clearCookie('token');
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    //Obtengo el administrador validado sin el password
    const userFound = await Admin.findById(req.user.id).select('-password');
    //Si no encuentro el administrador
    if(!userFound) return res.status(404).json({message: "User not found"});

    return res.json(userFound);
}
