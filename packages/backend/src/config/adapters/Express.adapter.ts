import logger from "@app/server/infrastructure/helpers/logger/logger";
import HttpContext from "@app/server/config/express/Http.context";
import HttpServiceExpress from "@app/server/config/express/Http.service";
import { NextFunction, Request, Response } from "express";

export const asyncHandle =
	(fn: any) => (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(err => next(err));
	};

export const adaptController =
	(controllerFn: (ctx: HttpContext) => Promise<void>) =>
	(req: Request, res: Response, next: NextFunction) => {
		const ctx = new HttpContext(new HttpServiceExpress(req, res, next));
		controllerFn(ctx)
		
		.catch(err => {
			logger.error({ ОШИБКА_В_АДАПТОРЕ: err });
			next(err);
		});
	};
