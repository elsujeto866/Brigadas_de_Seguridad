import { Router } from "express";
import {loginAdmin, registerAdmin, logoutAdmin, profileAdmin} from "../controllers/admin.controller.js";
import {authRequired} from "../middlewares/validateToken.js";

const router = Router();

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.post('/logout', logoutAdmin)
router.get('/profile',authRequired, profileAdmin )

export default router;