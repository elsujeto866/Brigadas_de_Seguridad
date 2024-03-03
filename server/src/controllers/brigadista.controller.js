import Brigadista from "../models/brigadista.model.js";
import bcrypt from "bcryptjs";
import { createToken } from "../libs/jwt.js";

export const registerBrigadista = (req, res) => {
  const { firstName, lastName, email, password, telephone, cedula } = req.body;


  // Validar que la contraseña sea una cadena válida
  if (typeof password !== 'string' || password.length === 0) {
    console.log(password);
    return res.status(400).json({ message: "Invalid password" });
  }

  bcrypt.hash(password, 10)
    .then(passwordHash => {
      return Brigadista.create({
        firstName,
        lastName,
        email,
        password: passwordHash,
        telephone,
        cedula,
        rol: "brigadista"
      });
    })
    .then(brigadistaSaved => {
      const token = createToken({
        id: brigadistaSaved._id,
        role: brigadistaSaved.role,
      });
      res.cookie("token", token);
      res.json({
        _id: brigadistaSaved._id,
        firstName: brigadistaSaved.firstName,
        lastName: brigadistaSaved.lastName,
        email: brigadistaSaved.email,
        rol: brigadistaSaved.rol,
      });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

export const loginBrigadista = (req, res) => {
  const { email, password } = req.body;

  Brigadista.findOne({ email })
    .then(brigadistaFound => {
      if (!brigadistaFound) {
        return res.status(400).json({ message: "Brigadista not found" });
      }
      return bcrypt.compare(password, brigadistaFound.password)
        .then(matchPassword => {
          if (!matchPassword) {
            return res.status(401).json({ message: "Invalid password" });
          }
          const token = createToken({
            id: brigadistaFound._id,
            role: brigadistaFound.role,
          });
          res.cookie("token", token);
          res.json({
            _id: brigadistaFound._id,
            firstName: brigadistaFound.firstName,
            lastName: brigadistaFound.lastName,
            email: brigadistaFound.email,
            role: brigadistaFound.role,
          });
        });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};

export const logoutBrigadista = (req, res) => {
  res.clearCookie('token');
  return res.sendStatus(200);
};

export const profileBrigadista = (req, res) => {
  Brigadista.findById(req.user.id).select('-password')
    .then(userFound => {
      if (!userFound) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(userFound);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
};
