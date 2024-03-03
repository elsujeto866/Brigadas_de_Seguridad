import { Router } from "express";
import {crearHorario, getAllHorarios, getHorario} from "../controllers/schedule.controller.js";
import {authRequired} from "../middlewares/validateToken.js";

const router = Router();

router.post('/horarios/new', crearHorario)
router.get('/horarios', getAllHorarios)
router.get('/horarios/:id', getHorario)

export default router;