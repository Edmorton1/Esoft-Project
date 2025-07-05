import logger from "@app/server/helpers/logger/logger";
import HttpContext from "@app/server/config/express/Http.context";
import { adaptController } from "@app/server/adapters/Express.adapter";
import { Router } from "express";

export interface IControllerRoute {
	path: string;
	handle: (ctx: HttpContext) => Promise<void>;
	method: keyof Pick<Router, "get" | "post" | "delete" | "patch" | "put">;
	middlewares?: any[]; //Сами допишите тип для Middlware типа :)
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
			// logger.info({ route });

			const pipline = route.middlewares
				? [...route.middlewares, adaptController(route.handle)]
				: [adaptController(route.handle)];
			this.router[route.method](route.path, ...pipline);
		}
	}
}

export default BaseController;
