import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export interface RequestDelete extends Request {
  id: number
}

function DeleteMiddleware(req: Request, res: Response, next: NextFunction) {
	const r = req as RequestDelete;
	const id = z.coerce.number().parse(req.params.id);
	r.id = id;

	next();
};

export default DeleteMiddleware