import {Request, Response, NextFunction} from "express";
import { z } from "zod";

export interface ReqForm extends Request {
	search: string;
}

class FormMiddlewares {
	searchForm = (req: Request, res: Response, next: NextFunction) => {
		const r = req as ReqForm;
    const search = z.coerce.string().toLowerCase().trim().parse(req.params.search)
    
    r.search = search
    next()
	};
}

export default new FormMiddlewares();
