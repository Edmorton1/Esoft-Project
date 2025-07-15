import HttpContext from "@app/server/config/express/Http.context";
import { adaptController } from "@app/server/config/adapters/Express.adapter";
import { NextFunction, Request, Response, Router } from "express";
// import {
// 	authGet,
// 	authPost,
// 	noAuthGet,
// 	noAuthPost,
// } from "@app/server/config/middlewares/Express.ratelimiter";

export interface IControllerRoute {
	path: string;
	handle: (ctx: HttpContext) => Promise<void>;
	method: keyof Pick<Router, "get" | "post" | "delete" | "patch" | "put">;
	middlewares?: ((req: Request, res: Response, next: NextFunction) => any)[]; //Сами допишите тип для Middlware типа :)
}

class BaseController {
	private readonly _router: Router;
	constructor() {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			// FIXME: ПОТОМ ВЕРНУТЬ ЗАЩИТУ, НО СДЕЛАТЬ ОКОН ПОБОЛЬШЕ
			// logger.info({ route });
			if (!route.middlewares?.length) route.middlewares = [];
			// const isGet = route.method === "get";
			// const isAuth = route.middlewares.some(m => m.name === "OnlyAuth" || "OnlyAdmin");

			// if (isAuth) {
			// 	route.middlewares.unshift(isGet ? authGet : authPost);
			// } else {
			// 	route.middlewares.unshift(isGet ? noAuthGet : noAuthPost);
			// }

			const pipline = [...route.middlewares, adaptController(route.handle)];

			this.router[route.method](route.path, ...pipline);
		}
	}
}

export default BaseController;
