import { Router } from "express";
import {loginBrigadista, registerBrigadista, logoutBrigadista, profileBrigadista, createBrigadista} from "../controllers/brigadista.controller.js";
import {authRequired} from "../middlewares/validateToken.js";
//import {createBrigadista} from "../controllers/brigadista.controller.js"
const router = Router();

//router.post('/api/brigadistas/new', createBrigadista)
router.post('/register', registerBrigadista)
router.post('/login', loginBrigadista)
router.post('/logout', logoutBrigadista)
router.get('/profile',authRequired, profileBrigadista )
router.post('/new',createBrigadista)

export default router;