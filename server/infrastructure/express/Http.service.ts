import { IHttpService } from "@s/infrastructure/express/Http.interfaces";
import { Request, Response, NextFunction } from "express";

class HttpServiceExpress implements IHttpService {
	constructor(
		private readonly req: Request,
		private readonly res: Response,
		private readonly nextFu: NextFunction
	) {}

	getBody = () => this.req.body;
	getParams = () => this.req.params;
	getQuery = () => this.req.query;
  getSession = () => this.req.session;

	json: IHttpService['json'] = (data) => this.res.json(data);

	sendStatus = (code: number) => this.res.sendStatus(code);
	next = () => this.nextFu()
}

export default HttpServiceExpress;
