import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export interface RequestOnlyId extends Request {
  id: number
}

class SharedMiddlewares {
	OnlyIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
		const r = req as RequestOnlyId;
		const id = z.coerce.number().parse(req.params.id);
		r.id = id;

		next();
	}
};


export default new SharedMiddlewares