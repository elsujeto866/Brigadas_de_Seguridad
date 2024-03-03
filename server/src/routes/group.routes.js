import { Router } from "express";
import { createGroup, getGroups, getGroupById, updateGroup, deleteGroup } from "../controllers/group.controller.js";

const router = Router();

router.post('/crear-grupo', createGroup); // Ruta para crear un nuevo grupo
router.get('/', getGroups); // Ruta para obtener todos los grupos
router.get('/:groupId', getGroupById); // Ruta para obtener un grupo por su ID
router.put('/:groupId', updateGroup); // Ruta para actualizar un grupo existente
router.delete('/:groupId', deleteGroup); // Ruta para eliminar un grupo existente

export default router;
