import { Router } from "express";
import {crearHorario, getAllHorarios, getHorario,getHoraPorIdYFecha} from "../controllers/schedule.controller.js";
import {authRequired} from "../middlewares/validateToken.js";

const router = Router();

router.post('/horarios/new', crearHorario)
router.get('/horarios', getAllHorarios)
router.get('/horarios/:id', getHorario)

// Ruta para obtener una hora por su _id y fecha
router.get('/horarios/:fecha/:horaId', getHoraPorIdYFecha);

export default router;