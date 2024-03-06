import { Router } from "express";
import {crearHorario, getAllHorarios, getHorario, getsHorario} from "../controllers/schedule.controller.js";
import {authRequired} from "../middlewares/validateToken.js";

const router = Router();

router.post('/horarios/new', crearHorario)
router.get('/horarios', getAllHorarios)
router.get('/horarios/:id', getHorario)
router.get('/horario/:id', getsHorario)

export default router;