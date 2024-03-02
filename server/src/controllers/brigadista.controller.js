import Brigadista from "../models/brigadista.model.js";
import bcrypt from "bcryptjs";
import { createToken } from "../libs/jwt.js";

export const registerBrigadista = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    //encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    const newBrigadista = new Brigadista({
      email,
      name,
      password: passwordHash,
      role: "brigadista",
    });

    const brigadistaSaved = await newBrigadista.save();
    //crear token
    const token = await createToken({
      id: brigadistaSaved._id,
      role: brigadistaSaved.role,
    });

    res.cookie("token", token);
    //respuesta del servidor con un objeto json
    res.json({
      _id: brigadistaSaved._id,
      name: brigadistaSaved.name,
      email: brigadistaSaved.email,
      role: brigadistaSaved.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginBrigadista = async (req, res) => {
  const { email, password } = req.body;

  try {
    //buscar el Brigadista por email
    const brigadistaFound = await Brigadista.findOne({ email });
    //si no existe el Brigadista
    if (!brigadistaFound) return res.status(400).json({ message: "Brigadista not found" });
    //comparar contraseñas
    const matchPassword = await bcrypt.compare(password, brigadistaFound.password);
    // si la contraseña no coincide
    if (!matchPassword)
      return res.status(401).json({ message: "Invalid password" });
    //crear token
    const token = await createToken({
      id: brigadistaFound._id,
      role: brigadistaFound.role,
    });
    res.cookie("token", token);
    //respuesta del servidor con un objeto json
    res.json({
      _id: brigadistaFound._id,
      name: brigadistaFound.name,
      email: brigadistaFound.email,
      role: brigadistaFound.role,
    });  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutBrigadista = async(req, res) => {
    res.clearCookie('token');
    return res.sendStatus(200);
}

export const profileBrigadista = async (req, res) => {
    //Obtengo el Brigadista validado sin el password
    const userFound = await Brigadista.findById(req.user.id).select('-password');
    //Si no encuentro el Brigadista
    if(!userFound) return res.status(404).json({message: "User not found"});

    return res.json(userFound);
}
