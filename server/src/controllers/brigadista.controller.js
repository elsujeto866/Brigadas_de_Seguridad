import Brigadista from "../models/brigadista.model.js";
import bcrypt from "bcryptjs";
import { createToken } from "../libs/jwt.js";

export const createBrigadista = (request, response) => {
  const { firstName, lastName, email, password, telephone, cedula } =
    request.body;
  console.log("Registrando nuevo brigadista...");
  console.log(firstName);
  Brigadista.create({
    firstName,
    lastName,
    email,
    password,
    telephone,
    cedula,
  })
    .then((user) => response.json(user))
    .catch((err) => response.status(400).json(err));
};

export const registerBrigadista = async (req, res) => {
  const { firstName, lastName, email, password, telephone, cedula } = req.body;
  try {
    //Verificar si el brigadista ya existe por su correo y cedula
    const existingEmail = await Brigadista.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "El correo ya esta en uso" });
    }
    const existingCI = await Brigadista.findOne({ cedula });
    if (existingCI) {
      return res.status(400).json({ error: "La cédula ya esta en uso" });
    }
    //encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    const newBrigadista = new Brigadista({
      firstName,
      lastName,
      email,
      password: passwordHash,
      telephone,
      cedula,
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
      firstName: brigadistaSaved.firstName,
      lastName: brigadistaSaved.lastName,
      email: brigadistaSaved.email,
      role: brigadistaSaved.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginBrigadista = (req, res) => {
  const { email, password } = req.body;

  Brigadista.findOne({ email })
    .then((brigadistaFound) => {
      if (!brigadistaFound) {
        return res.status(400).json({ message: "Brigadista not found" });
      }
      return bcrypt
        .compare(password, brigadistaFound.password)
        .then((matchPassword) => {
          if (!matchPassword) {
            return res.status(401).json({ message: "Invalid password" });
          }
          const token = createToken({
            id: brigadistaFound._id,
            role: brigadistaFound.rol,
          });
          res.cookie("token", token);
          res.json({
            _id: brigadistaFound._id,
            firstName: brigadistaFound.firstName,
            lastName: brigadistaFound.lastName,
            email: brigadistaFound.email,
            role: brigadistaFound.rol,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

export const logoutBrigadista = (req, res) => {
  res.clearCookie("token");
  return res.sendStatus(200);
};

export const profileBrigadista = (req, res) => {
  Brigadista.findById(req.user.id)
    .select("-password")
    .then((userFound) => {
      if (!userFound) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(userFound);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

////
export const getAllBrigadistas = (_, response) => {
  Brigadista.find({})
    .then((users) => response.json(users))
    .catch((err) => response.json(err));
};

export const updateBrigadista = (request, response) => {
  Brigadista.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
  .then(updatedBrigadista => response.json(updatedBrigadista))
  .catch(err => response.json(err))
}

export const deleteBrigadista = (request, response) => {
  Brigadista.deleteOne({ _id: request.params.id })
    .then((brigadistaDeleted) => response.json(brigadistaDeleted))
    .catch((err) => response.json(err));
};
////

export const getBrigadistaById= async (req, res) => {
  const { id } = req.params;
  try {
    const brigadista = await Brigadista.findById(id);
    if (!brigadista) {
      return res.status(404).json({ message: "Brigadista not found" });
    }
    res.json(brigadista);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
