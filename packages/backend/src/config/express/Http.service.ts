import { IHttpService, NodeFile } from "@app/server/config/express/Http.interfaces";
import { Request, Response, NextFunction } from "express";

class HttpServiceExpress implements IHttpService {
	constructor(
		private readonly req: Request,
		private readonly res: Response,
		private readonly nextFu: NextFunction,
	) {}

	getBody = () => this.req.body;

	getParams = () => this.req.params;

	getQuery = () => this.req.query;

	getSession = () => this.req.session;

	getFile = () => this.req.file;

	getFiles = () => this.req.files as NodeFile[] | undefined;

	json: IHttpService["json"] = data => this.res.json(data);

	sendStatus = (code: number) => this.res.sendStatus(code);

	next = () => this.nextFu();

	statusJson: IHttpService["statusJson"] = (code, data) => {
		this.res.status(code).json(data);
	};

	clearCookie: IHttpService["clearCookie"] = name => this.res.clearCookie(name);

	set: IHttpService['set'] = (field, value) => {
		this.res.set("Access-Control-Expose-Headers", field)
		this.res.set(field, value)
	}
	
	headers: IHttpService['headers'] = (name: string) => {
		return this.req.headers[name]
	}

	send: IHttpService['send'] = (status, message) => {
		return this.res.send(message).status(status)
	}
}

export default HttpServiceExpress;
