import logger from "@s/helpers/logger";
import { Router } from "express";
import { Request, Response, NextFunction } from "express";

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
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
			logger.info({ route });

			const pipline = route.middlewares
				? [...route.middlewares, route.func]
				: [route.func];
			this.router[route.method](route.path, ...pipline);
		}
	}
}

export default BaseController;
