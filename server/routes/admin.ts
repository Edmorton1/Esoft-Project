import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware";
import {Router} from "express";

const adminRouter = Router();

// ------------------------------------------ ДОСТУПНЫ ТОЛЬКО АДМИНИСТРАТОРУ -------------------------------------------
// adminRouter.use(AuthMiddleware.OnlyAdmin)

export default adminRouter;
