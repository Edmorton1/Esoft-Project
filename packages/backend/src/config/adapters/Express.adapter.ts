import logger from "@app/server/infrastructure/helpers/logger/logger";
import HttpContext from "@app/server/config/express/Http.context";
import HttpServiceExpress from "@app/server/config/express/Http.service";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "@app/shared/CONST";

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
			if (err instanceof HttpError) {
				logger.error({ОШИБКА: err.message})
				if (err.message) {
					ctx.send(err.code, err.message)
				} else {
					ctx.sendStatus(err.code)
				}
			} else next(err);
		});
	};


		// post: IPostsController["post"] = async ctx => {
		// 	try {
		// 		const postsDTO = PostsValidation.post(ctx)
		// 		// logger.info(postsDTO)
		// 		const total = await this.postsService.post(postsDTO)
		// 		ctx.json(total)
		// 	}	catch(err) {
				// if (err instanceof HttpError) {
				// 	this.logger.error({ОШИБКА: err.message})
				// 	ctx.sendStatus(err.code)
		// 		} else throw err
		// 	}
		// };