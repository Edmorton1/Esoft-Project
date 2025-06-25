import { IHttpService } from "@s/infrastructure/express/Http.interfaces";
import { Request, Response } from "express";

class HttpServiceExpress implements IHttpService {
	constructor(
		private readonly req: Request,
		private readonly res: Response,
	) {}

	public getBody = () => this.req.body;
	public getParams = () => this.req.params;
	public getQuery = () => this.req.query;
  public getSession = () => this.req.session;

	public json = (data: any) => this.res.json(data);

	public sendStatus = (code: number) => this.res.sendStatus(code);
}

export default HttpServiceExpress;
