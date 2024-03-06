import { Router } from "express";
import {getGroups, getGroupById, createGroup, updateGroup, deleteGroup, actualizarBrigadistas,getBrigadistasGroup, eliminarMiembroGrupo,
    getGroupsByZone} from "../controllers/group.controller.js";
import {authRequired} from "../middlewares/validateToken.js";


const router = Router();

router.get('/', getGroups);
router.get('/:id', getGroupById);
router.post('/new', createGroup);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);

router.put('/brigadista/:id', actualizarBrigadistas);
router.get('/brigadistas/:id', getBrigadistasGroup);

// Nueva ruta para obtener grupos por zona
router.get('/zone/:zone', getGroupsByZone);
router.delete("/brigadista/:id", eliminarMiembroGrupo);

export default router;