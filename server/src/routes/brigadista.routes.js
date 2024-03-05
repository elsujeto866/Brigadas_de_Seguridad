import { Router } from "express";
import {loginBrigadista, registerBrigadista, logoutBrigadista, profileBrigadista, createBrigadista} from "../controllers/brigadista.controller.js";
import {authRequired} from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validator.middleware.js";
import {registerSchema,loginSchema} from "../schemas/brigadista.schema.js";

const router = Router();

//router.post('/api/brigadistas/new', createBrigadista)
router.post('/register',validateSchema(registerSchema), registerBrigadista)
router.post('/login',validateSchema(loginSchema), loginBrigadista)
router.post('/logout', logoutBrigadista)
router.get('/profile',authRequired, profileBrigadista )
router.post('/new',createBrigadista)

export default router;