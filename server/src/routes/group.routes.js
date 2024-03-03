import { Router } from "express";
import {getGroups, getGroup, createGroup, updateGroup, deleteGroup} from "../controllers/group.controller.js";
import {authRequired} from "../middlewares/validateToken.js";


const router = Router();

router.get('/', getGroups);
router.get('/:id', getGroup);
router.post('/new', createGroup);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);

export default router;