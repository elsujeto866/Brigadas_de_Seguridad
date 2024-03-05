import { Router } from "express";
import {loginAdmin, registerAdmin, logoutAdmin, profileAdmin} from "../controllers/admin.controller.js";
import {authRequired} from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validator.middleware.js";
import {registerSchema,loginSchema} from "../schemas/admin.schema.js";

const router = Router();

router.post('/register',validateSchema(registerSchema), registerAdmin) //validateSchema me hace las validaciones con respecto al esquema que le pase
router.post('/login',validateSchema(loginSchema), loginAdmin)
router.post('/logout', logoutAdmin)
router.get('/profile',authRequired, profileAdmin )

export default router;