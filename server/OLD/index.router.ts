import adminRouter from "@s/OLD/admin";
import privateRouter from "@s/OLD/private";
import publicRouter from "@s/OLD/public";
import { Router } from "express";

const router = Router();

router.use(publicRouter)
router.use(privateRouter)
router.use(adminRouter)

export default router