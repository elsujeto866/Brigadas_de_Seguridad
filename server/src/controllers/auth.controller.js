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
export const login = (req, res) => res.send("login");
