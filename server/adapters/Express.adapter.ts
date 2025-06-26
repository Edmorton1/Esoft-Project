import logger from "@s/helpers/logger";
import HttpContext from "@s/infrastructure/express/Http.context";
import HttpServiceExpress from "@s/infrastructure/express/Http.service";
import { NextFunction, Request, Response } from "express";

export const asyncHandle = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(err => next(err));
	};

export const adaptController =
	(controllerFn: (ctx: HttpContext) => Promise<void>) =>
	(req: Request, res: Response, next: NextFunction) => {
		const ctx = new HttpContext(new HttpServiceExpress(req, res, next));
		controllerFn(ctx)
      .catch(err => {
        logger.info({ОШИБКА_В_АДАПТОРЕ: err})
        next(err)
      });
	};
